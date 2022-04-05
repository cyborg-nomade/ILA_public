using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using System.Threading.Tasks;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.DTOs;
using CPTM.ILA.Web.Models.ChangeLogging;
using CPTM.ILA.Web.Models.Messaging;
using CPTM.ILA.Web.Util;
using CPTM.GNU.Library;
using CPTM.ILA.Web.Models.AccessControl;


namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador para Cases de Uso de Dados Pessoais na CPTM. Principal fonte de dados do ILA.
    /// </summary>
    [RoutePrefix("api/cases")]
    public class CasesController : ApiController
    {
        private readonly ILAContext _context;

        /// <inheritdoc />
        public CasesController()
        {
            _context = new ILAContext();
        }

        /// <summary>
        /// Retorna todos os Casos de Uso. Endpoint disponibilizado apenas para o DPO
        /// </summary>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "caseListItems" onde se encontram os dados dos Casos de Uso, em formato reduzido (CaseListItem)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> Get()
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDpo || claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var cases = await _context.Cases.ToListAsync();

                var caseListItems = cases.ConvertAll<CaseListItem>(Case.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK, new { cases = caseListItems });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Retorna todos os Casos de Uso de um grupo de acesso. Endpoint disponibilizado apenas para o DPO e membros do grupo especificado.
        /// </summary>
        /// <param name="gid">Id do grupo de acesso</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "caseListItems" onde se encontram os dados dos Casos de Uso selecionados, em formato reduzido (CaseListItem)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("group/{gid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByGroup(int gid)
        {
            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();

                    var searchedGroup = await _context.Groups.FindAsync(gid);

                    if (!(userGroups.Contains(searchedGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (gid <= 0)
                    Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });


                var cases = await _context.Cases.Where(c => c.GrupoCriador.Id == gid)
                    .ToListAsync();

                var caseListItems = cases.ConvertAll<CaseListItem>(Case.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK, new { cases = caseListItems });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Retorna os totais de Casos de Uso por grupo de um membro do Comitê LGPD.
        /// Endpoint disponibilizado para os membros do Comitê LGPD, com cada membro tendo acesso apenas a seus grupos.
        /// </summary>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totals" onde se encontram os totais de Casos de Uso, com identificadores dos grupos (objeto GroupTotals).
        /// Também há uma chave "totalQuantity" com o totais somados, a fim de facilitar cálculos de percentagem.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("group/comite-member/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByComiteMemberGroups()
        {
            try
            {
                var userGroups = new List<Group>();
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();

                    if (!(claims.IsComite || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }


                var totals = await _context.Cases.Where(c => userGroups.Contains(c.GrupoCriador))
                    .GroupBy(c => c.GrupoCriador)
                    .Select(c => new GroupTotals()
                    {
                        GroupId = c.First()
                            .GrupoCriador.Id,
                        GroupName = c.First()
                            .GrupoCriador.Nome,
                        QuantityInGroup = c.Count()
                    })
                    .ToListAsync();

                var totalQuantity = await _context.Cases.Where(c => userGroups.Contains(c.GrupoCriador))
                    .CountAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { totals, totalQuantity });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }


        /// <summary>
        /// Retorna todos os Casos de Uso de um grupo de acesso que estejam em um certo status de aprovação. Endpoint disponibilizado apenas para o DPO e membros do grupo especificado.
        /// </summary>
        /// <param name="gid">Id do grupo</param>
        /// <param name="aprovado">Bool definindo se os casos de uso a serem selecionados já foram aprovados</param>
        /// <param name="encaminhadoAprovacao">Bool definindo se os casos de uso a serem selecionados já foram encaminhados para aprovação</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "caseListItems" onde se encontram os dados dos Casos de Uso selecionados, em formato reduzido (CaseListItem)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("group/{gid:int}/status/{aprovado:bool}/{encaminhadoAprovacao:bool}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByGroupByStatus(int gid, bool aprovado, bool encaminhadoAprovacao)
        {
            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();

                    var searchedGroup = await _context.Groups.FindAsync(gid);

                    if (!(userGroups.Contains(searchedGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (gid <= 0)
                    Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });


                var cases = await _context.Cases.Where(c =>
                        c.GrupoCriador.Id == gid &&
                        c.Aprovado == aprovado &&
                        c.EncaminhadoAprovacao == encaminhadoAprovacao)
                    .ToListAsync();

                var caseListItems = cases.ConvertAll<CaseListItem>(Case.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK, new { cases = caseListItems });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Retorna os totais dos Casos de Uso de um grupo de acesso por status de aprovação. Endpoint disponibilizado apenas para o DPO e membros do grupo especificado.
        /// </summary>
        /// <param name="gid">Id do grupo</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totals" onde se encontram os totais de Casos de Uso, com identificadores dos status (objeto StatusTotals).
        /// Também há uma chave "totalQuantity" com o totais somados, a fim de facilitar cálculos de percentagem.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("group/{gid:int}/status/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByGroupByStatus(int gid)
        {
            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();

                    var searchedGroup = await _context.Groups.FindAsync(gid);

                    if (!(userGroups.Contains(searchedGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }


                var totals = await _context.Cases.Where(c => c.GrupoCriador.Id == gid)
                    .GroupBy(c => new
                    {
                        c.Aprovado,
                        c.EncaminhadoAprovacao
                    })
                    .Select(c => new StatusTotals()
                    {
                        Nome = c.FirstOrDefault()
                            .Aprovado
                            ? "Concluído"
                            : (c.FirstOrDefault()
                                .EncaminhadoAprovacao
                                ? "Pendente Aprovação"
                                : "Em Preenchimento"),
                        Aprovado = c.FirstOrDefault()
                            .Aprovado,
                        EncaminhadoAprovacao = c.FirstOrDefault()
                            .EncaminhadoAprovacao,
                        QuantidadeByStatus = c.Count(),
                    })
                    .ToListAsync();

                var totalQuantity = await _context.Cases.Where(c => c.GrupoCriador.Id == gid)
                    .CountAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { totals, totalQuantity });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Retorna todos os Casos de Uso dos grupos de acesso de um membro especificado do Comitê LGPD (Extensão Encarregado).
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="uid">Id do membro do comitê</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "caseListItems" onde se encontram os dados dos Casos de Uso selecionados, em formato reduzido (CaseListItem)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("extensao-encarregado/{uid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByExtensaoEncarregado(int uid)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDpo || claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            if (uid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de usuário inválido." });
            }

            try
            {
                var comiteMember = await _context.Users.FindAsync(uid);
                if (comiteMember == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, new
                    {
                        message = "Usuário não encontrado."
                    });

                var pendingCases = await _context.Cases
                    .Where(c => comiteMember.Groups.Contains(c.GrupoCriador) && !c.Aprovado)
                    .ToListAsync();

                var caseListItems = pendingCases.ConvertAll<CaseListItem>(Case.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK, new { caseListItems });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Retorna os totais de Casos de Uso por membro do Comitê LGPD (Extensão Encarregado).
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totals" onde se encontram os totais de Casos de Uso, com identificadores dos grupos (objeto ExtensaoEncarregadoTotals).
        /// Também há uma chave "totalQuantity" com o totais somados, a fim de facilitar cálculos de percentagem.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("extensao-encarregado/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByExtensaoEncarregado()
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDpo || claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var comiteMembers = await _context.Users.Where(u => u.IsComite)
                    .ToListAsync();

                var totals = new List<ExtensaoEncarregadoTotals>();
                var totalQuantity = 0;

                foreach (var comiteMember in comiteMembers)
                {
                    var pendingCases = await _context.Cases.CountAsync(c =>
                        comiteMember.Groups.Contains(c.GrupoCriador) && !c.Aprovado);


                    totals.Add(new ExtensaoEncarregadoTotals()
                    {
                        ExtensaoId = comiteMember.Id,
                        ExtensaoNome = Seguranca.ObterUsuario(comiteMember.Username)
                            .Nome,
                        QuantityByExtensao = pendingCases
                    });

                    totalQuantity += pendingCases;
                }

                return Request.CreateResponse(HttpStatusCode.OK, new { totals, totalQuantity });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }


        /// <summary>
        /// Retorna um Caso de Uso de Dados Pessoais específico.
        /// Endpoint disponibilizado para o DPO e membros do grupo de acesso criador do Caso de Uso
        /// </summary>
        /// <param name="cid">Id do caso de uso</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "uniqueCase" que contém os dados do Caso de Uso (objeto Case).
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" contendo a descrição do erro.
        /// </returns>
        [Route("{cid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> Get(int cid)
        {
            if (cid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var uniqueCase = await _context.Cases.FindAsync(cid);

                if (uniqueCase == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();

                    var caseGroup = uniqueCase.GrupoCriador;

                    if (!(userGroups.Contains(caseGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK, new { uniqueCase });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Registra um Caso de Uso de dados pessoais, junto com um log de alteração.
        /// Endpoint disponibilizado para membros do grupo criador. Não autorizado para membros do Comitê LGPD.
        /// </summary>
        /// <param name="caseChange">Objeto vindo do corpo da requisição HTTP, representando o Caso de Uso e o log de alteração. Deve corresponder ao tipo CaseChange</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do Caso de Uso, ou indicando o erro ocorrido
        /// </returns>
        [Route("")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] CaseChange caseChange)
        {
            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var caseGroup = caseChange.Case.GrupoCriador;

                    if (!(userGroups.Contains(caseGroup) && !claims.IsComite || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (!ModelState.IsValid)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Objeto enviado não corresponde ao tipo CaseChange" });
                }

                var caseToSave = caseChange.Case;
                var newChangeLog = caseChange.ChangeLog;

                caseToSave.RectifyCase();

                _context.Cases.Add(caseToSave);
                _context.ChangeLogs.Add(newChangeLog);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso registrado com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Registra um Caso de Uso de dados pessoais, junto com um log de alteração.
        /// Endpoint disponibilizado para membros do grupo criador. Não autorizado para membros do Comitê LGPD.
        /// </summary>
        /// <param name="cid">Id do caso de uso a ser alterado</param>
        /// <param name="caseChange">Objeto vindo do corpo da requisição HTTP, representando o Caso de Uso e o log de alteração. Deve corresponder ao tipo CaseChange</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do Caso de Uso, ou indicando o erro ocorrido
        /// </returns>
        [Route("{cid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Edit(int cid, [FromBody] CaseChange caseChange)
        {
            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var caseGroup = caseChange.Case.GrupoCriador;


                    if (!(userGroups.Contains(caseGroup) && !claims.IsComite || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (cid <= 0)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });
                }

                if (!ModelState.IsValid)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Objeto enviado não corresponde ao tipo CaseChange" });
                }

                if (cid != caseChange.Case.Id)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Dados enviados são inválidos." });
                }

                var caseInDb = await _context.Cases.FindAsync(cid);
                if (caseInDb == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });
                }

                var caseToSave = caseChange.Case;
                var newChangeLog = caseChange.ChangeLog;

                caseToSave.RectifyCase();

                _context.ChangeLogs.Add(newChangeLog);
                _context.Entry(caseToSave)
                    .State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso registrado com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Remove um Caso de Uso de dados pessoais.
        /// Endpoint disponibilizado para membros do grupo criador. Não autorizado para membros do Comitê LGPD.
        /// </summary>
        /// <param name="cid">Id do caso de uso</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do Caso de Uso, ou indicando o erro ocorrido
        /// </returns>
        [Route("{cid:int}")]
        [Authorize]
        [HttpDelete]
        public async Task<HttpResponseMessage> Delete(int cid)
        {
            if (cid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var caseToDelete = await _context.Cases.FindAsync(cid);
                if (caseToDelete == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                var userDeleting = new User();

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var caseGroup = caseToDelete.GrupoCriador;

                    userDeleting = await _context.Users.FindAsync(claims.UserId);

                    if (!(userGroups.Contains(caseGroup) && !claims.IsComite || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var deleteChangeLog = new ChangeLog()
                {
                    Case = caseToDelete,
                    ChangeDate = DateTime.Now,
                    User = userDeleting,
                    Items = new List<ItemIdentity>()
                    {
                        new ItemIdentity()
                        {
                            Name = "Remoção",
                            Identifier = "0.0.2"
                        }
                    }
                };

                _context.ChangeLogs.Add(deleteChangeLog);
                _context.Cases.Remove(caseToDelete);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso removido com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Realiza a aprovação ou reprovação de um Caso de Uso.
        /// Endpoint disponibilizado para o DPO e para membros do Comitê LGPD com acesso ao grupo criador.
        /// </summary>
        /// <param name="cid">Id do caso de uso</param>
        /// <param name="aprovado">Objeto vindo do corpo da requisição HTTP, indicando se o caso foi aprovado ou não</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do Caso de Uso, ou indicando o erro ocorrido
        /// </returns>
        [Route("approve/{cid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Approve(int cid, [FromBody] bool aprovado)
        {
            if (cid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var caseToApprove = await _context.Cases.FindAsync(cid);

                if (caseToApprove == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                var userId = 0;

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    userId = claims.UserId;

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var caseGroup = caseToApprove.GrupoCriador;


                    if (!(claims.IsComite && userGroups.Contains(caseGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var changeLog = new ChangeLog()
                {
                    Case = caseToApprove,
                    ChangeDate = DateTime.Now,
                    User = await _context.Users.FindAsync(userId),
                };


                if (!aprovado)
                {
                    caseToApprove.ReproveCase();

                    changeLog.Items = new List<ItemIdentity>()
                    {
                        new ItemIdentity()
                        {
                            Identifier = "0.0", Name = "Reprovação"
                        }
                    };

                    _context.ChangeLogs.Add(changeLog);
                    _context.Entry(caseToApprove)
                        .State = EntityState.Modified;
                    await _context.SaveChangesAsync();

                    return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso reprovado com sucesso!" });
                }

                caseToApprove.ApproveCase();

                changeLog.Items = new List<ItemIdentity>()
                {
                    new ItemIdentity()
                    {
                        Identifier = "0.1", Name = "Aprovado"
                    }
                };

                _context.ChangeLogs.Add(changeLog);
                _context.Entry(caseToApprove)
                    .State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso aprovado com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Realiza a requisição de aprovação para um Caso de Uso.
        /// Endpoint disponibilizado para membros do grupo criador. Não autorizado para membros do Comitê LGPD.
        /// </summary>
        /// <param name="cid">Id do caso de uso</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do Caso de Uso, ou indicando o erro ocorrido
        /// </returns>
        [Route("request-approval/{cid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> RequestApproval(int cid)
        {
            if (cid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var caseToRequestApproval = await _context.Cases.FindAsync(cid);

                if (caseToRequestApproval == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                var userId = 0;

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    userId = claims.UserId;

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var caseGroup = caseToRequestApproval.GrupoCriador;

                    if (!(userGroups.Contains(caseGroup) && !claims.IsComite || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                caseToRequestApproval.SendCaseToApproval();

                var changeLog = new ChangeLog()
                {
                    Case = caseToRequestApproval,
                    ChangeDate = DateTime.Now,
                    User = await _context.Users.FindAsync(userId),
                    Items = new List<ItemIdentity>()
                    {
                        new ItemIdentity()
                        {
                            Identifier = "0.0.1", Name = "Encaminhado para aprovação"
                        }
                    }
                };

                _context.ChangeLogs.Add(changeLog);
                _context.Entry(caseToRequestApproval)
                    .State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso aprovado com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
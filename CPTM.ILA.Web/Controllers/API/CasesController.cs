using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using System.Threading.Tasks;
using System.Web.Http.Description;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.DTOs;
using CPTM.ILA.Web.Models.ChangeLogging;
using CPTM.ILA.Web.Util;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.CaseHelpers;
using Microsoft.Ajax.Utilities;


namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador para Cases de Uso de Dados Pessoais na CPTM. Principal fonte de dados do ILA.
    /// </summary>
    [RoutePrefix("api/cases")]
    public class CasesController : ApiController
    {
        private readonly ILAContext _context;
        private const string SuccessMessage = "com sucesso!";
        private static readonly string CaseListSuccessMessage = $@"Casos obtidos {SuccessMessage}";
        private static readonly string TotalsSuccessMessage = $@"Totais obtidos {SuccessMessage}";
        private readonly string ErrorMessage = "Algo deu errado no servidor.Problema foi reportado ao suporte técnico";

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
        [ResponseType(typeof(ApiResponseType<List<CaseListItem>>))]
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
                var cases = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .ToListAsync();

                var caseListItems = cases.ConvertAll<CaseListItem>(CaseListItem.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { caseListItems, message = CaseListSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
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
        [ResponseType(typeof(ApiResponseType<List<CaseListItem>>))]
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
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
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


                var cases = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .Where(c => c.GrupoCriadorId == gid)
                    .ToListAsync();

                var caseListItems = cases.ConvertAll<CaseListItem>(CaseListItem.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { caseListItems, message = CaseListSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
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
        [ResponseType(typeof(ApiResponseType<List<CaseListItem>>))]
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
                var comiteMember = await _context.Users.Where(u => u.Id == uid)
                    .Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .SingleOrDefaultAsync();
                if (comiteMember == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, new
                    {
                        message = "Usuário não encontrado."
                    });

                var comiteMemberGroupsIds = comiteMember.GroupAccessExpirations.Select(g => g.Group.Id)
                    .ToList();

                var pendingCases = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .Where(c => comiteMemberGroupsIds.Contains(c.GrupoCriadorId))
                    .ToListAsync();

                var caseListItems = pendingCases.ConvertAll<CaseListItem>(CaseListItem.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { caseListItems, message = CaseListSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna todos os Casos de Uso dos grupos de acesso de um status especificado.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="encaminhadoAprovacao">Bool definindo se os casos de uso a serem selecionados já foram encaminhados para aprovação</param>
        /// <param name="aprovado">Bool definindo se os casos de uso a serem selecionados já foram aprovados</param>
        /// <param name="reprovado">Bool definindo se os casos de uso a serem selecionados já foram reprovados</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "caseListItems" onde se encontram os dados dos Casos de Uso selecionados, em formato reduzido (CaseListItem)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(ApiResponseType<List<CaseListItem>>))]
        [Route("status/{encaminhadoAprovacao:bool}/{aprovado:bool}/{reprovado:bool}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByStatus(bool encaminhadoAprovacao, bool aprovado, bool reprovado)
        {
            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    if (!(claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var filteredCases = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .Where(c => c.Aprovado == aprovado &&
                                c.EncaminhadoAprovacao == encaminhadoAprovacao &&
                                c.Reprovado == reprovado)
                    .ToListAsync();

                var caseListItems = filteredCases.ConvertAll<CaseListItem>(CaseListItem.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { cases = caseListItems, message = CaseListSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna todos os Casos de Uso de um grupo de acesso que estejam em um certo status de aprovação.
        /// Endpoint disponibilizado apenas para o DPO e membros do grupo especificado.
        /// </summary>
        /// <param name="gid">Id do grupo</param>
        /// <param name="encaminhadoAprovacao">Bool definindo se os casos de uso a serem selecionados já foram encaminhados para aprovação</param>
        /// <param name="aprovado">Bool definindo se os casos de uso a serem selecionados já foram aprovados</param>
        /// <param name="reprovado">Bool definindo se os casos de uso a serem selecionados já foram reprovados</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "caseListItems" onde se encontram os dados dos Casos de Uso selecionados, em formato reduzido (CaseListItem)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(ApiResponseType<List<CaseListItem>>))]
        [Route("group/{gid:int}/status/{encaminhadoAprovacao:bool}/{aprovado:bool}/{reprovado:bool}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByGroupByStatus(int gid, bool encaminhadoAprovacao, bool aprovado,
            bool reprovado)
        {
            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                        .ToListAsync();

                    var searchedGroup = await _context.Groups.FindAsync(gid);

                    if (!(userGroups.Contains(searchedGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (gid <= 0)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });
                }

                var filteredCases = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .Where(c => c.GrupoCriadorId == gid &&
                                c.Aprovado == aprovado &&
                                c.EncaminhadoAprovacao == encaminhadoAprovacao &&
                                c.Reprovado == reprovado)
                    .ToListAsync();

                var caseListItems = filteredCases.ConvertAll<CaseListItem>(CaseListItem.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { cases = caseListItems, message = CaseListSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna todos os Casos de Uso dos grupos de um membro do Comitê LGPD que estejam em um certo status de aprovação.
        /// Endpoint disponibilizado apenas para o DPO e para o membro do Comitê LGPD em questão.
        /// </summary>
        /// <param name="uid">Id do membro do comitê</param>
        /// <param name="encaminhadoAprovacao">Bool definindo se os casos de uso a serem selecionados já foram encaminhados para aprovação</param>
        /// <param name="aprovado">Bool definindo se os casos de uso a serem selecionados já foram aprovados</param>
        /// <param name="reprovado">Bool definindo se os casos de uso a serem selecionados já foram reprovados</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "caseListItems" onde se encontram os dados dos Casos de Uso selecionados, em formato reduzido (CaseListItem)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(ApiResponseType<List<CaseListItem>>))]
        [Route("extensao-encarregado/{uid:int}/status/{encaminhadoAprovacao:bool}/{aprovado:bool}/{reprovado:bool}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByExtensaoEncarregadoByStatus(int uid, bool encaminhadoAprovacao,
            bool aprovado, bool reprovado)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.UserId == uid || claims.IsDpo || claims.IsDeveloper))
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
                var comiteMember = await _context.Users.Where(u => u.Id == uid && u.IsComite)
                    .Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .SingleOrDefaultAsync();
                if (comiteMember == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, new
                    {
                        message = "Usuário requisitado não encontrado."
                    });

                var comiteMemberGroupsIds = comiteMember.GroupAccessExpirations.Select(g => g.Group.Id)
                    .ToList();

                var filteredCases = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .Where(c => comiteMemberGroupsIds.Contains(c.GrupoCriadorId) &&
                                c.Aprovado == aprovado &&
                                c.EncaminhadoAprovacao == encaminhadoAprovacao &&
                                c.Reprovado == reprovado)
                    .ToListAsync();

                var caseListItems = filteredCases.ConvertAll<CaseListItem>(CaseListItem.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { cases = caseListItems, message = CaseListSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna os totais de Casos de Uso por grupo de um usuário.
        /// Endpoint disponibilizado para os membros do Comitê LGPD, com cada membro tendo acesso apenas a seus grupos.
        /// </summary>
        /// <param name="uid">Id do usuário selecionado</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totals" onde se encontram os totais de Casos de Uso, com identificadores dos grupos (objeto GroupTotals).
        /// Também há uma chave "totalQuantity" com o totais somados, a fim de facilitar cálculos de percentagem.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(TotalsResponseType<GroupTotals>))]
        [Route("user/{uid:int}/group/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByUserGroups(int uid)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsComite || claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var userGroups = await _context.Users.Where(u => u.Id == uid)
                    .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .ToListAsync();

                var userGroupIds = userGroups.Select(g => g.Id)
                    .ToList();

                var totals = await _context.Cases.Where(c => userGroupIds.Contains(c.GrupoCriadorId))
                    .GroupBy(c => c.GrupoCriadorId)
                    .Select(c => new GroupTotals()
                    {
                        GroupId = c.FirstOrDefault()
                            .GrupoCriadorId,
                        GroupName = "",
                        QuantityInGroup = c.Count()
                    })
                    .ToListAsync();

                foreach (var total in totals)
                {
                    total.GroupName = await GetGroupName(total.GroupId);
                }

                totals = totals.OrderBy(t => t.GroupName)
                    .ToList();

                var totalQuantity = await _context.Cases.Where(c => userGroupIds.Contains(c.GrupoCriadorId))
                    .CountAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { totals, totalQuantity, message = TotalsSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
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
        [ResponseType(typeof(TotalsResponseType<ExtensaoEncarregadoTotals>))]
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
                    .Include(g => g.GroupAccessExpirations.Select(gae => gae.Group))
                    .ToListAsync();

                var totals = new List<ExtensaoEncarregadoTotals>();
                var totalQuantity = 0;

                foreach (var comiteMember in comiteMembers)
                {
                    var comiteMemberGroupsIds = comiteMember.GroupAccessExpirations.Select(g => g.Group.Id)
                        .ToList();

                    var comiteMemberCases = await _context.Cases.CountAsync(c =>
                        comiteMemberGroupsIds.Contains(c.GrupoCriadorId));

                    if (comiteMemberCases == 0) continue;

                    totals.Add(new ExtensaoEncarregadoTotals()
                    {
                        ExtensaoId = comiteMember.Id,
                        ExtensaoNome = Seguranca.ObterUsuario(comiteMember.Username.ToUpper())
                            .Nome,
                        QuantityByExtensao = comiteMemberCases
                    });

                    totalQuantity += comiteMemberCases;
                }

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { totals, totalQuantity, message = TotalsSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna os totais de Casos de Uso por status de aprovação.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totals" onde se encontram os totais de Casos de Uso, com identificadores dos status (objeto StatusTotals).
        /// Também há uma chave "totalQuantity" com o totais somados, a fim de facilitar cálculos de percentagem.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(TotalsResponseType<StatusTotals>))]
        [Route("status/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByStatus()
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
                var totals = await _context.Cases.GroupBy(c => new
                    {
                        c.Aprovado,
                        c.EncaminhadoAprovacao,
                        c.Reprovado
                    })
                    .Select(c => new StatusTotals()
                    {
                        Nome = c.FirstOrDefault()
                            .Aprovado
                            ? "Concluído"
                            : (c.FirstOrDefault()
                                .Reprovado
                                ? "Reprovado"
                                : (c.FirstOrDefault()
                                    .EncaminhadoAprovacao
                                    ? "Pendente Aprovação"
                                    : "Em Preenchimento")),
                        Aprovado = c.FirstOrDefault()
                            .Aprovado,
                        EncaminhadoAprovacao = c.FirstOrDefault()
                            .EncaminhadoAprovacao,
                        Reprovado = c.FirstOrDefault()
                            .Reprovado,
                        QuantidadeByStatus = c.Count(),
                    })
                    .ToListAsync();

                var totalQuantity = await _context.Cases.CountAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { totals, totalQuantity, message = TotalsSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna o total de Casos de Uso no status de aprovação selecionado. 
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="encaminhadoAprovacao">Bool definindo se os casos de uso a serem selecionados já foram encaminhados para aprovação</param>
        /// <param name="aprovado">Bool definindo se os casos de uso a serem selecionados já foram aprovados</param>
        /// <param name="reprovado">Bool definindo se os casos de uso a serem selecionados já foram reprovados</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totalInStatus" onde se encontra o total dos Casos de Uso no status selecionado.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(ApiResponseType<int>))]
        [Route("status/{encaminhadoAprovacao:bool}/{aprovado:bool}/{reprovado:bool}/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsBySelectedStatus(bool encaminhadoAprovacao, bool aprovado,
            bool reprovado)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);


                if (!(claims.IsComite || claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var totalInStatus = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .Where(c => c.Aprovado == aprovado &&
                                c.Reprovado == reprovado &&
                                c.EncaminhadoAprovacao == encaminhadoAprovacao)
                    .CountAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { totalInStatus, message = TotalsSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna os totais dos Casos de Uso de um grupo de acesso por status de aprovação.
        /// Endpoint disponibilizado apenas para o DPO e membros do grupo especificado.
        /// </summary>
        /// <param name="gid">Id do grupo</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totals" onde se encontram os totais de Casos de Uso, com identificadores dos status (objeto StatusTotals).
        /// Também há uma chave "totalQuantity" com o totais somados, a fim de facilitar cálculos de percentagem.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(TotalsResponseType<StatusTotals>))]
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
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                        .ToListAsync();

                    var searchedGroup = await _context.Groups.FindAsync(gid);

                    if (!(userGroups.Contains(searchedGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }


                var totals = await _context.Cases.Where(c => c.GrupoCriadorId == gid)
                    .GroupBy(c => new
                    {
                        c.Aprovado,
                        c.Reprovado,
                        c.EncaminhadoAprovacao
                    })
                    .Select(c => new StatusTotals()
                    {
                        Nome = c.FirstOrDefault()
                            .Aprovado
                            ? "Concluído"
                            : (c.FirstOrDefault()
                                .Reprovado
                                ? "Reprovado"
                                : (c.FirstOrDefault()
                                    .EncaminhadoAprovacao
                                    ? "Pendente Aprovação"
                                    : "Em Preenchimento")),
                        Aprovado = c.FirstOrDefault()
                            .Aprovado,
                        EncaminhadoAprovacao = c.FirstOrDefault()
                            .EncaminhadoAprovacao,
                        Reprovado = c.FirstOrDefault()
                            .Reprovado,
                        QuantidadeByStatus = c.Count(),
                    })
                    .ToListAsync();

                var totalQuantity = await _context.Cases.Where(c => c.GrupoCriadorId == gid)
                    .CountAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { totals, totalQuantity, message = TotalsSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna o total de Casos de Uso de um grupo de acesso no status de aprovação selecionado. 
        /// Endpoint disponibilizado apenas para o DPO e membros do grupo selecionado.
        /// </summary>
        /// <param name="gid">Id do grupo</param>
        /// <param name="encaminhadoAprovacao">Bool definindo se os casos de uso a serem selecionados já foram encaminhados para aprovação</param>
        /// <param name="aprovado">Bool definindo se os casos de uso a serem selecionados já foram aprovados</param>
        /// <param name="reprovado">Bool definindo se os casos de uso a serem selecionados já foram reprovados</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totalInStatus" onde se encontra o total dos Casos de Uso do grupo especificado no status selecionado.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(ApiResponseType<int>))]
        [Route("group/{gid:int}/status/{encaminhadoAprovacao:bool}/{aprovado:bool}/{reprovado:bool}/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByGroupBySelectedStatus(int gid, bool encaminhadoAprovacao,
            bool aprovado, bool reprovado)
        {
            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                        .ToListAsync();

                    var searchedGroup = await _context.Groups.FindAsync(gid);

                    if (!(userGroups.Contains(searchedGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (gid <= 0)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });
                }

                var totalInStatus = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .Where(c => c.GrupoCriadorId == gid &&
                                c.Aprovado == aprovado &&
                                c.Reprovado == reprovado &&
                                c.EncaminhadoAprovacao == encaminhadoAprovacao)
                    .CountAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { totalInStatus, message = TotalsSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna os totais dos Casos de Uso dos grupos de acesso de um Mebro do Comitê por status de aprovação.
        /// Endpoint disponibilizado apenas para o DPO e para o membro do comitê em questão.
        /// </summary>
        /// <param name="uid">Id do membro do Comitê especificado</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totals" onde se encontram os totais de Casos de Uso, com identificadores dos status (objeto StatusTotals).
        /// Também há uma chave "totalQuantity" com o totais somados, a fim de facilitar cálculos de percentagem.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(TotalsResponseType<StatusTotals>))]
        [Route("extensao-encarregado/{uid:int}/status/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByExtensaoEncarregadoByStatus(int uid)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.UserId == uid || claims.IsDpo || claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var comiteMember = await _context.Users.Where(u => u.Id == uid)
                    .Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .SingleOrDefaultAsync();
                if (comiteMember == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, new
                    {
                        message = "Membro do comitê buscado não foi encontrado."
                    });

                var comiteMemberGroupsIds = comiteMember.GroupAccessExpirations.Select(g => g.Group.Id)
                    .ToList();


                var totals = await _context.Cases.Where(c => comiteMemberGroupsIds.Contains(c.GrupoCriadorId))
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
                                .Reprovado
                                ? "Reprovado"
                                : (c.FirstOrDefault()
                                    .EncaminhadoAprovacao
                                    ? "Pendente Aprovação"
                                    : "Em Preenchimento")),
                        Aprovado = c.FirstOrDefault()
                            .Aprovado,
                        EncaminhadoAprovacao = c.FirstOrDefault()
                            .EncaminhadoAprovacao,
                        Reprovado = c.FirstOrDefault()
                            .Reprovado,
                        QuantidadeByStatus = c.Count(),
                    })
                    .ToListAsync();

                var totalQuantity = await _context.Cases.Where(c => comiteMemberGroupsIds.Contains(c.GrupoCriadorId))
                    .CountAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { totals, totalQuantity, message = TotalsSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Retorna o total de Casos de Uso dos grupos de acesso de um Mebro do Comitê no status de aprovação selecionado. 
        /// Endpoint disponibilizado apenas para o DPO e para o membro do comitê em questão.
        /// </summary>
        /// <param name="uid">Id do membro do Comitê especificado</param>
        /// <param name="encaminhadoAprovacao">Bool definindo se os casos de uso a serem selecionados já foram encaminhados para aprovação</param>
        /// <param name="aprovado">Bool definindo se os casos de uso a serem selecionados já foram aprovados</param>
        /// <param name="reprovado">Bool definindo se os casos de uso a serem selecionados já foram reprovados</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totalInStatus" onde se encontra o total dos Casos de Uso dos grupos de acesso de um Mebro do Comitê especificado no status selecionado.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(TotalsResponseType<StatusTotals>))]
        [Route(
            "extensao-encarregado/{uid:int}/status/{encaminhadoAprovacao:bool}/{aprovado:bool}/{reprovado:bool}/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByExtensaoEncarregadoBySelectedStatus(int uid,
            bool encaminhadoAprovacao, bool aprovado, bool reprovado)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.UserId == uid || claims.IsDpo || claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var comiteMember = await _context.Users.Where(u => u.Id == uid)
                    .Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .SingleOrDefaultAsync();
                if (comiteMember == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, new
                    {
                        message = "Membro do comitê buscado não foi encontrado."
                    });

                var comiteMemberGroupsIds = comiteMember.GroupAccessExpirations.Select(g => g.Group.Id)
                    .ToList();

                var totalInStatus = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .Where(c => comiteMemberGroupsIds.Contains(c.GrupoCriadorId) &&
                                c.Aprovado == aprovado &&
                                c.Reprovado == reprovado &&
                                c.EncaminhadoAprovacao == encaminhadoAprovacao)
                    .CountAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { totalInStatus, message = TotalsSuccessMessage });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
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
        [ResponseType(typeof(ApiResponseType<CaseDTO>))]
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
                var uniqueCase = await _context.Cases.Where(c => c.Id == cid)
                    .Include(c => c.Controlador)
                    .Include(c => c.Encarregado)
                    .Include(c => c.ExtensaoEncarregado)
                    .Include(c => c.AreaTratamentoDados)
                    .Include(c => c.Operador)
                    .Include(c => c.FasesCicloTratamento)
                    .Include(c => c.FinalidadeTratamento)
                    .Include(c => c.ItensCategoriaDadosPessoais)
                    .Include(c => c.CategoriasTitulares)
                    .Include(c => c.CategoriasTitulares.Categorias)
                    .Include(c => c.CategoriasTitulares.CriancasAdolescentes)
                    .Include(c => c.CategoriasTitulares.OutrosGruposVulneraveis)
                    .Include(c => c.CompartilhamentoDadosPessoais)
                    .Include(c => c.MedidasSegurancaPrivacidade)
                    .Include(c => c.TransferenciaInternacional)
                    .Include(c => c.ContratoServicosTi)
                    .Include(c => c.RiscosPrivacidade)
                    .Include(c => c.ObservacoesProcesso)
                    .SingleOrDefaultAsync();

                if (uniqueCase == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }


                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                        .ToListAsync();

                    var userGroupsId = userGroups.Select(g => g.Id)
                        .ToList();

                    var caseGroupId = uniqueCase.GrupoCriadorId;

                    if (!(userGroupsId.Contains(caseGroupId) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var caseDto = CaseDTO.ConvertToCaseDTO(uniqueCase);

                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    uniqueCase = caseDto, message = $"Processo ID {caseDto.Id} - {caseDto.Nome} obtido com sucesso!"
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Registra um Caso de Uso de dados pessoais, junto com um log de alteração.
        /// Endpoint disponibilizado para membros do grupo criador. Não autorizado para membros do Comitê LGPD.
        /// </summary>
        /// <param name="caseChange">Objeto vindo do corpo da requisição HTTP, representando o Caso de Uso e o log de alteração. Deve corresponder ao tipo CaseChange</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do Caso de Uso, ou indicando o erro ocorrido.
        /// Também retorna uma chave "caseToSave" contendo o Caso de Uso salvo
        /// </returns>
        [ResponseType(typeof(ApiResponseType<CaseDTO>))]
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
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                        .ToListAsync();
                    var caseGroup = await _context.Groups.FindAsync(caseChange.Case.GrupoCriadorId);

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

                var caseToSave = CaseDTO.ConvertToDomainCase(caseChange.Case);
                var newChangeLog = caseChange.ChangeLog;

                caseToSave.RectifyCase();

                _context.Cases.Add(caseToSave);
                await _context.SaveChangesAsync();

                newChangeLog.CaseId = caseToSave.Id;
                caseToSave.Ref =
                    $@"PRC-{caseToSave.Area}-{caseToSave.DataCriacao:yyyy-MM-dd}/{DateTime.Now:ssfff}{caseToSave.Id}";
                _context.Entry(caseToSave)
                    .State = EntityState.Modified;
                _context.ChangeLogs.Add(newChangeLog);
                await _context.SaveChangesAsync();

                var responseCase = CaseDTO.ConvertToCaseDTO(caseToSave);

                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    message = $"Processo ID {responseCase.Id} - {responseCase.Nome} registrado com sucesso!",
                    caseToSave = responseCase
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
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
        /// Também retorna uma chave "caseToSave" contendo o Caso de Uso salvo
        /// </returns>
        [ResponseType(typeof(ApiResponseType<CaseDTO>))]
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
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                        .ToListAsync();

                    var userGroupsId = userGroups.Select(g => g.Id)
                        .ToList();

                    var caseGroupId = caseChange.Case.GrupoCriadorId;


                    if (!(userGroupsId.Contains(caseGroupId) && !claims.IsComite || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (cid <= 0)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Id inválido: Menor que 0." });
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

                var caseInDb = await _context.Cases.Where(c => c.Id == cid)
                    .Include(c => c.Controlador)
                    .Include(c => c.Encarregado)
                    .Include(c => c.ExtensaoEncarregado)
                    .Include(c => c.AreaTratamentoDados)
                    .Include(c => c.Operador)
                    .Include(c => c.FasesCicloTratamento)
                    .Include(c => c.FinalidadeTratamento)
                    .Include(c => c.ItensCategoriaDadosPessoais)
                    .Include(c => c.CategoriasTitulares)
                    .Include(c => c.CategoriasTitulares.Categorias)
                    .Include(c => c.CategoriasTitulares.CriancasAdolescentes)
                    .Include(c => c.CategoriasTitulares.OutrosGruposVulneraveis)
                    .Include(c => c.CompartilhamentoDadosPessoais)
                    .Include(c => c.MedidasSegurancaPrivacidade)
                    .Include(c => c.TransferenciaInternacional)
                    .Include(c => c.ContratoServicosTi)
                    .Include(c => c.RiscosPrivacidade)
                    .Include(c => c.ObservacoesProcesso)
                    .SingleOrDefaultAsync();

                if (caseInDb == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Id inválido: Não encontrado no banco para edição" });
                }

                var caseToSave = CaseDTO.ConvertToDomainCase(caseChange.Case);
                var newChangeLog = caseChange.ChangeLog;

                caseToSave.RectifyCase();

                _context.ChangeLogs.Add(newChangeLog);

                // Update parent
                _context.Entry(caseInDb)
                    .CurrentValues.SetValues(caseToSave);

                // Delete children
                if (caseToSave.Controlador.Id != caseInDb.Controlador.Id)
                {
                    _context.AgentesTratamento.Remove(caseInDb.Controlador);
                }

                if (caseToSave.Encarregado.Id != caseInDb.Encarregado.Id)
                {
                    _context.AgentesTratamento.Remove(caseInDb.Encarregado);
                }

                if (caseToSave.ExtensaoEncarregado.Id != caseInDb.ExtensaoEncarregado.Id)
                {
                    _context.AgentesTratamento.Remove(caseInDb.ExtensaoEncarregado);
                }

                if (caseToSave.AreaTratamentoDados.Id != caseInDb.AreaTratamentoDados.Id)
                {
                    _context.AgentesTratamento.Remove(caseInDb.AreaTratamentoDados);
                }

                if (caseToSave.Operador.Id != caseInDb.Operador.Id)
                {
                    _context.AgentesTratamento.Remove(caseInDb.Operador);
                }

                if (caseToSave.FasesCicloTratamento.Id != caseInDb.FasesCicloTratamento.Id)
                {
                    _context.FasesCicloTratamento.Remove(caseInDb.FasesCicloTratamento);
                }

                if (caseToSave.FinalidadeTratamento.Id != caseInDb.FinalidadeTratamento.Id)
                {
                    _context.FinalidadesTratamento.Remove(caseInDb.FinalidadeTratamento);
                }

                if (caseToSave.CategoriasTitulares.Id != caseInDb.CategoriasTitulares.Id)
                {
                    _context.CategoriasTitulares.Remove(caseInDb.CategoriasTitulares);
                }

                foreach (var item in caseInDb.ItensCategoriaDadosPessoais.ToList()
                             .Where(item => caseToSave.ItensCategoriaDadosPessoais.All(c => c.Id != item.Id)))
                {
                    _context.ItensCategoriaDadosPessoais.Remove(item);
                }

                foreach (var item in caseInDb.CompartilhamentoDadosPessoais.ToList()
                             .Where(item => caseToSave.CompartilhamentoDadosPessoais.All(c => c.Id != item.Id)))
                {
                    _context.ItensCompartilhamentoDados.Remove(item);
                }

                foreach (var item in caseInDb.MedidasSegurancaPrivacidade.ToList()
                             .Where(item => caseToSave.MedidasSegurancaPrivacidade.All(c => c.Id != item.Id)))
                {
                    _context.ItensMedidaSegurancaPrivacidade.Remove(item);
                }

                foreach (var item in caseInDb.TransferenciaInternacional.ToList()
                             .Where(item => caseToSave.TransferenciaInternacional.All(c => c.Id != item.Id)))
                {
                    _context.ItensTransferenciaInternacional.Remove(item);
                }

                foreach (var item in caseInDb.ContratoServicosTi.ToList()
                             .Where(item => caseToSave.ContratoServicosTi.All(c => c.Id != item.Id)))
                {
                    _context.ItensContratoTi.Remove(item);
                }

                foreach (var item in caseInDb.RiscosPrivacidade.ToList()
                             .Where(item => caseToSave.RiscosPrivacidade.All(c => c.Id != item.Id)))
                {
                    _context.ItensRiscoPrivacidade.Remove(item);
                }

                foreach (var item in caseInDb.ObservacoesProcesso.ToList()
                             .Where(item => caseToSave.ObservacoesProcesso.All(c => c.Id != item.Id)))
                {
                    _context.ItensObservacoesProcesso.Remove(item);
                }

                // Update and Insert children
                var controladorInDb = caseInDb.Controlador;
                if (controladorInDb != null)
                    // Update child
                    _context.Entry(controladorInDb)
                        .CurrentValues.SetValues(caseToSave.Controlador);
                else
                {
                    // Insert child
                    var newControlador = new AgenteTratamento()
                    {
                        Nome = caseToSave.Controlador.Nome,
                        Area = caseToSave.Controlador.Area,
                        Email = caseToSave.Controlador.Email,
                        Telefone = caseToSave.Controlador.Telefone
                    };
                    caseInDb.Controlador = newControlador;
                }

                var encarregadoInDb = caseInDb.Encarregado;
                if (encarregadoInDb != null)
                    // Update child
                    _context.Entry(encarregadoInDb)
                        .CurrentValues.SetValues(caseToSave.Encarregado);
                else
                {
                    // Insert child
                    var newEncarregado = new AgenteTratamento()
                    {
                        Nome = caseToSave.Encarregado.Nome,
                        Area = caseToSave.Encarregado.Area,
                        Email = caseToSave.Encarregado.Email,
                        Telefone = caseToSave.Encarregado.Telefone
                    };
                    caseInDb.Encarregado = newEncarregado;
                }

                var extensaoEncarregadoInDb = caseInDb.ExtensaoEncarregado;
                if (extensaoEncarregadoInDb != null)
                    // Update child
                    _context.Entry(extensaoEncarregadoInDb)
                        .CurrentValues.SetValues(caseToSave.ExtensaoEncarregado);
                else
                {
                    // Insert child
                    var newExtensaoEncarregado = new AgenteTratamento()
                    {
                        Nome = caseToSave.ExtensaoEncarregado.Nome,
                        Area = caseToSave.ExtensaoEncarregado.Area,
                        Email = caseToSave.ExtensaoEncarregado.Email,
                        Telefone = caseToSave.ExtensaoEncarregado.Telefone
                    };
                    caseInDb.ExtensaoEncarregado = newExtensaoEncarregado;
                }

                var areaTratamentoDadosInDb = caseInDb.AreaTratamentoDados;
                if (areaTratamentoDadosInDb != null)
                    // Update child
                    _context.Entry(areaTratamentoDadosInDb)
                        .CurrentValues.SetValues(caseToSave.AreaTratamentoDados);
                else
                {
                    // Insert child
                    var newAreaTratamentoDados = new AgenteTratamento()
                    {
                        Nome = caseToSave.AreaTratamentoDados.Nome,
                        Area = caseToSave.AreaTratamentoDados.Area,
                        Email = caseToSave.AreaTratamentoDados.Email,
                        Telefone = caseToSave.AreaTratamentoDados.Telefone
                    };
                    caseInDb.AreaTratamentoDados = newAreaTratamentoDados;
                }

                var operadorInDb = caseInDb.Operador;
                if (operadorInDb != null)
                    // Update child
                    _context.Entry(operadorInDb)
                        .CurrentValues.SetValues(caseToSave.Operador);
                else
                {
                    // Insert child
                    var newOperador = new AgenteTratamento()
                    {
                        Nome = caseToSave.Operador.Nome,
                        Area = caseToSave.Operador.Area,
                        Email = caseToSave.Operador.Email,
                        Telefone = caseToSave.Operador.Telefone
                    };
                    caseInDb.Operador = newOperador;
                }

                var faseCicloTratamentoInDb = caseInDb.FasesCicloTratamento;
                if (faseCicloTratamentoInDb != null)
                    // Update child
                    _context.Entry(faseCicloTratamentoInDb)
                        .CurrentValues.SetValues(caseToSave.FasesCicloTratamento);
                else
                {
                    // Insert child
                    var newFasesCicloTratamento = new FasesCicloTratamento()
                    {
                        Coleta = caseToSave.FasesCicloTratamento.Coleta,
                        Compartilhamento = caseToSave.FasesCicloTratamento.Compartilhamento,
                        Eliminacao = caseToSave.FasesCicloTratamento.Eliminacao,
                        Processamento = caseToSave.FasesCicloTratamento.Processamento,
                        Retencao = caseToSave.FasesCicloTratamento.Retencao,
                    };
                    caseInDb.FasesCicloTratamento = newFasesCicloTratamento;
                }

                var finalidadeTratamentoInDb = caseInDb.FinalidadeTratamento;
                if (finalidadeTratamentoInDb != null)
                    // Update child
                    _context.Entry(finalidadeTratamentoInDb)
                        .CurrentValues.SetValues(caseToSave.FinalidadeTratamento);
                else
                {
                    // Insert child
                    var newFinalidadeTratamento = new FinalidadeTratamento()
                    {
                        BeneficiosEsperados = caseToSave.FinalidadeTratamento.BeneficiosEsperados,
                        DescricaoFinalidade = caseToSave.FinalidadeTratamento.DescricaoFinalidade,
                        HipoteseTratamento = caseToSave.FinalidadeTratamento.HipoteseTratamento,
                        PrevisaoLegal = caseToSave.FinalidadeTratamento.PrevisaoLegal,
                        ResultadosTitular = caseToSave.FinalidadeTratamento.ResultadosTitular,
                    };
                    caseInDb.FinalidadeTratamento = newFinalidadeTratamento;
                }

                var categoriasTitularesInDb = caseInDb.CategoriasTitulares;
                if (categoriasTitularesInDb != null)
                    // Update child
                    _context.Entry(categoriasTitularesInDb)
                        .CurrentValues.SetValues(caseToSave.CategoriasTitulares);
                else
                {
                    // Insert child
                    var newCategoriasTitulares = new CategoriasTitulares()
                    {
                        Categorias = caseToSave.CategoriasTitulares.Categorias,
                        CriancasAdolescentes = caseToSave.CategoriasTitulares.CriancasAdolescentes,
                        OutrosGruposVulneraveis = caseToSave.CategoriasTitulares.OutrosGruposVulneraveis,
                    };
                    caseInDb.CategoriasTitulares = newCategoriasTitulares;
                }

                foreach (var item in caseToSave.ItensCategoriaDadosPessoais)
                {
                    var itemInDb =
                        caseInDb.ItensCategoriaDadosPessoais.SingleOrDefault(i => i.Id == item.Id && i.Id != 0);
                    if (itemInDb != null)
                        // Update child
                        _context.Entry(itemInDb)
                            .CurrentValues.SetValues(item);
                    else
                    {
                        // Insert child
                        var newItem = new ItemCategoriaDadosPessoais()
                        {
                            CategoriaDadosPessoais = item.CategoriaDadosPessoais,
                            Descricao = item.Descricao,
                            FonteRetencao = item.FonteRetencao,
                            LocalArmazenamento = item.LocalArmazenamento,
                            TempoRetencao = item.TempoRetencao,
                        };
                        caseInDb.ItensCategoriaDadosPessoais.Add(newItem);
                    }
                }

                foreach (var item in caseToSave.CompartilhamentoDadosPessoais)
                {
                    var itemInDb =
                        caseInDb.CompartilhamentoDadosPessoais.SingleOrDefault(i => i.Id == item.Id && i.Id != 0);
                    if (itemInDb != null)
                        // Update child
                        _context.Entry(itemInDb)
                            .CurrentValues.SetValues(item);
                    else
                    {
                        // Insert child
                        var newItem = new ItemCompartilhamentoDados()
                        {
                            DescricaoDadosCompartilhados = item.DescricaoDadosCompartilhados,
                            DescricaoFinalidadeComp = item.DescricaoFinalidadeComp,
                            FinalidadeComp = item.FinalidadeComp,
                            NivelCompartilhamento = item.NivelCompartilhamento,
                            NomeInstituicao = item.NomeInstituicao,
                            TipoCompDados = item.TipoCompDados,
                        };
                        caseInDb.CompartilhamentoDadosPessoais.Add(newItem);
                    }
                }

                foreach (var item in caseToSave.MedidasSegurancaPrivacidade)
                {
                    var itemInDb =
                        caseInDb.MedidasSegurancaPrivacidade.SingleOrDefault(i => i.Id == item.Id && i.Id != 0);
                    if (itemInDb != null)
                        // Update child
                        _context.Entry(itemInDb)
                            .CurrentValues.SetValues(item);
                    else
                    {
                        // Insert child
                        var newItem = new ItemMedidaSegurancaPrivacidade()
                        {
                            Descricao = item.Descricao,
                            Tipo = item.Tipo
                        };
                        caseInDb.MedidasSegurancaPrivacidade.Add(newItem);
                    }
                }

                foreach (var item in caseToSave.TransferenciaInternacional)
                {
                    var itemInDb =
                        caseInDb.TransferenciaInternacional.SingleOrDefault(i => i.Id == item.Id && i.Id != 0);
                    if (itemInDb != null)
                        // Update child
                        _context.Entry(itemInDb)
                            .CurrentValues.SetValues(item);
                    else
                    {
                        // Insert child
                        var newItem = new ItemTransferenciaInternacional()
                        {
                            DadosTransferidos = item.DadosTransferidos,
                            NomeOrganizacao = item.NomeOrganizacao,
                            Pais = item.Pais,
                            TipoGarantia = item.TipoGarantia
                        };
                        caseInDb.TransferenciaInternacional.Add(newItem);
                    }
                }

                foreach (var item in caseToSave.ContratoServicosTi)
                {
                    var itemInDb = caseInDb.ContratoServicosTi.SingleOrDefault(i => i.Id == item.Id && i.Id != 0);
                    if (itemInDb != null)
                        // Update child
                        _context.Entry(itemInDb)
                            .CurrentValues.SetValues(item);
                    else
                    {
                        // Insert child
                        var newItem = new ItemContratoTi()
                        {
                        };
                        caseInDb.ContratoServicosTi.Add(newItem);
                    }
                }

                foreach (var item in caseToSave.RiscosPrivacidade)
                {
                    var itemInDb = caseInDb.RiscosPrivacidade.SingleOrDefault(i => i.Id == item.Id && i.Id != 0);
                    if (itemInDb != null)
                        // Update child
                        _context.Entry(itemInDb)
                            .CurrentValues.SetValues(item);
                    else
                    {
                        // Insert child
                        var newItem = new ItemRiscoPrivacidade()
                        {
                            Observacoes = item.Observacoes,
                            TipoRisco = item.TipoRisco
                        };
                        caseInDb.RiscosPrivacidade.Add(newItem);
                    }
                }

                foreach (var item in caseToSave.ObservacoesProcesso)
                {
                    var itemInDb = caseInDb.ObservacoesProcesso.SingleOrDefault(i => i.Id == item.Id && i.Id != 0);
                    if (itemInDb != null)
                        // Update child
                        _context.Entry(itemInDb)
                            .CurrentValues.SetValues(item);
                    else
                    {
                        // Insert child
                        var newItem = new ItemObservacoesProcesso()
                        {
                            DescricaoObs = item.DescricaoObs
                        };
                        caseInDb.ObservacoesProcesso.Add(newItem);
                    }
                }

                await _context.SaveChangesAsync();

                var responseCase = CaseDTO.ConvertToCaseDTO(caseToSave);

                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    message = $"Processo ID {responseCase.Id} - {responseCase.Nome} alterado com sucesso!",
                    caseToSave = responseCase
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
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
        [Route("delete/{cid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Delete(int cid)
        {
            if (cid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var caseToDelete = await _context.Cases.Where(c => c.Id == cid)
                    .Include(c => c.Controlador)
                    .Include(c => c.Encarregado)
                    .Include(c => c.ExtensaoEncarregado)
                    .Include(c => c.AreaTratamentoDados)
                    .Include(c => c.Operador)
                    .Include(c => c.FasesCicloTratamento)
                    .Include(c => c.FinalidadeTratamento)
                    .Include(c => c.ItensCategoriaDadosPessoais)
                    .Include(c => c.CategoriasTitulares)
                    .Include(c => c.CategoriasTitulares.Categorias)
                    .Include(c => c.CategoriasTitulares.CriancasAdolescentes)
                    .Include(c => c.CategoriasTitulares.OutrosGruposVulneraveis)
                    .Include(c => c.CompartilhamentoDadosPessoais)
                    .Include(c => c.MedidasSegurancaPrivacidade)
                    .Include(c => c.TransferenciaInternacional)
                    .Include(c => c.ContratoServicosTi)
                    .Include(c => c.RiscosPrivacidade)
                    .Include(c => c.ObservacoesProcesso)
                    .SingleOrDefaultAsync();
                if (caseToDelete == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                var userDeleting = new User();

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                        .ToListAsync();

                    var userGroupsId = userGroups.Select(g => g.Id)
                        .ToList();

                    var caseGroupId = caseToDelete.GrupoCriadorId;

                    userDeleting = await _context.Users.FindAsync(claims.UserId);

                    if (!(userGroupsId.Contains(caseGroupId) && !claims.IsComite || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (userDeleting != null)
                {
                    var deleteChangeLog = new ChangeLog()
                    {
                        CaseRef = caseToDelete.Ref,
                        CaseId = caseToDelete.Id,
                        ChangeDate = DateTime.Now,
                        UserId = userDeleting.Id,
                        UsernameResp = userDeleting.Username,
                        CaseDiff = @"
                        {
                            Name = ""Remoção"",
                            Identifier = ""0.0.2""
                        }"
                    };

                    _context.ChangeLogs.Add(deleteChangeLog);
                }

                _context.Cases.Remove(caseToDelete);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = $"Processo ID {cid} removido com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        /// <summary>
        /// Realiza a aprovação ou reprovação de um Caso de Uso.
        /// Endpoint disponibilizado para o DPO e para membros do Comitê LGPD com acesso ao grupo criador.
        /// </summary>
        /// <param name="cid">Id do caso de uso</param>
        /// <param name="aprovado">Objeto vindo do corpo da requisição HTTP, indicando se o caso foi aprovado ou não</param>
        /// <param name="comentarioReprovado">String contendo o comentário de reprovação</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do Caso de Uso, ou indicando o erro ocorrido
        /// </returns>
        [Route("approve/{cid:int}/{aprovado:bool}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Approve(int cid, bool aprovado, [FromBody] string comentarioReprovado)
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
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                        .ToListAsync();
                    var userGroupsId = userGroups.Select(g => g.Id)
                        .ToList();
                    var caseGroupId = caseToApprove.GrupoCriadorId;


                    if (!(claims.IsComite && userGroupsId.Contains(caseGroupId) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var changeLog = new ChangeLog()
                {
                    CaseRef = caseToApprove.Ref,
                    CaseId = caseToApprove.Id,
                    ChangeDate = DateTime.Now,
                    UserId = userId,
                    UsernameResp = caseToApprove.UsernameResponsavel,
                };


                if (!aprovado)
                {
                    caseToApprove.ReproveCase(comentarioReprovado);

                    changeLog.CaseDiff = @"
                        {
                            Identifier = ""0.0"", Name = ""Reprovação""
                        }";

                    _context.ChangeLogs.Add(changeLog);
                    _context.Entry(caseToApprove)
                        .State = EntityState.Modified;
                    await _context.SaveChangesAsync();

                    return Request.CreateResponse(HttpStatusCode.OK, new
                    {
                        message = $"Processo ID {caseToApprove.Id} - {caseToApprove.Nome} reprovado com sucesso!"
                    });
                }

                caseToApprove.ApproveCase();

                changeLog.CaseDiff = @"
                    {
                        Identifier = ""0.1"", Name = ""Aprovado""
                    }
                ";

                _context.ChangeLogs.Add(changeLog);
                _context.Entry(caseToApprove)
                    .State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = $"Processo ID {caseToApprove.Id} - {caseToApprove.Nome} aprovado com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
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
                var caseToRequestApproval = await _context.Cases.Include(c => c.FinalidadeTratamento)
                    .SingleOrDefaultAsync(c => c.Id == cid);

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
                        .SelectMany(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                        .ToListAsync();
                    var userGroupsId = userGroups.Select(g => g.Id)
                        .ToList();
                    var caseGroupId = caseToRequestApproval.GrupoCriadorId;

                    if (!(userGroupsId.Contains(caseGroupId) && !claims.IsComite || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var usuarioChamadoItsm = await _context.Users.FindAsync(userId);
                if (usuarioChamadoItsm == null)
                {
                    throw new ArgumentNullException(nameof(usuarioChamadoItsm));
                }


                if (usuarioChamadoItsm.Username.ToUpper() != "LGPDCOMUM")
                {
                    var userEmailId = _context.ILA_VW_USUARIO
                        .Where(u => u.TX_USERNAME == usuarioChamadoItsm.Username.ToUpper())
                        .Select(u => u.ID_CODUSUARIO)
                        .SingleOrDefault();

                    caseToRequestApproval.SendCaseToApproval(usuarioChamadoItsm.Username.ToUpper(), userEmailId);
                }
                else
                {
                    var userEmailId = _context.ILA_VW_USUARIO.Where(u => u.TX_USERNAME == "URIELF")
                        .Select(u => u.ID_CODUSUARIO)
                        .SingleOrDefault();
                    caseToRequestApproval.SendCaseToApproval("URIELF", userEmailId);
                }


                var changeLog = new ChangeLog()
                {
                    CaseId = caseToRequestApproval.Id,
                    ChangeDate = DateTime.Now,
                    UserId = userId,
                    CaseDiff = @"
                        {
                            Identifier = ""0.0.1"", Name = ""Encaminhado para aprovação""
                        }"
                };

                _context.ChangeLogs.Add(changeLog);
                _context.Entry(caseToRequestApproval)
                    .State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    message =
                        $"Processo ID {caseToRequestApproval.Id} - {caseToRequestApproval.Nome} enviado para aprovação com sucesso!"
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                ErrorReportingUtil.SendErrorEmail(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
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

        private async Task<string> GetGroupName(int gid)
        {
            var groupInDb = await _context.Groups.FindAsync(gid);
            return (groupInDb != null) ? groupInDb.Nome.ToUpper() : "";
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.DTOs;
using CPTM.ILA.Web.Util;
using Microsoft.Ajax.Utilities;

namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador para Requisições de Acesso ao sistema ILA.
    /// </summary>
    [RoutePrefix("api/access-requests")]
    public class AccessRequestsController : ApiController
    {
        private readonly ILAContext _context;

        private const string ErrorMessage = "Algo deu errado no servidor. Problema foi reportado ao suporte técnico";

        //private const string ItsmUrl = "https://panelas-app2:8443/api/";
        //private const string ApiLogin = "INTEGRACAO_CPTM_LGPD";
        //private const string ApiPass = "INTEGRACAO_CPTM_LGPD";


        /// <inheritdoc />
        public AccessRequestsController()
        {
            _context = new ILAContext();
        }

        /// <summary>
        /// Retorna todas uma solicitações de acesso específica. Endpoint disponibilizado para o DPO e membros do Comitê LGPD.
        /// </summary>
        /// <param name="arid">Id da Requisição de Acesso</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "accessRequest" onde se encontram os dados da Requisição de Acesso.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(ApiResponseType<AccessRequestDTO>))]
        [Route("{arid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> Get(int arid)
        {
            if (arid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var accessRequest = await _context.AccessRequests.Where(ar => ar.Id == arid)
                    .Include(ar => ar.Groups)
                    .SingleOrDefaultAsync();

                if (accessRequest == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    if (accessRequest.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoComite &&
                        !(claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }

                    if (!(claims.IsComite || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var arDto = AccessRequest.ReduceToDto(accessRequest);


                return Request.CreateResponse(HttpStatusCode.OK, new { accessRequest = arDto });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Retornaa o arquivo de email de aprovação enviado para uma determinada Requisição de Acesso.
        /// Endpoint disponibilizado para o DPO e membros do Comitê LGPD.
        /// </summary>
        /// <param name="arid">Id da Requisição de Acesso</param>
        /// <returns>
        /// Status da transação e, no conteúdo da resposta, retorna o byteStream correspondente ao arquivo.
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" especificando o erro ocorrido.
        /// </returns>
        [Route("get-file/{arid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetArFile(int arid)
        {
            if (arid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var accessRequest = await _context.AccessRequests.FindAsync(arid);

                if (accessRequest == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    if (accessRequest.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoComite &&
                        !(claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }

                    if (!(claims.IsComite))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var filePath = accessRequest.EmailSuperiorPath;
                if (filePath == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound,
                        new { message = "Nenhum arquivo salvo para essa AR." });
                }

                var fileData = File.ReadAllBytes(filePath);
                var fileName = Path.GetFileName(filePath);

                var utf8 = Encoding.UTF8;
                var utfBytes = utf8.GetBytes(fileName);

                var fileNameProper = utf8.GetString(utfBytes);

                var response = Request.CreateResponse(HttpStatusCode.OK);
                response.Content = new ByteArrayContent(fileData);
                response.Content.Headers.ContentLength = fileData.LongLength;
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = fileNameProper
                };
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response.Headers.Add("Filename", fileNameProper);
                response.Content.Headers.Add("Access-Control-Expose-Headers", "Filename");


                return response;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Retorna todos as solicitações de acesso de um determinado tipo. Endpoint disponibilizado apenas para membros do Comitê LGPD.
        /// </summary>
        /// <param name="tipo">Int representando o tipo de Requisição de Acesso</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "accessRequests" onde se encontram os dados das Requisição de Acesso do tipo solicitado
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [ResponseType(typeof(ApiResponseType<List<AccessRequestDTO>>))]
        [Route("type/{tipo:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByType(TipoSolicitacaoAcesso tipo)
        {
            if (!Enum.IsDefined(typeof(TipoSolicitacaoAcesso), tipo))
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (tipo == TipoSolicitacaoAcesso.AcessoComite && !(claims.IsDpo || claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                if (!(claims.IsComite))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var accessRequests = await _context.AccessRequests.Where(ar => ar.TipoSolicitacaoAcesso == tipo)
                    .Include(ar => ar.Groups)
                    .ToListAsync();

                var arDtos = accessRequests.ConvertAll<AccessRequestDTO>(AccessRequest.ReduceToDto);

                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    requests = arDtos
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Registra solicitações de acesso ao sistema ILA. Disponibilidade do endpoint depende do tipo de solicitação:
        /// 1- Solicitações iniciais de acesso => aberta a todos os usuários com login no AD
        /// 2- Demais solicitações => aberta a todos os usuários com acesso ao ILA
        /// </summary>
        /// <param name="tipo">Int representando o tipo de Requisição de Acesso</param>
        /// <param name="accessRequestDto">Objeto vindo do corpo da requisição HTTP, representando a Requisição de Acesso. Deve corresponder ao tipo AccessRequestDTO</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro da Requisição de Acesso, ou indicando o erro ocorrido
        /// </returns>
        [ResponseType(typeof(ApiResponseType<AccessRequest>))]
        [Route("require/{tipo:int}")]
        [HttpPost]
        public async Task<HttpResponseMessage> RequestAccess(TipoSolicitacaoAcesso tipo,
            [FromBody] AccessRequestDTO accessRequestDto)
        {
            if (!Enum.IsDefined(typeof(TipoSolicitacaoAcesso), tipo))
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (!User.Identity.IsAuthenticated && tipo == TipoSolicitacaoAcesso.AcessoAGrupos)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message = "Objeto enviado não corresponde ao tipo AccessRequest, ou o tipo está fora do range"
                });
            }

            if (accessRequestDto.TipoSolicitacaoAcesso != tipo)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Solicitação de tipo incorreto." });
            }

            if (accessRequestDto.UsernameSolicitante.IsNullOrWhiteSpace())
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message = "Pelo menos um dos nomes de usuário fornecidos não existe. Verifique e tente novamente."
                });
            }

            if (!Seguranca.ExisteUsuario(accessRequestDto.UsernameSolicitante.ToUpper()))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message = "Pelo menos um dos nomes de usuário fornecidos não existe. Verifique e tente novamente."
                });
            }

            if (tipo != TipoSolicitacaoAcesso.AcessoComite)
            {
                if (accessRequestDto.UsernameSuperior.IsNullOrWhiteSpace())
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        message =
                            "Pelo menos um dos nomes de usuário fornecidos não existe. Verifique e tente novamente."
                    });
                }

                if (!Seguranca.ExisteUsuario(accessRequestDto.UsernameSuperior.ToUpper()))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        message =
                            "Pelo menos um dos nomes de usuário fornecidos não existe. Verifique e tente novamente."
                    });
                }
            }

            try
            {
                var chamadoAberto = await ItsmUtil.AbrirChamado(accessRequestDto.UsernameSolicitante.ToUpper(),
                    tipo.ToString(),
                    accessRequestDto.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoAGrupos
                        ? TipoChamado.ACESSO_A_GRUPOS
                        : TipoChamado.ACESSO_AO_SISTEMA);

                if (!chamadoAberto)
                {
                    return Request.CreateResponse(HttpStatusCode.OK,
                        new { message = "Não foi possível abrir o chamado de requisição de acesso no ITSM!" });
                }

                var userInDb = await _context.Users
                    .Where(u => u.Username.ToUpper() == accessRequestDto.UsernameSolicitante.ToUpper())
                    .Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .SingleOrDefaultAsync();

                if (userInDb != null &&
                    userInDb.IsComite &&
                    accessRequestDto.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoComite)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Este usuário solicitante já tem o nível de acesso do Comite LGPD!" });
                }

                if (userInDb != null && accessRequestDto.TipoSolicitacaoAcesso != TipoSolicitacaoAcesso.AcessoAGrupos)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Este usuário solicitante já tem acesso ao sistema!" });
                }

                var arGroups = new List<Group>();

                if (tipo == TipoSolicitacaoAcesso.AcessoAGrupos || tipo == TipoSolicitacaoAcesso.AcessoComite)
                {
                    foreach (var groupName in accessRequestDto.GroupNames)
                    {
                        var selectedGroup =
                            await _context.Groups.SingleOrDefaultAsync(g => g.Nome.ToUpper() == groupName.ToUpper());
                        if (selectedGroup == null)
                        {
                            var newGroup = new Group()
                            {
                                Nome = groupName.ToUpper()
                            };
                            selectedGroup = newGroup;
                        }

                        arGroups.Add(selectedGroup);
                    }
                }

                if (tipo == TipoSolicitacaoAcesso.AcessoAoSistema)
                {
                    var userAd = Seguranca.ObterUsuario(accessRequestDto.UsernameSolicitante.ToUpper());
                    var selectedGroup =
                        await _context.Groups.SingleOrDefaultAsync(g =>
                            g.Nome.ToUpper() == userAd.Departamento.ToUpper());
                    if (selectedGroup == null)
                    {
                        var newGroup = new Group()
                        {
                            Nome = userAd.Departamento.ToUpper()
                        };
                        selectedGroup = newGroup;
                    }

                    arGroups.Add(selectedGroup);
                }

                var accessRequest = new AccessRequest()
                {
                    UsernameSolicitante = accessRequestDto.UsernameSolicitante.ToUpper(),
                    UsernameSuperior = accessRequestDto.UsernameSuperior.ToUpper(),
                    Justificativa = accessRequestDto.Justificativa,
                    TipoSolicitacaoAcesso = accessRequestDto.TipoSolicitacaoAcesso,
                    Groups = arGroups
                };

                _context.AccessRequests.Add(accessRequest);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Solicitação de acesso registrada com sucesso!", accessRequest });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Salva o e-mail de aprovação de uma Requisição de Acesso. Disponibilidade do endpoint depende do tipo de solicitação:
        /// 1- Solicitações iniciais de acesso => aberta a todos os usuários com login no AD
        /// 2- Demais solicitações => aberta a todos os usuários com acesso ao ILA
        /// </summary>
        /// <param name="tipo">Int representando o tipo de Requisição de Acesso</param>
        /// <param name="arid">Id da Requisição de acesso</param>
        /// <returns>Status da transação e um objeto JSON com uma chave "message" confirmando o registro da Requisição de Acesso, ou indicando o erro ocorrido</returns>
        [Route("require/{tipo:int}/save-file/{arid:int}")]
        [HttpPost]
        public async Task<HttpResponseMessage> SaveArFile(TipoSolicitacaoAcesso tipo, int arid)
        {
            if (!Enum.IsDefined(typeof(TipoSolicitacaoAcesso), tipo))
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (!User.Identity.IsAuthenticated && tipo != TipoSolicitacaoAcesso.AcessoAoSistema)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (arid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de AR inválido." });
            }

            if (HttpContext.Current.Request.Files.Count == 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Requisição não contém arquivos" });
            }

            var postedFile = HttpContext.Current.Request.Files[0];
            var fileName = Path.GetFileName(postedFile?.FileName);
            var root = HttpContext.Current.Server.MapPath("~/App_Data/emails-aprovacao");
            var filePath = root + @"\" + fileName;
            postedFile?.SaveAs(filePath);

            try
            {
                var accessRequest = await _context.AccessRequests.FindAsync(arid);

                if (accessRequest == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound,
                        new { message = "Requisição de Acesso não encontrada" });
                }

                accessRequest.EmailSuperiorPath = filePath;
                _context.Entry(accessRequest)
                    .State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Arquivo salvo com sucesso" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Realiza a aprovação/reprovação de solicitações de acesso ao sistema ILA. Disponibilidade do endpoint depende do tipo de aprovação:
        /// 1- Solicitações de acesso ao Comitê LGPD => aprovação aberta apenas para o DPO
        /// 2- Demais aprovações => aberta apenas aos membros do Comitê LGPD
        /// </summary>
        /// <param name="arid">Id da Requisição de Acesso a ser aprovada/reprovada</param>
        /// <param name="aprovado">Bool vindo do corpo da requisição HTTP, indicando se a Requisição de Acesso foi aprovada ou reprovada.</param>
        /// <returns>
        /// Caso aprovada, cria o usuário, com o seu departamento no AD como grupo inicial, e o salva na base de dados do sistema.
        /// Caso reprovada, remove a requisição de usuário.
        /// Em ambos os casos, retorna o status da transação e um objeto JSON com uma chave "message" confirmando a operação realizada, ou informando o erro.
        /// </returns>
        [ResponseType(typeof(ApiResponseType<User>))]
        [Route("approve/{arid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Approve(int arid, [FromBody] bool aprovado)
        {
            if (arid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var accessRequest = await _context.AccessRequests.Where(ar => ar.Id == arid)
                    .Include(ar => ar.Groups)
                    .SingleOrDefaultAsync();

                if (accessRequest == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    if (!claims.IsComite)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }

                    if (accessRequest.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoComite && !claims.IsDpo)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }


                if (!aprovado)
                {
                    _context.AccessRequests.Remove(accessRequest);
                    await _context.SaveChangesAsync();
                    return Request.CreateResponse(HttpStatusCode.OK,
                        new { message = "Requisição de Acesso excluída com sucesso, após reprovação" });
                }

                var userInDb = await _context.Users
                    .Where(u => u.Username.ToUpper() == accessRequest.UsernameSolicitante.ToUpper())
                    .Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .SingleOrDefaultAsync();

                if (accessRequest.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoAGrupos)
                {
                    if (userInDb == null)
                    {
                        throw new ArgumentNullException(nameof(userInDb));
                    }

                    foreach (var @group in accessRequest.Groups)
                    {
                        if (!userInDb.GroupAccessExpirations.Select(gae => gae.Group)
                                .Contains(group))
                        {
                            userInDb.GroupAccessExpirations.Add(new GroupAccessExpiration()
                            {
                                ExpirationDate = userInDb.IsComite ? DateTime.MaxValue : DateTime.Now.AddDays(30),
                                Group = group
                            });
                        }
                    }

                    _context.Entry(userInDb)
                        .State = EntityState.Modified;

                    _context.AccessRequests.Remove(accessRequest);
                    await _context.SaveChangesAsync();


                    return Request.CreateResponse(HttpStatusCode.OK,
                        new { message = "Requisição de Acesso a Grupos aprovada", userInDb });
                }

                if (userInDb == null)
                {
                    var userAd = Seguranca.ObterUsuario(accessRequest.UsernameSolicitante.ToUpper());

                    var userOriginGroup =
                        await _context.Groups.SingleOrDefaultAsync(g =>
                            g.Nome.ToUpper() == userAd.Departamento.ToUpper()) ??
                        new Group()
                        {
                            Nome = userAd.Departamento.ToUpper(),
                        };

                    var newUser = new User()
                    {
                        Username = userAd.Login.ToUpper(),
                        OriginGroup = userOriginGroup,
                        IsComite = false,
                        IsDPO = false,
                        IsSystem = false,
                        GroupAccessExpirations = new List<GroupAccessExpiration>()
                        {
                            new GroupAccessExpiration() { ExpirationDate = DateTime.MaxValue, Group = userOriginGroup }
                        }
                    };

                    if (accessRequest.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoComite)
                    {
                        newUser.IsComite = true;
                    }

                    _context.Users.Add(newUser);
                    _context.AccessRequests.Remove(accessRequest);
                    await _context.SaveChangesAsync();


                    return Request.CreateResponse(HttpStatusCode.OK,
                        new { message = "Requisição de Acesso aprovada", newUser });
                }

                if (accessRequest.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoComite)
                {
                    userInDb.IsComite = true;

                    _context.Entry(userInDb)
                        .State = EntityState.Modified;
                    _context.AccessRequests.Remove(accessRequest);
                    await _context.SaveChangesAsync();

                    return Request.CreateResponse(HttpStatusCode.OK,
                        new { message = "Requisição de Acesso ao Comite LGPD aprovada", userInDb });
                }

                _context.AccessRequests.Remove(accessRequest);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Usuário já tem acesso ao sistema", userInDb });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Realiza a troca do usuário que é o DPO. Endpoint disponibilizado apenas para o desenvolvedor
        /// </summary>
        /// <param name="newDpoUsername">Username do novo DPO, recebido no corpo da requisição HTTP</param>
        /// <returns>Status da transação e um objeto JSON com uma chave "message" confirmando a operação realizada, ou o erro ocorrido.</returns>
        [Route("change-dpo")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> ChangeDpo([FromBody] string newDpoUsername)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!claims.IsDeveloper)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            if (newDpoUsername == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Nome de usuário do novo DPO é inválido" });
            }

            try
            {
                if (!Seguranca.ExisteUsuario(newDpoUsername.ToUpper()))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        message = "Usuário fornecido não existe. Verifique e tente novamente."
                    });
                }

                var oldDpo = await _context.Users.Where(u => u.IsDPO)
                    .Include(u => u.GroupAccessExpirations)
                    .Include(u => u.OriginGroup)
                    .SingleOrDefaultAsync();

                if (oldDpo != null)
                {
                    foreach (var groupAccessExpiration in oldDpo.GroupAccessExpirations.ToList())
                    {
                        _context.GroupAccessExpirations.Remove(groupAccessExpiration);
                    }

                    _context.Users.Remove(oldDpo);
                    await _context.SaveChangesAsync();
                }

                var userInDb =
                    await _context.Users.SingleOrDefaultAsync(u => u.Username.ToUpper() == newDpoUsername.ToUpper());

                if (userInDb == null)
                {
                    var userAd = Seguranca.ObterUsuario(newDpoUsername.ToUpper());

                    var groupInDb =
                        await _context.Groups.SingleOrDefaultAsync(g =>
                            g.Nome.ToUpper() == userAd.Departamento.ToUpper());

                    if (groupInDb == null)
                    {
                        var newGroup = new Group()
                        {
                            Nome = userAd.Departamento.ToUpper(),
                        };
                        groupInDb = newGroup;
                        _context.Groups.Add(groupInDb);
                        await _context.SaveChangesAsync();
                    }

                    var newUser = new User()
                    {
                        Username = userAd.Login.ToUpper(),
                        OriginGroup = groupInDb,
                        IsComite = true,
                        IsDPO = true,
                        IsSystem = false,
                        GroupAccessExpirations = new List<GroupAccessExpiration>()
                            { new GroupAccessExpiration() { ExpirationDate = DateTime.MaxValue, Group = groupInDb } }
                    };
                    _context.Users.Add(newUser);

                    await _context.SaveChangesAsync();

                    return Request.CreateResponse(HttpStatusCode.OK,
                        new { message = "Usuario criado e DPO alterado com sucesso" });
                }

                userInDb.IsDPO = true;
                userInDb.IsComite = true;

                _context.Entry(userInDb)
                    .State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "DPO Alterado com sucesso" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Adiciona um usuário ao comitê LGPD.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="newComiteMemberUsername">Username do novo membro do comitê, recebido no corpo da requisição HTTP.</param>
        /// <returns>Status da transação e um objeto JSON com uma chave "message" confirmando a operação realizada, ou o erro ocorrido.</returns>
        [Route("add-comite-member")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> AddUserToComite([FromBody] string newComiteMemberUsername)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDeveloper || claims.IsDpo))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            if (newComiteMemberUsername == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Nome de usuário do novo membro do Comitê LGPD é inválido" });
            }

            try
            {
                if (!Seguranca.ExisteUsuario(newComiteMemberUsername.ToUpper()))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        message = "Usuário fornecido não existe. Verifique e tente novamente."
                    });
                }

                var userInDb =
                    await _context.Users.SingleOrDefaultAsync(u =>
                        u.Username.ToUpper() == newComiteMemberUsername.ToUpper());

                if (userInDb == null)
                {
                    var userAd = Seguranca.ObterUsuario(newComiteMemberUsername.ToUpper());

                    var groupInDb =
                        await _context.Groups.SingleOrDefaultAsync(g =>
                            g.Nome.ToUpper() == userAd.Departamento.ToUpper());

                    if (groupInDb == null)
                    {
                        var newGroup = new Group()
                        {
                            Nome = userAd.Departamento.ToUpper(),
                        };
                        groupInDb = newGroup;
                        _context.Groups.Add(groupInDb);
                        await _context.SaveChangesAsync();
                    }

                    var newUser = new User()
                    {
                        Username = userAd.Login.ToUpper(),
                        OriginGroup = groupInDb,
                        IsComite = true,
                        IsDPO = false,
                        IsSystem = false,
                        GroupAccessExpirations = new List<GroupAccessExpiration>()
                            { new GroupAccessExpiration() { ExpirationDate = DateTime.MaxValue, Group = groupInDb } }
                    };
                    _context.Users.Add(newUser);

                    await _context.SaveChangesAsync();

                    return Request.CreateResponse(HttpStatusCode.OK,
                        new { message = "Usuario criado e adicionado ao Comitê LGPD com sucesso" });
                }

                userInDb.IsComite = true;

                _context.Entry(userInDb)
                    .State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Membro adicionado ao Comitê LGPD com sucesso" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Remove um usuário do comitê LGPD e do sistema.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="uid">Id do usuário a ser removido.</param>
        /// <returns>Status da transação e um objeto JSON com uma chave "message" confirmando a operação realizada, ou o erro ocorrido.</returns>
        [Route("remove-comite-member/{uid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> RemoveUserFromComite(int uid)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDeveloper || claims.IsDpo))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                if (uid <= 0)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Id de usuário inválido" });
                }

                var userInDb = await _context.Users.Where(u => u.Id == uid)
                    .Include(u => u.GroupAccessExpirations)
                    .Include(u => u.OriginGroup)
                    .SingleOrDefaultAsync();

                if (userInDb == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Usuário não encontrado" });
                }


                _context.Users.Remove(userInDb);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Usuário removido com sucesso da aplicação" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }


        /// <summary>
        /// Retorna todos os grupos de um usuário determinado.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="uid">Id do usuário a ser consultado</param>
        /// <returns>Status da transação e um objeto JSON com uma chave "userGroups", contendo uma lista de grupos (objeto "Group")</returns>
        [ResponseType(typeof(ApiResponseType<List<Group>>))]
        [Route("groups/user/{uid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetUserGroups(int uid)
        {
            if (uid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de usuário inválido" });
            }

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDeveloper || claims.IsDpo))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var user = await _context.Users.Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .SingleOrDefaultAsync(u => u.Id == uid);

                if (user == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Usuário não encontrado" });
                }

                var userGroups = user.GroupAccessExpirations.Select(gae => gae.Group)
                    .ToList();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Grupos encontrados com sucesso", userGroups });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Adiciona um grupo a lista de permissões de um usuário.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="uid">Id do usuário a ser alterado.</param>
        /// <param name="groupNames">Lista de strings com o nome dos grupos a serem adicionados ao perfil do usuário</param>
        /// <returns>Status da transação e um objeto JSON com uma chave "message" confirmando a operação realizada, ou o erro ocorrido. Também retorna uma chave "user" contendo o novo usuário.</returns>
        [ResponseType(typeof(ApiResponseType<User>))]
        [Route("groups/user/{uid:int}/add")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> AddUserGroup(int uid, [FromBody] List<string> groupNames)
        {
            if (uid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de usuário inválido" });
            }

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDeveloper || claims.IsDpo))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var user = await _context.Users.Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .SingleOrDefaultAsync(u => u.Id == uid);

                if (user == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Usuário não encontrado" });
                }

                var userGroupNames = user.GroupAccessExpirations.Select(gae => gae.Group.Nome)
                    .ToList();

                var groupNamesToAdd = groupNames.Except(userGroupNames)
                    .ToList();

                var userNewGroups = new List<Group>();

                foreach (var groupNameToAdd in groupNamesToAdd)
                {
                    var selectedGroup =
                        await _context.Groups.SingleOrDefaultAsync(g => g.Nome.ToUpper() == groupNameToAdd.ToUpper());
                    if (selectedGroup == null)
                    {
                        var newGroup = new Group()
                        {
                            Nome = groupNameToAdd.ToUpper()
                        };
                        selectedGroup = newGroup;
                    }

                    userNewGroups.Add(selectedGroup);
                }

                foreach (var @group in userNewGroups)
                {
                    user.GroupAccessExpirations.Add(new GroupAccessExpiration()
                    {
                        ExpirationDate = user.IsComite ? DateTime.MaxValue : DateTime.Now.AddDays(30),
                        Group = group
                    });
                }

                _context.Entry(user)
                    .State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Grupos adicionados com sucesso", user });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        /// <summary>
        /// Remove um grupo da lista de permissões de um usuário.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="uid">Id do usuário a ser alterado.</param>
        /// <param name="gid">Id do grupo a ser removido.</param>
        /// <returns>Status da transação e um objeto JSON com uma chave "message" confirmando a operação realizada, ou o erro ocorrido. Também retorna uma chave "user" contendo o novo usuário.</returns>
        [ResponseType(typeof(ApiResponseType<User>))]
        [Route("groups/user/{uid:int}/remove")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> RemoveUserGroup(int uid, [FromBody] int gid)
        {
            if (uid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de usuário inválido" });
            }

            if (gid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido" });
            }

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDeveloper || claims.IsDpo))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var user = await _context.Users.Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                    .SingleOrDefaultAsync(u => u.Id == uid);

                if (user == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Usuário não encontrado" });
                }

                var userGroups = user.GroupAccessExpirations.Select(gae => gae.Group)
                    .ToList();

                var groupToRemove = await _context.Groups.FindAsync(gid);

                if (!userGroups.Contains(groupToRemove))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Este usuário já não tem acesso ao grupo informado." });
                }

                var gaeToRemove = user.GroupAccessExpirations.SingleOrDefault(gae => gae.Group == groupToRemove);

                user.GroupAccessExpirations.Remove(gaeToRemove);
                if (gaeToRemove != null) _context.GroupAccessExpirations.Remove(gaeToRemove);

                _context.Entry(user)
                    .State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Grupo removido com sucesso", user });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var errorReport = await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = ErrorMessage, e, errorReport });
            }
        }

        //private bool GroupExists(int id)
        //{
        //    return _context.Groups.Count(g => g.Id == id) > 0;
        //}
    }
}
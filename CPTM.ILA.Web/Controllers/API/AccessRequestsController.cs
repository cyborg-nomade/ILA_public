using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.DTOs;
using CPTM.ILA.Web.Util;

namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador para Requisições de Acesso ao sistema ILA.
    /// </summary>
    [RoutePrefix("api/access-requests")]
    public class AccessRequestsController : ApiController
    {
        private readonly ILAContext _context;
        private const string ItsmUrl = "https://panelas-app2:8443/api/";
        private const string ApiLogin = "INTEGRACAO_CPTM_LGPD";
        private const string ApiPass = "INTEGRACAO_CPTM_LGPD";


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


                return Request.CreateResponse(HttpStatusCode.OK, new { accessRequest });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Retorna o arquivo de email de aprovação enviado para uma determinada Requisição de Acesso.
        /// Endpoint disponibilizado para o DPO e membros do Comitê LGPD.
        /// </summary>
        /// <param name="arid">Id da Requisição de Acesso</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o sucesso, ou especificando o erro ocorrido.
        /// No conteúdo da resposta, retorna o byteStream correspondente ao arquivo.
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

                var response = Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Arquivo recuperado com sucesso!" });
                response.Content = new ByteArrayContent(fileData);
                response.Content.Headers.ContentLength = fileData.LongLength;
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = Path.GetFileName(filePath)
                };
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

                return response;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
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
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Registra solicitações de acesso ao sistema ILA. Disponibilidade do endpoint depende do tipo de solicitação:
        /// 1- Solicitações iniciais de acesso => aberta a todos os usuários com login no AD
        /// 2- Demais solicitações => aberta a todos os usuários com acesso ao ILA
        /// </summary>
        /// <param name="tipo">Int representando o tipo de Requisição de Acesso</param>
        /// <param name="accessRequestDto">Objeto vindo do corpo da requisição HTTP, representando a Requisição de Acesso. Deve corresponder ao tipo AccessRequest</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro da Requisição de Acesso, ou indicando o erro ocorrido
        /// </returns>
        [Route("require/{tipo:int}")]
        [HttpPost]
        public async Task<HttpResponseMessage> RequestAccess(TipoSolicitacaoAcesso tipo,
            [FromBody] AccessRequestDTO accessRequestDto)
        {
            if (!Enum.IsDefined(typeof(TipoSolicitacaoAcesso), tipo))
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (!User.Identity.IsAuthenticated && tipo != TipoSolicitacaoAcesso.AcessoAoSistema)
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

            if (!Seguranca.ExisteUsuario(accessRequestDto.UsernameSolicitante) ||
                !Seguranca.ExisteUsuario(accessRequestDto.UsernameSuperior))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message = "Pelo menos um dos nomes de usuário fornecidos não existe. Verifique e tente novamente."
                });
            }

            try
            {
                var chamadoAberto = await AbrirChamadoItsm(accessRequestDto.UsernameSolicitante, tipo.ToString());

                if (!chamadoAberto)
                {
                    return Request.CreateResponse(HttpStatusCode.OK,
                        new { message = "Não foi possível abrir o chamado de requisição de acesso no ITSM!" });
                }

                var arGroups = new List<Group>();

                foreach (var groupName in accessRequestDto.GroupNames)
                {
                    var group = await _context.Groups.SingleOrDefaultAsync(g => g.Nome == groupName);
                    if (group == null)
                    {
                        var newGroup = new Group()
                        {
                            Nome = groupName
                        };
                        _context.Groups.Add(newGroup);
                        group = newGroup;
                    }

                    arGroups.Add(group);
                }

                var accessRequest = new AccessRequest()
                {
                    UsernameSolicitante = accessRequestDto.UsernameSolicitante,
                    UsernameSuperior = accessRequestDto.UsernameSuperior,
                    Justificativa = accessRequestDto.Justificativa,
                    TipoSolicitacaoAcesso = accessRequestDto.TipoSolicitacaoAcesso,
                    Groups = arGroups
                };

                _context.AccessRequests.Add(accessRequest);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Solicitação de acesso registrada com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
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
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
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
        [Route("approve/{arid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Approve(int arid, [FromBody] bool aprovado)
        {
            if (arid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            var accessRequest = await _context.AccessRequests.FindAsync(arid);

            if (accessRequest == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!claims.IsComite)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                if (accessRequest.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoComite && !claims.IsDpo)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                if (!aprovado)
                {
                    _context.AccessRequests.Remove(accessRequest);
                    await _context.SaveChangesAsync();
                    return Request.CreateResponse(HttpStatusCode.OK,
                        new { message = "Requisição de Acesso excluída com sucesso, após reprovação" });
                }

                var userAd = Seguranca.ObterUsuario(accessRequest.UsernameSolicitante);

                var userOriginGroup = await _context.Groups.SingleOrDefaultAsync(g => g.Nome == userAd.Departamento);

                if (userOriginGroup == null)
                {
                    userOriginGroup = new Group()
                    {
                        Nome = userAd.Departamento,
                    };

                    _context.Groups.Add(userOriginGroup);
                }

                var newUser = new User()
                {
                    Username = userAd.Login,
                    OriginGroup = userOriginGroup,
                    IsComite = false,
                    IsDPO = false,
                    IsSystem = false,
                    Groups = new List<Group>() { userOriginGroup }
                };

                switch (accessRequest.TipoSolicitacaoAcesso)
                {
                    case TipoSolicitacaoAcesso.AcessoAGrupos:
                        foreach (var accessRequestGroup in accessRequest.Groups)
                        {
                            newUser.Groups.Add(accessRequestGroup);
                            if (!GroupExists(accessRequestGroup.Id))
                            {
                                _context.Groups.Add(accessRequestGroup);
                            }
                        }

                        newUser.GroupAccessExpirationDate = DateTime.Now.AddDays(30);

                        break;
                    case TipoSolicitacaoAcesso.AcessoComite:
                    {
                        newUser.IsComite = true;
                        newUser.GroupAccessExpirationDate = DateTime.MaxValue;
                        break;
                    }
                    case TipoSolicitacaoAcesso.AcessoAoSistema:
                        break;
                    default:
                        Console.WriteLine($@"TipoSolicitacaoAcesso está fora do range no AR ${accessRequest.Id}");
                        return Request.CreateResponse(HttpStatusCode.InternalServerError,
                            new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
                }

                _context.Users.Add(newUser);
                _context.AccessRequests.Remove(accessRequest);
                await _context.SaveChangesAsync();


                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Requisição de Acesso aprovada" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
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
                if (!Seguranca.ExisteUsuario(newDpoUsername))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        message = "Usuário fornecido não existe. Verifique e tente novamente."
                    });
                }

                var oldDpo = await _context.Users.SingleOrDefaultAsync(u => u.IsDPO);

                if (oldDpo != null)
                {
                    var existOldDpo = Seguranca.ExisteUsuario(oldDpo.Username);

                    if (existOldDpo)
                    {
                        oldDpo.IsDPO = false;
                    }
                    else
                    {
                        _context.Users.Remove(oldDpo);
                    }
                }

                var userInDb = await _context.Users.SingleOrDefaultAsync(u => u.Username == newDpoUsername);

                if (userInDb == null)
                {
                    var userAd = Seguranca.ObterUsuario(newDpoUsername);
                    var newGroup = new Group()
                    {
                        Nome = userAd.Departamento,
                    };
                    _context.Groups.Add(newGroup);

                    var newUser = new User()
                    {
                        Username = userAd.Login,
                        OriginGroup = newGroup,
                        IsComite = true,
                        IsDPO = true,
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
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        private bool GroupExists(int id)
        {
            return _context.Groups.Count(g => g.Id == id) > 0;
        }

        private async Task<bool> AbrirChamadoItsm(string username, string descricaoIncidente)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(ItsmUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var loginRes = await client.PostAsJsonAsync(ItsmUrl + "jwt/login",
                    new { username = ApiLogin, password = ApiPass });

                if (!loginRes.IsSuccessStatusCode)
                {
                    return false;
                }

                var jwt = loginRes.Content.ReadAsStringAsync()
                    .Result;

                client.DefaultRequestHeaders.Add("Authorization", $"AR-JWT {jwt}");

                var chamadoRes = await client.PostAsJsonAsync(ItsmUrl + "", new
                {
                    values = new
                    {
                        PDP_chrLoginUsuario = username.ToUpper(),
                        PDP_chrTemplateDeIncidente = "INC AUT LGPD SERVICO",
                        PDP_ddlFormatoDeAbertura = "UNICO",
                        PDP_chrDescricao = descricaoIncidente
                    }
                });

                return chamadoRes.IsSuccessStatusCode;
            }
        }
    }
}
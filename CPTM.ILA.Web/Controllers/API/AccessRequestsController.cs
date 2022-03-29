using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ActiveDirectory;
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

        /// <summary>
        /// Controlador da APÍ para Requisições de Acesso
        /// </summary>
        public AccessRequestsController()
        {
            _context = new ILAContext();
        }

        [Route("{arid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> Get(int arid)
        {
            if (arid <= 0) return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!claims.IsDeveloper && !claims.IsDpo)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var accessRequest = await _context.AccessRequests.FindAsync(arid);

                if (accessRequest == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound,
                        new { message = "Requisição de Acesso não encontrada" });
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
        /// Retorna todos as solicitações de acesso. Apenas para membros do Comitê LGPD.
        /// </summary>
        /// <returns></returns>
        [Route("{tipo:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByType(TipoSolicitacaoAcesso tipo)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (tipo == TipoSolicitacaoAcesso.AcessoComite && (!claims.IsDpo || !claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                if (!claims.IsComite)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var requests = await _context.AccessRequests.Where(ar => ar.TipoSolicitacaoAcesso == tipo)
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { requests });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Endpoint para registro de solicitações de acesso ao sistema ILA
        /// </summary>
        /// <param name="accessRequest"></param>
        /// <returns></returns>
        [Route("require/{tipo:int}")]
        [HttpPost]
        public async Task<HttpResponseMessage> RequestAccess(TipoSolicitacaoAcesso tipo,
            [FromBody] AccessRequest accessRequest)
        {
            if (!User.Identity.IsAuthenticated && tipo != TipoSolicitacaoAcesso.AcessoAoSistema)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (accessRequest.TipoSolicitacaoAcesso != tipo)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Solicitação de tipo incorreto." });
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message = "Objeto enviado não corresponde ao tipo AccessRequest, ou o tipo está fora do range"
                });
            }

            if (!Seguranca.ExisteUsuario(accessRequest.UsernameSolicitante) ||
                !Seguranca.ExisteUsuario(accessRequest.UsernameSuperior))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message = "Pelo menos um dos nomes de usuário fornecidos não existe. Verifique e tente novamente."
                });
            }

            _context.AccessRequests.Add(accessRequest);
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK,
                new { message = "Solicitação de acesso registrada com sucesso!" });
        }


        /// <summary>
        /// Realiza a aprovação/reprovação de uma solicitação de acesso. Apenas para membros do Comitê LGPD.
        /// Recebe o Id da solicitação (INT) na url e um flag Aprovado (BOOL) no corpo da requisição.
        /// </summary>
        /// <returns></returns>
        [Route("approve/{arid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Approve(int arid, [FromBody] bool aprovado)
        {
            var isDpo = false;
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                isDpo = claims.IsDpo;

                if (!claims.IsComite)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            if (arid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido" });
            }

            var accessRequest = await _context.AccessRequests.FindAsync(arid);

            if (accessRequest == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Requisição de Acesso não encontrada" });
            }

            if (accessRequest.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoComite && !isDpo)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (!aprovado)
            {
                _context.AccessRequests.Remove(accessRequest);
                await _context.SaveChangesAsync();
                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Requisição de Acesso excluída com sucesso, após reprovação" });
            }

            var userAd = Seguranca.ObterUsuario(accessRequest.UsernameSolicitante);

            var newGroup = new Group()
            {
                Nome = userAd.Departamento,
            };

            _context.Groups.Add(newGroup);

            var newUser = new User()
            {
                Username = userAd.Login,
                OriginGroup = newGroup,
                IsComite = false,
                IsDPO = false,
            };

            switch (accessRequest.TipoSolicitacaoAcesso)
            {
                case TipoSolicitacaoAcesso.AcessoAGrupos:
                    newUser.Groups = accessRequest.Groups;
                    foreach (var group in newUser.Groups)
                    {
                        if (!GroupExists(group.Id))
                        {
                            _context.Groups.Add(group);
                        }
                    }

                    break;
                case TipoSolicitacaoAcesso.AcessoComite:
                {
                    newUser.IsComite = true;
                    break;
                }
                case TipoSolicitacaoAcesso.AcessoAoSistema:
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

        [Route("change-dpo")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> ChangeDPO([FromBody] string newDPOUsername)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!claims.IsDeveloper)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                if (!Seguranca.ExisteUsuario(newDPOUsername))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        message = "Usuário fornecido não existe. Verifique e tente novamente."
                    });
                }

                var userInDb = await _context.Users.SingleOrDefaultAsync(u => u.Username == newDPOUsername);

                if (userInDb == null)
                {
                    var userAd = Seguranca.ObterUsuario(newDPOUsername);
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

        public bool GroupExists(int id)
        {
            return _context.Groups.Count(g => g.Id == id) > 0;
        }
    }
}
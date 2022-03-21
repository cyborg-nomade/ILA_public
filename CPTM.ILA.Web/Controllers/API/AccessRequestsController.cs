using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ActiveDirectory;

namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador para Requisições de Acesso ao sistema ILA.
    /// </summary>
    [RoutePrefix("api/access-requests")]
    public class AccessRequestsController : ApiController
    {
        private IlaContext _context;

        /// <summary>
        /// Controlador da APÍ para Requisições de Acesso
        /// </summary>
        public AccessRequestsController()
        {
            _context = new IlaContext();
        }

        [Route("{id}")]
        [Authorize]
        [HttpGet]
        public HttpResponseMessage GetAccessRequest(int id)
        {
            var accessRequest = _context.AccessRequests.SingleOrDefault(ar => ar.Id == id);

            if (accessRequest == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Requisição de Acesso não encontrada" });
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "This worked", accessRequest });
        }

        /// <summary>
        /// Endpoint para envio de solicitações de acesso inicial (usuário comum) ao sistema ILA
        /// </summary>
        /// <param name="accessRequest"></param>
        /// <returns></returns>
        [Route("initial")]
        [HttpPost]
        public HttpResponseMessage RequestInitialAccess([FromBody] AccessRequest accessRequest)
        {
            if (accessRequest.TipoSolicitacaoAcesso != TipoSolicitacaoAcesso.AcessoAoSistema)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Solicitação de tipo incorreto." });
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Objeto enviado não corresponde ao tipo AccessRequest" });
            }


            _context.AccessRequests.Add(accessRequest);
            _context.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK,
                new { message = "Solicitação de acesso registrada com sucesso!", req = accessRequest });
        }

        /// <summary>
        /// Endpoint para envio de solicitações de acesso aos casos de uso de dados pessoais de grupos diferentes do departamento de lotação do usuário logado.
        /// </summary>
        /// <param name="accessRequest"></param>
        /// <returns></returns>
        [Route("groups")]
        [Authorize]
        [HttpPost]
        public HttpResponseMessage RequestAccessToGroups([FromBody] AccessRequest accessRequest)
        {
            if (accessRequest.TipoSolicitacaoAcesso != TipoSolicitacaoAcesso.AcessoAGrupos)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Solicitação de tipo incorreto." });
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Objeto enviado não corresponde ao tipo AccessRequest" });
            }

            _context.AccessRequests.Add(accessRequest);
            _context.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK,
                new { message = "Solicitação de acesso registrada com sucesso!" });
        }

        /// <summary>
        /// Endpoint para envio de solicitações de acesso no nível do Comitê LGPD. Apenas para usuários logados.
        /// </summary>
        /// <param name="accessRequest"></param>
        /// <returns></returns>
        [Route("comite")]
        [Authorize]
        [HttpPost]
        public HttpResponseMessage RequestComiteAccess([FromBody] AccessRequest accessRequest)
        {
            if (accessRequest.TipoSolicitacaoAcesso != TipoSolicitacaoAcesso.AcessoComite)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Solicitação de tipo incorreto." });
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Objeto enviado não corresponde ao tipo AccessRequest" });
            }

            _context.AccessRequests.Add(accessRequest);
            _context.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK,
                new { message = "Solicitação de acesso registrada com sucesso!" });
        }

        /// <summary>
        /// Retorna todos as solicitações de acesso inicial. Apenas para membros do Comitê LGPD.
        /// </summary>
        /// <returns></returns>
        [Route("initial")]
        [Authorize]
        [HttpGet]
        public HttpResponseMessage GetInitialAccessRequests()
        {
            var initialRequests = _context.AccessRequests
                .Where(ar => ar.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoAoSistema)
                .ToList();
            return Request.CreateResponse(HttpStatusCode.OK, new { message = "This worked", initialRequests });
        }

        /// <summary>
        /// Retorna todos as solicitações de acesso a grupos. Apenas para membros do Comitê LGPD.
        /// </summary>
        /// <returns></returns>
        [Route("groups")]
        [Authorize]
        [HttpGet]
        public HttpResponseMessage GetGroupAccessRequests()
        {
            var groupRequests = _context.AccessRequests
                .Where(ar => ar.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoAGrupos)
                .ToList();
            return Request.CreateResponse(HttpStatusCode.OK, new { message = "This worked", groupRequests });
        }

        /// <summary>
        /// Retorna todos as solicitações de acesso a grupos. Apenas para membros do Comitê LGPD.
        /// </summary>
        /// <returns></returns>
        [Route("comite")]
        [Authorize]
        [HttpGet]
        public HttpResponseMessage GetComiteAccessRequests()
        {
            var comiteRequests = _context.AccessRequests
                .Where(ar => ar.TipoSolicitacaoAcesso == TipoSolicitacaoAcesso.AcessoComite)
                .ToList();
            return Request.CreateResponse(HttpStatusCode.OK, new { message = "This worked", comiteRequests });
        }

        /// <summary>
        /// Realiza a aprovação/reprovação de uma solicitação de acesso. Apenas para membros do Comitê LGPD.
        /// Recebe o Id da solicitação (INT) na url e um flag Aprovado (BOOL) no corpo da requisição.
        /// </summary>
        /// <returns></returns>
        [Route("approve/{id}")]
        [Authorize]
        [HttpPost]
        public HttpResponseMessage ApproveInitialAccessRequest(int id, [FromBody] bool aprovado)
        {
            if (id <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido" });
            }

            var accessRequest = _context.AccessRequests.SingleOrDefault(ar => ar.Id == id);

            if (accessRequest == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Requisição de Acesso não encontrada" });
            }

            if (!aprovado)
            {
                //_context.AccessRequests.Remove(accessRequest);
                //_context.SaveChanges();
                Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Requisição de Acesso excluída com sucesso", accessRequest });
            }

            return Request.CreateResponse(HttpStatusCode.OK,
                new { message = "Requisição de Acesso aprovada", accessRequest });
        }
    }
}
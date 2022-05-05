using System.Data.Entity.Infrastructure;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using System.Threading.Tasks;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.DTOs;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Util;

namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador para threads e comentários dentro do sistema ILA. 
    /// </summary>
    [RoutePrefix("api/threads")]
    public class ThreadsCommentsController : ApiController
    {
        private readonly ILAContext _context;

        /// <inheritdoc />
        public ThreadsCommentsController()
        {
            _context = new ILAContext();
        }

        [Route("itsm")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> PostItsm([FromBody] CommentDTO commentDto)
        {
            var chamadoAberto = await ItsmUtil.AbrirChamado(commentDto.Author.Username,
                "Item " + commentDto.RefItem + ": " + commentDto.Text);

            if (!chamadoAberto)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Não foi possível abrir o chamado de requisição de acesso no ITSM!" });
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Dúvida postada com sucesso!" });
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
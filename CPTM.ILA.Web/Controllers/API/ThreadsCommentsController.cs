using System.Net;
using System.Net.Http;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using System.Threading.Tasks;
using CPTM.ILA.Web.DTOs;
using CPTM.ILA.Web.Util;

namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador para criação de dúvidas sobre o formulário de Casos de Uso. 
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

        /// <summary>
        /// Posta uma dúvida, criando um chamado no ITSM com a descrição adequada do item em questão.
        /// Endpoint disponibilizado para todos os usuários com acesso ao sistema
        /// </summary>
        /// <param name="commentDto">Comentário com a dúvida</param>
        /// <returns>Status da transação e um objeto JSON com uma chave "message" contendo uma mensagem de sucesso ou descrevendo o erro.</returns>
        [Route("itsm")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> PostItsm([FromBody] CommentDTO commentDto)
        {
            var chamadoAberto = await ItsmUtil.AbrirChamado(commentDto.Author.Username.ToUpper(),
                "Item " + commentDto.RefItem + ": " + commentDto.Text, true);

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
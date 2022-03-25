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
using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Models.Messaging;

namespace CPTM.ILA.Web.Controllers.API
{
    [RoutePrefix("api/threads")]
    public class ThreadsCommentsController : ApiController
    {
        private ILAContext _context;

        public ThreadsCommentsController()
        {
            _context = new ILAContext();
        }

        [Route("")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> Get()
        {
            try
            {
                var threads = await _context.Threads.ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { threads });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor." });
            }
        }

        [Route("group/{gid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByGroup(int gid)
        {
            if (gid <= 0) Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });
            try
            {
                var threads = await _context.Threads.Where(t => t.AuthorGroup.Id == gid)
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { threads });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor." });
            }
        }

        [Route("{tid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> Get(int tid)
        {
            if (tid <= 0) return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });
            try
            {
                var thread = await _context.Threads.SingleOrDefaultAsync(t => t.Id == tid);

                if (thread == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Thread não encontrada. Verifique o id" });

                return Request.CreateResponse(HttpStatusCode.OK, new { thread });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor." });
            }
        }


        [Route("comments/{tid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetCommentsinThread(int tid)
        {
            try
            {
                var comments = await _context.Comments.Where(c => c.Thread.Id == tid)
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { comments });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor." });
            }
        }

        [Route("")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Dados enviados são inválidos" });
            }

            if (comment.Thread.Id != 0 && ThreadExists(comment.Thread.Id))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message =
                        "Este endpoint deve ser usado apenas para a criação de novas threads. Use /api/threads/reply/{tid} para adicionar comentários a threads existentes."
                });
            }

            var groupId = 0;

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = identity.Claims;
                groupId = Convert.ToInt32(claims.FirstOrDefault(p => p.Type == "groupId")
                    ?.Value);
            }

            var thread = new Thread
            {
                AuthorGroup = await _context.Groups.Where(g => g.Id == groupId)
                    .SingleOrDefaultAsync(),
                AuthorStatus = ThreadStatus.Pendente,
                ComiteStatus = ThreadStatus.Novo,
                Comments = new List<Comment>() { comment }
            };

            _context.Threads.Add(thread);
            await _context.SaveChangesAsync();

            comment.Thread = thread;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Comentário registrado com sucesso!" });
        }

        [Route("reply/{tid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> ReplyToThread(int tid, [FromBody] Comment comment)
        {
            if (tid <= 0) return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Dados enviados são inválidos" });
            }

            if (tid != comment.Thread.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Dados enviados são inválidos" });
            }

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Comentário registrado com sucesso!" });
        }

        [Route("{tid:int}")]
        [Authorize]
        [HttpDelete]
        public async Task<HttpResponseMessage> Delete(int tid)
        {
            var threadToDelete = await _context.Threads.FindAsync(tid);
            if (threadToDelete == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Caso não encontrado. Verifique o id" });
            }

            _context.Threads.Remove(threadToDelete);
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Thread removida com sucesso!" });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }

            base.Dispose(disposing);
        }

        public bool ThreadExists(int id)
        {
            return _context.Threads.Count(t => t.Id == id) > 0;
        }
    }
}
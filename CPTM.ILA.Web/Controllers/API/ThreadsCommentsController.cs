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
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Models.Messaging;
using CPTM.ILA.Web.Util;

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
                var threads = await _context.Threads.ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { threads });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        [Route("group/{gid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByGroup(int gid)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();

                var searchedGroup = await _context.Groups.FindAsync(gid);

                if (!userGroups.Contains(searchedGroup) && !claims.IsDeveloper && !claims.IsDpo)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }


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
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        [Route("group/{gid:int}/status/{sid:int}/")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByGroupByStatus(int gid, ThreadStatus sid)
        {
            if (gid <= 0) Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });

            var isComite = false;
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                isComite = claims.IsComite;

                var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();
                var searchedGroup = await _context.Groups.FindAsync(gid);

                if (!userGroups.Contains(searchedGroup) && !claims.IsDeveloper)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var threads = await _context.Threads
                    .Where(t => isComite ? t.ComiteStatus == sid : t.AuthorStatus == sid)
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { threads });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        [Route("group/{gid:int}/status/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByGroupByStatus(int gid)
        {
            var isComite = false;
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                isComite = claims.IsComite;

                var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();
                var searchedGroup = await _context.Groups.FindAsync(gid);

                if (!userGroups.Contains(searchedGroup) && !claims.IsDeveloper)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }


            if (gid <= 0) Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });
            try
            {
                var threads = await _context.Threads.Where(t => t.AuthorGroup.Id == gid)
                    .GroupBy(t => isComite ? t.ComiteStatus : t.AuthorStatus)
                    .Select(g => new ThreadStatusTotals()
                    {
                        QuantityInStatus = g.Count(),
                        Status = isComite
                            ? g.First()
                                .ComiteStatus
                            : g.First()
                                .AuthorStatus,
                    })
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { threads });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        [Route("extensao-encarregado/{uid:int}/status/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByExtensaoEncarregadoByStatus(int uid)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!claims.IsDpo && !claims.IsDeveloper)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            if (uid <= 0)
                Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de usuário inválida." });

            try
            {
                var userGroups = await _context.Users.Where(u => u.Id == uid)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();

                var threads = await _context.Threads.Where(t => userGroups.Contains(t.AuthorGroup))
                    .GroupBy(t => t.ComiteStatus)
                    .Select(g => new ThreadStatusTotals()
                    {
                        QuantityInStatus = g.Count(),
                        Status = g.First()
                            .ComiteStatus,
                    })
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { threads });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        [Route("extensao-encarregado/{uid:int}/status/{sid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByExtensaoEncarregadoByStatus(int uid, ThreadStatus sid)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!claims.IsDpo && !claims.IsDeveloper)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            if (uid <= 0)
                Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de usuário inválida." });

            try
            {
                var userGroups = await _context.Users.Where(u => u.Id == uid)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();

                var threads = await _context.Threads
                    .Where(t => userGroups.Contains(t.AuthorGroup) && t.ComiteStatus == sid)
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { threads });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
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
                var thread = await _context.Threads.FindAsync(tid);

                if (thread == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Thread não encontrada. Verifique o id" });


                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();

                    var threadGroup = thread.AuthorGroup;


                    if (!userGroups.Contains(threadGroup) && !claims.IsDeveloper && !claims.IsDpo)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK, new { thread });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }


        [Route("comments/{tid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetCommentsinThread(int tid)
        {
            try
            {
                var thread = await _context.Threads.FindAsync(tid);

                if (thread == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Thread não encontrada. Verifique o id" });


                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();

                    var threadGroup = thread.AuthorGroup;


                    if (!userGroups.Contains(threadGroup) && !claims.IsDeveloper && !claims.IsDpo)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var comments = await _context.Comments.Where(c => c.Thread.Id == tid)
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { comments });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        [Route("")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] CommentDTO commentDto)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Objeto enviado não corresponde ao tipo CommentDTO" });
            }

            if (ThreadExists(commentDto.Thread.Id))
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
                var claims = TokenUtil.GetTokenClaims(identity);

                groupId = claims.GroupId;

                if (claims.IsComite)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            var comment = new Comment()
            {
                Author = commentDto.Author,
                DataCriacao = DateTime.Now,
                RefItem = commentDto.RefItem,
                Text = commentDto.Text,
                Thread = commentDto.Thread
            };

            var thread = new Thread
            {
                AuthorGroup = await _context.Groups.FindAsync(groupId),
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
        public async Task<HttpResponseMessage> ReplyToThread(int tid, [FromBody] CommentDTO commentDto)
        {
            if (tid <= 0) return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Dados enviados são inválidos" });
            }

            if (tid != commentDto.Thread.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Dados enviados são inválidos" });
            }

            var thread = await _context.Threads.FindAsync(tid);

            if (thread == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Thread não encontrada" });
            }

            var isComite = false;

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                isComite = claims.IsComite;
            }

            if (isComite)
            {
                thread.AddComiteReply();
            }
            else
            {
                thread.AddAuthorReply();
            }

            var comment = new Comment()
            {
                Author = commentDto.Author,
                DataCriacao = DateTime.Now,
                RefItem = commentDto.RefItem,
                Text = commentDto.Text,
                Thread = commentDto.Thread
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Comentário registrado com sucesso!" });
        }

        [Route("{tid:int}")]
        [Authorize]
        [HttpDelete]
        public async Task<HttpResponseMessage> Delete(int tid)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!claims.IsDeveloper)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

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
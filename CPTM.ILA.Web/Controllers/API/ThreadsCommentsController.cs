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

        /// <summary>
        /// Retorna todas as threads registradas no ILA. Endpoint disponibilizado apenas para o DPO
        /// </summary>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "threads" onde se encontram os dados das Threads (objeto Thread)
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

        /// <summary>
        /// Retorna todas as threads registradas no ILA por um grupo específico.
        /// Endpoint disponibilizado para o DPO e para membros do grupo autor.
        /// </summary>
        /// <param name="gid">Id do grupo autor</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "threads" onde se encontram os dados das Threads (objeto Thread)
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

                    if (!(userGroups.Contains(searchedGroup) || claims.IsDeveloper || claims.IsDpo))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (gid <= 0)
                {
                    Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });
                }

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

        /// <summary>
        /// Retorna todas as threads registradas no ILA por um grupo específico, que se encontram em um certo status.
        /// Endpoint disponibilizado apenas para membros do grupo autor.
        /// </summary>
        /// <param name="gid">Id do grupo autor</param>
        /// <param name="sid">Int representando o status (enum ThreadStatus)</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "threads" onde se encontram os dados das Threads (objeto Thread)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("group/{gid:int}/status/{sid:int}/")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByGroupByStatus(int gid, ThreadStatus sid)
        {
            if (gid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            var isComite = false;
            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    isComite = claims.IsComite;

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var searchedGroup = await _context.Groups.FindAsync(gid);

                    if (!(userGroups.Contains(searchedGroup) || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }


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

        /// <summary>
        /// Retorna os totais de Threads de um grupo de acesso por status.
        /// Endpoint disponibilizado apenas membros do grupo especificado.
        /// </summary>
        /// <param name="gid">Id do grupo autor</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totals" onde se encontram os totais de Threads, com identificadores dos status (objeto ThreadStatusTotals).
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("group/{gid:int}/status/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByGroupByStatus(int gid)
        {
            if (gid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            var isComite = false;

            try
            {
                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    isComite = claims.IsComite;

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var searchedGroup = await _context.Groups.FindAsync(gid);

                    if (!(userGroups.Contains(searchedGroup) || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var totals = await _context.Threads.Where(t => t.AuthorGroup.Id == gid)
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

                return Request.CreateResponse(HttpStatusCode.OK, new { totals });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Retorna todas as threads registradas no ILA pelos grupos de um membro do Comitê LGPD (Extensao Encarregado), que se encontram em um certo status.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="uid">Id do usuário referente ao membro do comitê</param>
        /// <param name="sid">Int representando o status (enum ThreadStatus)</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "threads" onde se encontram os dados das Threads (objeto Thread)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("extensao-encarregado/{uid:int}/status/{sid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetByExtensaoEncarregadoByStatus(int uid, ThreadStatus sid)
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
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de usuário inválida." });
            }

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

        /// <summary>
        /// Retorna os totais de Threads dos grupos de um membro do Comitê LGPD por status.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="uid">Id do usuário referente ao membro do comitê</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "totals" onde se encontram os totais de Threads, com identificadores dos status (objeto ThreadStatusTotals).
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("extensao-encarregado/{uid:int}/status/totals")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetTotalsByExtensaoEncarregadoByStatus(int uid)
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
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de usuário inválida." });
            }

            try
            {
                var userGroups = await _context.Users.Where(u => u.Id == uid)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();

                var totals = await _context.Threads.Where(t => userGroups.Contains(t.AuthorGroup))
                    .GroupBy(t => t.ComiteStatus)
                    .Select(g => new ThreadStatusTotals()
                    {
                        QuantityInStatus = g.Count(),
                        Status = g.First()
                            .ComiteStatus,
                    })
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { totals });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Retorna uma Thread específica.
        /// Endpoint disponibilizado para o DPO e membros do grupo autor.
        /// </summary>
        /// <param name="tid">Id da thread</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "thread" onde se encontram os dados da Thread (objeto Thread)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("{tid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> Get(int tid)
        {
            if (tid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var thread = await _context.Threads.FindAsync(tid);

                if (thread == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();

                    var threadGroup = thread.AuthorGroup;

                    if (!(userGroups.Contains(threadGroup) || claims.IsDpo || claims.IsDeveloper))
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

        /// <summary>
        /// Retorna todos os comentários em uma Thread específica.
        /// Endpoint disponibilizado para o DPO e membros do grupo autor da Thread.
        /// </summary>
        /// <param name="tid">Id da thread</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "comments" onde se encontram os dados dos comentários (objeto CommentDTO)
        /// Em caso de erro, retorna um objeto JSON com uma chave "message" onde se encontra a mensagem de erro.
        /// </returns>
        [Route("comments/{tid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetCommentsInThread(int tid)
        {
            if (tid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var thread = await _context.Threads.FindAsync(tid);

                if (thread == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var threadGroup = thread.AuthorGroup;

                    if (!(userGroups.Contains(threadGroup) || claims.IsDeveloper || claims.IsDpo))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                var comments = await _context.Comments.Where(c => c.Thread == thread)
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

        /// <summary>
        /// Registra um novo comentário, iniciando uma Thread.
        /// Endpoint disponibilizado apenas para usuários que não fazem parte do Comitê LGPD.
        /// </summary>
        /// <param name="commentDto">Objeto vindo do corpo da requisição HTTP, representando o comentário. Deve corresponder ao tipo CommentDTO</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do comentário, ou indicando o erro ocorrido
        /// </returns>
        [Route("")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] CommentDTO commentDto)
        {
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

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Objeto enviado não corresponde ao tipo CommentDTO" });
            }

            try
            {
                if (ThreadExists(commentDto.Thread.Id))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        message =
                            "Este endpoint deve ser usado apenas para a criação de novas threads. Use /api/threads/reply/{tid} para adicionar comentários a threads existentes."
                    });
                }

                var comment = new Comment()
                {
                    Author = commentDto.Author,
                    DataCriacao = DateTime.Now,
                    RefItem = commentDto.RefItem,
                    Text = commentDto.Text
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

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Comentário registrado com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Registra um novo comentário, adicionando-o a uma Thread existente.
        /// Endpoint disponibilizado para o DPO e membros do grupo autor.
        /// </summary>
        /// <param name="tid">Id da thread</param>
        /// <param name="commentDto">Objeto vindo do corpo da requisição HTTP, representando o comentário. Deve corresponder ao tipo CommentDTO</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do comentário, ou indicando o erro ocorrido
        /// </returns>
        [Route("reply/{tid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> ReplyToThread(int tid, [FromBody] CommentDTO commentDto)
        {
            if (tid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            if (tid != commentDto.Thread.Id)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var thread = await _context.Threads.FindAsync(tid);

                if (thread == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                var isComite = false;

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    isComite = claims.IsComite;

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var threadGroup = thread.AuthorGroup;

                    if (!(userGroups.Contains(threadGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (!ModelState.IsValid)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Dados enviados são inválidos" });
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

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { message = "Comentário registrado com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Registra a leitura de uma Thread existente.
        /// Endpoint disponibilizado para o DPO e membros do grupo autor.
        /// </summary>
        /// <param name="tid">Id da thread</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro da leitura, ou indicando o erro ocorrido
        /// </returns>
        [Route("reply/{tid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> ReadThread(int tid)
        {
            if (tid <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
            }

            try
            {
                var thread = await _context.Threads.FindAsync(tid);

                if (thread == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }

                var isComite = false;

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    isComite = claims.IsComite;

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();
                    var threadGroup = thread.AuthorGroup;

                    if (!(userGroups.Contains(threadGroup) || claims.IsDpo || claims.IsDeveloper))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                if (isComite)
                {
                    thread.ReadReplyComite();
                }
                else
                {
                    thread.ReadReplyAuthor();
                }

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Leitura registrada com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Remove uma Thread.
        /// Endpoint não disponibilizado para uso público.
        /// </summary>
        /// <param name="tid">Id da thread</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do comentário, ou indicando o erro ocorrido
        /// </returns>
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

            try
            {
                var threadToDelete = await _context.Threads.FindAsync(tid);
                if (threadToDelete == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound,
                        new { message = "Thread não encontrada. Verifique o id" });
                }

                _context.Threads.Remove(threadToDelete);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Thread removida com sucesso!" });
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

        private bool ThreadExists(int id)
        {
            return _context.Threads.Count(t => t.Id == id) > 0;
        }
    }
}
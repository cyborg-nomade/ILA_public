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
using CPTM.ILA.Web.DTOs;
using CPTM.ILA.Web.Models.ChangeLogging;
using CPTM.ILA.Web.Models.Messaging;
using CPTM.ILA.Web.Util;
using CPTM.GNU.Library;


namespace CPTM.ILA.Web.Controllers.API
{
    [RoutePrefix("api/cases")]
    public class CasesController : ApiController
    {
        private readonly ILAContext _context;

        public CasesController()
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

                if (!claims.IsDpo && !claims.IsDeveloper)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var cases = await _context.Cases.ToListAsync();

                var caseListItems = cases.ConvertAll<CaseListItem>(Case.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK, new { cases = caseListItems });
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

                if (claims.GroupId != gid && !claims.IsDeveloper && !claims.IsDpo)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            if (gid <= 0) Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });
            try
            {
                var cases = await _context.Cases.Where(c => c.GrupoCriador.Id == gid)
                    .ToListAsync();

                var caseListItems = cases.ConvertAll<CaseListItem>(Case.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK, new { cases = caseListItems });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        [Route("{cid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> Get(int cid)
        {
            if (cid <= 0) return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });
            try
            {
                var uniqueCase = await _context.Cases.FindAsync(cid);

                if (uniqueCase == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Caso não encontrado. Verifique o id" });

                if (User.Identity is ClaimsIdentity identity)
                {
                    var claims = TokenUtil.GetTokenClaims(identity);

                    var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                        .SelectMany(u => u.Groups)
                        .ToListAsync();

                    var caseGroup = uniqueCase.GrupoCriador;

                    if (!userGroups.Contains(caseGroup) && !claims.IsDeveloper && !claims.IsDpo)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound,
                            new { message = "Recurso não encontrado" });
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK, new { uniqueCase });
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
        public async Task<HttpResponseMessage> Post([FromBody] CaseChange caseChange)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();
                var caseGroup = caseChange.Case.GrupoCriador;


                if (!userGroups.Contains(caseGroup) && !claims.IsDeveloper || claims.IsDpo)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Objeto enviado não corresponde ao tipo CaseChange" });
            }

            var caseToSave = caseChange.Case;
            var newChangeLog = caseChange.ChangeLog;

            caseToSave.RectifyCase();

            _context.Cases.Add(caseToSave);
            _context.ChangeLogs.Add(newChangeLog);
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso registrado com sucesso!" });
        }

        [Route("{cid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Edit(int cid, [FromBody] CaseChange caseChange)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();
                var caseGroup = caseChange.Case.GrupoCriador;


                if (!userGroups.Contains(caseGroup) && !claims.IsDeveloper || claims.IsComite)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            if (cid <= 0) return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Dados enviados são inválidos" });
            }

            if (cid != caseChange.Case.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Objeto enviado não corresponde ao tipo CaseChange" });
            }

            var caseToSave = caseChange.Case;
            var newChangeLog = caseChange.ChangeLog;

            caseToSave.RectifyCase();

            _context.ChangeLogs.Add(newChangeLog);
            _context.Entry(caseToSave)
                .State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CaseExists(cid))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound,
                        new { message = "Caso não encontrado. Verifique o id" });
                }

                throw;
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso registrado com sucesso!" });
        }

        [Route("{cid:int}")]
        [Authorize]
        [HttpDelete]
        public async Task<HttpResponseMessage> Delete(int cid)
        {
            if (cid <= 0) return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });
            var caseToDelete = await _context.Cases.FindAsync(cid);
            if (caseToDelete == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Caso não encontrado. Verifique o id" });
            }

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();
                var caseGroup = caseToDelete.GrupoCriador;

                if (!userGroups.Contains(caseGroup) && !claims.IsDeveloper || claims.IsComite)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            _context.Cases.Remove(caseToDelete);
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso removido com sucesso!" });
        }

        [Route("approve/{cid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Approve(int cid, [FromBody] bool aprovado)
        {
            if (cid <= 0) return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });

            var caseToApprove = await _context.Cases.FindAsync(cid);

            if (caseToApprove == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Caso não encontrado. Verifique o Id" });
            }

            var userId = 0;

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                userId = claims.UserId;

                var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();
                var caseGroup = caseToApprove.GrupoCriador;


                if (!userGroups.Contains(caseGroup) && (!claims.IsDpo || !claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            var changeLog = new ChangeLog()
            {
                Case = caseToApprove,
                ChangeDate = DateTime.Now,
                User = await _context.Users.FindAsync(userId),
            };


            if (!aprovado)
            {
                caseToApprove.ReproveCase();

                changeLog.Items = new List<ItemIdentity>()
                {
                    new ItemIdentity()
                    {
                        Identifier = "0.0", Name = "Reprovação"
                    }
                };

                _context.ChangeLogs.Add(changeLog);
                _context.Entry(caseToApprove)
                    .State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso reprovado com sucesso!" });
            }

            caseToApprove.ApproveCase();

            changeLog.Items = new List<ItemIdentity>()
            {
                new ItemIdentity()
                {
                    Identifier = "0.1", Name = "Aprovado"
                }
            };

            _context.ChangeLogs.Add(changeLog);
            _context.Entry(caseToApprove)
                .State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso aprovado com sucesso!" });
        }

        [Route("request-approval/{cid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> RequestApproval(int cid)
        {
            if (cid <= 0) return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id inválido." });

            var caseToRequestApproval = await _context.Cases.FindAsync(cid);

            if (caseToRequestApproval == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Caso não encontrado. Verifique o Id" });
            }

            var userId = 0;

            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                userId = claims.UserId;

                var userGroups = await _context.Users.Where(u => u.Id == claims.UserId)
                    .SelectMany(u => u.Groups)
                    .ToListAsync();
                var caseGroup = caseToRequestApproval.GrupoCriador;


                if (!userGroups.Contains(caseGroup) && !claims.IsDeveloper || claims.IsComite)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            caseToRequestApproval.SendCaseToApproval();

            var changeLog = new ChangeLog()
            {
                Case = caseToRequestApproval,
                ChangeDate = DateTime.Now,
                User = await _context.Users.FindAsync(userId),
                Items = new List<ItemIdentity>()
                {
                    new ItemIdentity()
                    {
                        Identifier = "0.0.1", Name = "Encaminhado para aprovação"
                    }
                }
            };

            _context.ChangeLogs.Add(changeLog);
            _context.Entry(caseToRequestApproval)
                .State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso aprovado com sucesso!" });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }

            base.Dispose(disposing);
        }

        private bool CaseExists(int id)
        {
            return _context.Cases.Count(c => c.Id == id) > 0;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.CaseHelpers;


namespace CPTM.ILA.Web.Controllers.API
{
    [RoutePrefix("api/cases")]
    public class CasesController : ApiController
    {
        private ILAContext _context;

        public CasesController()
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
                var cases = await _context.Cases.ToListAsync();

                var caseListItems = cases.ConvertAll<CaseListItem>(Case.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK, new { cases = caseListItems });
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
                var cases = await _context.Cases.Where(c => c.GrupoCriador.Id == gid)
                    .ToListAsync();

                var caseListItems = cases.ConvertAll<CaseListItem>(Case.ReduceToListItem);

                return Request.CreateResponse(HttpStatusCode.OK, new { cases = caseListItems });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor." });
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
                var uniqueCase = await _context.Cases.SingleOrDefaultAsync(c => c.Id == cid);

                if (uniqueCase == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        new { message = "Caso não encontrado. Verifique o id" });

                return Request.CreateResponse(HttpStatusCode.OK, new { uniqueCase });
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
        public async Task<HttpResponseMessage> Post([FromBody] CaseChange caseChange)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Dados enviados são inválidos" });
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
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Dados enviados são inválidos" });
            }

            if (cid != caseChange.Case.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Dados enviados são inválidos" });
            }

            var caseToSave = caseChange.Case;
            var newChangeLog = caseChange.ChangeLog;

            caseToSave.RectifyCase();

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
                else
                {
                    throw;
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso registrado com sucesso!" });
        }

        [Route("{cid:int}")]
        [Authorize]
        [HttpDelete]
        public async Task<HttpResponseMessage> Delete(int cid)
        {
            var caseToDelete = await _context.Cases.FindAsync(cid);
            if (caseToDelete == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Caso não encontrado. Verifique o id" });
            }

            _context.Cases.Remove(caseToDelete);
            await _context.SaveChangesAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { message = "Caso removido com sucesso!" });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }

            base.Dispose(disposing);
        }

        public bool CaseExists(int id)
        {
            return _context.Cases.Count(c => c.Id == id) > 0;
        }
    }
}
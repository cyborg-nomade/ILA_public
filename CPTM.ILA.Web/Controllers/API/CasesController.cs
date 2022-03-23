using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using System.Security.Claims;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.CaseHelpers;


namespace CPTM.ILA.Web.Controllers.API
{
    [RoutePrefix("api/cases")]
    public class CasesController : ApiController
    {
        [Route("")]
        [Authorize]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            var name = "";
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = identity.Claims;
                name = claims.FirstOrDefault(p => p.Type == "name")
                    ?.Value;
            }

            var cases = new List<Case>()
            {
                new Case()
                {
                    Nome = "Caso1",
                    FinalidadeTratamento = new FinalidadeTratamento()
                        { DescricaoFinalidade = "oi", HipoteseTratamento = HipotesesTratamento.Consentimento },
                    GrupoCriador = new Group() { Nome = "GGDC" }
                },
                new Case()
                {
                    Nome = "Caso2",
                    FinalidadeTratamento = new FinalidadeTratamento()
                        { DescricaoFinalidade = "oi", HipoteseTratamento = HipotesesTratamento.Consentimento },
                    GrupoCriador = new Group() { Nome = "HFPD" }
                },
                new Case()
                {
                    Nome = "Caso3",
                    FinalidadeTratamento = new FinalidadeTratamento()
                        { DescricaoFinalidade = "oi", HipoteseTratamento = HipotesesTratamento.Consentimento },
                    GrupoCriador = new Group() { Nome = "XPTY" }
                },
                new Case()
                {
                    Nome = "Caso4",
                    FinalidadeTratamento = new FinalidadeTratamento()
                        { DescricaoFinalidade = "oi", HipoteseTratamento = HipotesesTratamento.Consentimento },
                    GrupoCriador = new Group() { Nome = "ZYPD" }
                },
                new Case()
                {
                    Nome = "Caso5",
                    FinalidadeTratamento = new FinalidadeTratamento()
                        { DescricaoFinalidade = "oi", HipoteseTratamento = HipotesesTratamento.Consentimento },
                    GrupoCriador = new Group() { Nome = "ZYPD" }
                },
            };

            var caseListItems = cases.ConvertAll<CaseListItem>(Case.ReduceToListItem);

            return Request.CreateResponse(HttpStatusCode.OK, new { cases = caseListItems, name });
        }

        [Route("user/{uid}")]
        [Authorize]
        [HttpGet]
        public HttpResponseMessage GetByUser(string uid)
        {
            var name = "";
            var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var claims = identity.Claims;
                name = claims.FirstOrDefault(p => p.Type == "name")
                    ?.Value;
            }

            var cases = new List<Case>()
            {
                new Case()
                {
                    Nome = "Caso1",
                    FinalidadeTratamento = new FinalidadeTratamento()
                        { DescricaoFinalidade = "oi", HipoteseTratamento = HipotesesTratamento.Consentimento }
                },
                new Case()
                {
                    Nome = "Caso2",
                    FinalidadeTratamento = new FinalidadeTratamento()
                        { DescricaoFinalidade = "oi", HipoteseTratamento = HipotesesTratamento.Consentimento }
                },
                new Case()
                {
                    Nome = "Caso3",
                    FinalidadeTratamento = new FinalidadeTratamento()
                        { DescricaoFinalidade = "oi", HipoteseTratamento = HipotesesTratamento.Consentimento }
                },
            };

            return Request.CreateResponse(HttpStatusCode.OK, new { cases, uid, name });
        }

        [Route("{id:int}")]
        [HttpGet]
        public string Get(int id)
        {
            return "value";
        }

        [Route("")]
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [Route("{id:int}")]
        [HttpPut]
        public void Put(int id, [FromBody] string value)
        {
        }

        [Route("{id:int}")]
        [HttpDelete]
        public void Delete(int id)
        {
        }
    }
}
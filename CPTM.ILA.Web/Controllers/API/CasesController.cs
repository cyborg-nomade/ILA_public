using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using System.Security.Claims;


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
                    Nome = "Caso1"
                },
                new Case()
                {
                    Nome = "Caso2"
                },
                new Case()
                {
                    Nome = "Caso3"
                },
            };

            return Request.CreateResponse(HttpStatusCode.OK, new { cases, name });
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
                    Nome = "Caso1"
                },
                new Case()
                {
                    Nome = "Caso2"
                },
                new Case()
                {
                    Nome = "Caso3"
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;

namespace CPTM.ILA.Web.Controllers.API
{
    [RoutePrefix("api/utilities")]
    public class UtilitiesController : ApiController
    {
        [Route("countries")]
        [Authorize]
        [HttpGet]
        public HttpResponseMessage GetCountries()
        {
            var countries = Pais.ListaDePaises();
            return Request.CreateResponse(HttpStatusCode.OK, new { countries });
        }
    }
}
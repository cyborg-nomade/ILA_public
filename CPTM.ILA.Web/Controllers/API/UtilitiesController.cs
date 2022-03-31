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
    /// <summary>
    /// Controlador para utilidades diversas.
    /// </summary>
    [RoutePrefix("api/utilities")]
    public class UtilitiesController : ApiController
    {
        /// <summary>
        /// Retorna a lista completa de países do mundo, em português.
        /// </summary>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "countries" contendo uma lista dos nomes dos países do mundo.
        /// </returns>
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
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.AccessControl.VIEWS;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;
using CPTM.ILA.Web.Util;

namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador para utilidades diversas.
    /// </summary>
    [RoutePrefix("api/utilities")]
    public class UtilitiesController : ApiController
    {
        private readonly ILAContext _context;

        /// <inheritdoc />
        public UtilitiesController()
        {
            _context = new ILAContext();
        }

        /// <summary>
        /// Retorna a lista completa de países do mundo, em português.
        /// Endpoint disponibilizado para todos os usuários com acesso ao sistema.
        /// </summary>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "countries" contendo uma lista dos nomes dos países do mundo.
        /// </returns>
        [ResponseType(typeof(ApiResponseType<ICollection<string>>))]
        [Route("countries")]
        [Authorize]
        [HttpGet]
        public HttpResponseMessage GetCountries()
        {
            try
            {
                var countries = Pais.ListaDePaises();
                return Request.CreateResponse(HttpStatusCode.OK,
                    new { countries, message = "Países obtidos com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico.", e });
            }
        }

        /// <summary>
        /// Retorna a lista completa de sistemas em operação na CPTM.
        /// Endpoint disponibilizado para todos os usuários com acesso ao sistema.
        /// </summary>
        /// <returns>Status da transação e um objeto JSON com uma chave "systems" contendo uma lista dos nomes dos sistema em operação na CPTM.</returns>
        [ResponseType(typeof(ApiResponseType<List<string>>))]
        [Route("systems")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetSystems()
        {
            try
            {
                var systems = await _context.ILA_VW_CATPROD_PRODUTO.Select(s => s.TX_NOME)
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK,
                    new { systems, message = "Sistemas obtidos com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico.", e });
            }
        }
    }
}
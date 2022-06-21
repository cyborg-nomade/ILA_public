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
        private readonly string ErrorMessage = "Algo deu errado no servidor.Problema foi reportado ao suporte técnico";

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
        public async Task<HttpResponseMessage> GetCountries()
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
                await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
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
                await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }

        //[Route("test-itsm")]
        //[Authorize]
        //[HttpGet]
        //public async Task<HttpResponseMessage> TestITSM()
        //{
        //    try
        //    {
        //        var e = new Exception("test");
        //        var erro = await ErrorReportingUtil.SendErrorReport(e, _context);

        //        var chamadoAbertoAcessoSistema = await ItsmUtil.AbrirChamado("URIELF", "TESTE: \n\n ACESSO AO SISTEMA",
        //            TipoChamado.ACESSO_AO_SISTEMA);
        //        var chamadoAbertoAcessoGrupos = await ItsmUtil.AbrirChamado("URIELF", "ERRO: \n\n ACESSO A GRUPOS",
        //            TipoChamado.ACESSO_A_GRUPOS);
        //        var chamadoAbertoDuvida =
        //            await ItsmUtil.AbrirChamado("URIELF", "ERRO: \n\n  DUVIDA", TipoChamado.DUVIDA);


        //        return Request.CreateResponse(HttpStatusCode.OK, new
        //        {
        //            erro, chamadoAbertoDuvida, chamadoAbertoAcessoGrupos, chamadoAbertoAcessoSistema,
        //            message = "ITSM com sucesso!"
        //        });
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine(e);
        //        await ErrorReportingUtil.SendErrorReport(e, _context);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
        //    }
        //}
    }
}
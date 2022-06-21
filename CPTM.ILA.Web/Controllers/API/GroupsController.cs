using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Util;

namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador para grupos de acesso do sistema ILA.
    /// </summary>
    [RoutePrefix("api/groups")]
    public class GroupsController : ApiController
    {
        private readonly ILAContext _context;
        private readonly string ErrorMessage = "Algo deu errado no servidor.Problema foi reportado ao suporte técnico";


        /// <inheritdoc />
        public GroupsController()
        {
            _context = new ILAContext();
        }

        /// <summary>
        /// Retorna departamentos, gerências e diretorias da estrutura organizacional da CPTM, a fim de servirem como grupos de acesso ao ILA.
        /// Endpoint disponibilizado para todos os usuários do ILA.
        /// </summary>
        /// <returns>
        /// Status da transação e um objeto JSON com chaves "diretorias", "gerencias" e "dptos", contendo listas de strings com os nomes das áreas da CPTM.
        /// Em caso de erro, um objeto JSON com uma chave "message" descrevendo o erro ocorrido.
        /// </returns>
        [ResponseType(typeof(GroupsResponseType))]
        [Route("")]
        [AllowAnonymous]
        [HttpGet]
        public async Task<HttpResponseMessage> Get()
        {
            try
            {
                var diretorias = await _context.ILA_VW_ESTRUTURA_ORG.Where(os => os.FL_ATIVO == 1 && os.NR_NIVEL == 1)
                    .Select(os => os.DIR_SIGLA)
                    .Distinct()
                    .OrderBy(s => s.Trim()
                        .ToLower())
                    .ToListAsync();
                var gerencias = await _context.ILA_VW_ESTRUTURA_ORG.Where(os => os.FL_ATIVO == 1 && os.NR_NIVEL == 3)
                    .OrderBy(os => os.DIR_SIGLA)
                    .Select(os => os.GER_SIGLA)
                    .Distinct()
                    .OrderBy(s => s.Trim()
                        .ToLower())
                    .ToListAsync();
                var deptos = await _context.ILA_VW_ESTRUTURA_ORG.Where(os => os.FL_ATIVO == 1 && os.NR_NIVEL == 4)
                    .OrderBy(os => os.DIR_SIGLA)
                    .Select(os => os.DEP_SIGLA)
                    .Distinct()
                    .OrderBy(s => s.Trim()
                        .ToLower())
                    .ToListAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { diretorias, gerencias, deptos });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                await ErrorReportingUtil.SendErrorReport(e, _context);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ErrorMessage, e });
            }
        }
    }
}
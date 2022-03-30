using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CPTM.ILA.Web.Models;
using CPTM.ActiveDirectory;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.CasisLibrary.MVC;
using CPTM.Comum;
using CPTM.Comum.Web;
using CPTM.GNU.Library;
using CPTM.ILA.Web.DTOs;
using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Util;

namespace CPTM.ILA.Web.Controllers.API
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private readonly ILAContext _context;

        public UsersController()
        {
            _context = new ILAContext();
        }

        [Route("login")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<HttpResponseMessage> Login(AuthUser user)
        {
            if (!Seguranca.Autenticar(user.Username, user.Password))
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message = "Credenciais inválidas"
                });

            var userAd = Seguranca.ObterUsuario(user.Username);

            var areaTratamentoDados = new AgenteTratamento()
            {
                Nome = userAd.Nome,
                Area = userAd.Departamento,
                Email = userAd.Email,
                Telefone = userAd.TelefoneComercial
            };
            var userInDb = await _context.Users.SingleOrDefaultAsync(u => u.Username == user.Username);

            if (userInDb == null)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden,
                    new { message = "Seu usuário ainda não tem acesso a este sistema. Solicite acesso." });
            }

            var isDeveloper = user.Username == "urielf";

            if (userInDb.GroupAccessExpirationDate <= DateTime.Now)
            {
                userInDb.Groups = new List<Group>() { userInDb.OriginGroup };
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }

            var jwtToken = TokenUtil.CreateToken(userInDb, userAd, isDeveloper);

            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                user = userInDb,
                areaTratamentoDados,
                token = jwtToken,
                message = "Usuário logado"
            });
        }

        [Route("comite-members")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetComiteMembers()
        {
            var comiteMembers = await _context.Users.Where(u => u.IsComite == true)
                .ToListAsync();

            return Request.CreateResponse(HttpStatusCode.OK, new { comiteMembers });
        }
    }
}
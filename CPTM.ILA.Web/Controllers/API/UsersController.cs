using System;
using System.Collections.Generic;
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

namespace CPTM.ILA.Web.Controllers.API
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        [Route("login")]
        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Login(User user)
        {
            if (Seguranca.Autenticar(user.Username, user.Password))
            {
                var userAd = Seguranca.ObterUsuario(user.Username);

                const string key = "my_secret_key_12345";
                const string issuer = "http://localhost/ILA";

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                //Create a List of Claims, Keep claims name short    
                var permClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid()
                        .ToString()),
                    new Claim("valid", "1"),
                    new Claim("userid", userAd.ObjectGUID),
                    new Claim("name", userAd.Nome)
                };

                //Create Security Token object by giving required parameters    
                var securityToken = new JwtSecurityToken(issuer, issuer, permClaims, expires: DateTime.Now.AddHours(1),
                    signingCredentials: credentials);
                var jwtToken = new JwtSecurityTokenHandler().WriteToken(securityToken);

                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    user = new { id = userAd.ObjectGUID, username = userAd.Nome, isComite = false },
                    token = jwtToken,
                    message = "Usuário logado"
                });
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message = "Credenciais inválidas"
                });
            }
        }
    }
}
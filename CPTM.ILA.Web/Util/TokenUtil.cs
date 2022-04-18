using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.Models.AccessControl;
using Microsoft.IdentityModel.Tokens;

namespace CPTM.ILA.Web.Util
{
    public class TokenUtil
    {
        public int GroupId { get; set; }
        public int UserId { get; set; }
        public bool IsComite { get; set; }
        public bool IsDpo { get; set; }
        public bool IsDeveloper { get; set; }
        public string Name { get; set; }

        public static TokenUtil GetTokenClaims(ClaimsIdentity identity)
        {
            var claims = identity.Claims;
            var claimsList = claims.ToList();

            var groupId = int.Parse(claimsList.FirstOrDefault(p => p.Type == TokenClaimNames.GroupId)
                                        ?.Value ??
                                    string.Empty);
            var userId = int.Parse(claimsList.FirstOrDefault(p => p.Type == TokenClaimNames.UserId)
                                       ?.Value ??
                                   string.Empty);
            var isDpo = bool.Parse(claimsList.FirstOrDefault(p => p.Type == TokenClaimNames.IsDpo)
                                       ?.Value ??
                                   string.Empty);
            var isDeveloper = bool.Parse(claimsList.FirstOrDefault(p => p.Type == TokenClaimNames.IsDeveloper)
                                             ?.Value ??
                                         string.Empty);
            var isComite = bool.Parse(claimsList.FirstOrDefault(p => p.Type == TokenClaimNames.IsComite)
                                          ?.Value ??
                                      string.Empty);
            var name = claimsList.FirstOrDefault(p => p.Type == TokenClaimNames.Name)
                           ?.Value ??
                       string.Empty;

            return new TokenUtil()
            {
                GroupId = groupId,
                UserId = userId,
                IsComite = isComite,
                IsDpo = isDpo,
                IsDeveloper = isDeveloper,
                Name = name
            };
        }

        public static string CreateToken(User userInDb, UsuarioAD userAd, bool isDeveloper)
        {
            const string key = "DESILA_TOKEN_DEV";
            const string issuer = "http://localhost/ILA";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Create a List of Claims, Keep claims name short    
            var permClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid()
                    .ToString()),
                new Claim("valid", "1"),
                new Claim(TokenClaimNames.UserId, userInDb?.Id.ToString()),
                new Claim(TokenClaimNames.GroupId, userInDb?.OriginGroup.Id.ToString()),
                new Claim(TokenClaimNames.IsComite, userInDb?.IsComite.ToString()),
                new Claim(TokenClaimNames.IsDpo, userInDb?.IsDPO.ToString()),
                new Claim(TokenClaimNames.IsDeveloper, isDeveloper.ToString()),
                new Claim(TokenClaimNames.Name, userAd.Nome)
            };

            //Create Security Token object by giving required parameters    
            var securityToken = new JwtSecurityToken(issuer, issuer, permClaims, expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return jwtToken;
        }
    }
}
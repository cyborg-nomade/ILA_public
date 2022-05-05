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
using Microsoft.Ajax.Utilities;

namespace CPTM.ILA.Web.Controllers.API
{
    /// <summary>
    /// Controlador de usuários do sistema ILA
    /// </summary>
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private readonly ILAContext _context;

        /// <inheritdoc />
        public UsersController()
        {
            _context = new ILAContext();
        }

        /// <summary>
        /// Realiza o login do usuário.
        /// Endpoint disponibilizado publicamente
        /// </summary>
        /// <param name="user">String representando o username no AD</param>
        /// <returns>
        /// Status da transação e um objeto JSON contendo as chaves:
        /// "user", contendo os dados do usuário na base de dados do ILA (objeto User)
        /// "areaTratamentoDados", contento os dados de contato e departamento do usuário no AD CPTM (objeto AgenteTratamento)
        /// "token", contendo um token JWT, utilizado posteriormente para autenticação dos endpoints da API ILA,
        /// "message", contendo uma mensagem de sucesso, ou descrevendo o erro ocorrido
        /// </returns>
        [Route("login")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<HttpResponseMessage> Login(AuthUser user)
        {
            if (user.Username.IsNullOrWhiteSpace() || !Seguranca.Autenticar(user.Username, user.Password))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new
                {
                    message = "Credenciais inválidas"
                });
            }

            try
            {
                var userAd = Seguranca.ObterUsuario(user.Username);

                var areaTratamentoDados = new AgenteTratamento()
                {
                    Nome = userAd.Nome,
                    Area = userAd.Departamento,
                    Email = userAd.Email,
                    Telefone = userAd.TelefoneComercial
                };

                var usersInDb = await _context.Users.Include(u => u.GroupAccessExpirations)
                    .Include(u => u.OriginGroup)
                    .ToListAsync();
                var userInDb = usersInDb.SingleOrDefault(u =>
                    string.Equals(u.Username, user.Username, StringComparison.CurrentCultureIgnoreCase));
                var isDeveloper = user.Username.ToLower() == "urielf";

                if (isDeveloper && userInDb == null)
                {
                    userInDb = new User()
                    {
                        Username = userAd.Login,
                        IsComite = false,
                        IsDPO = false,
                        IsSystem = true
                    };

                    _context.Users.Add(userInDb);
                    await _context.SaveChangesAsync();


                    var groupsInDb = await _context.Groups.ToListAsync();
                    var userOriginGroup = groupsInDb.SingleOrDefault(g => g.Nome == userAd.Departamento) ??
                                          new Group()
                                          {
                                              Nome = userAd.Departamento,
                                          };

                    _context.Groups.Add(userOriginGroup);
                    await _context.SaveChangesAsync();


                    userInDb.OriginGroup = userOriginGroup;
                    userInDb.GroupAccessExpirations = new List<GroupAccessExpiration>()
                        { new GroupAccessExpiration() { ExpirationDate = DateTime.MaxValue, Group = userOriginGroup } };
                    _context.Entry(userInDb)
                        .State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }

                if (userInDb == null)
                {
                    return Request.CreateResponse(HttpStatusCode.Forbidden,
                        new { message = "Seu usuário ainda não tem acesso a este sistema. Solicite acesso." });
                }

                foreach (var groupAccessExpiration in userInDb.GroupAccessExpirations)
                {
                    if (groupAccessExpiration.ExpirationDate <= DateTime.Now && !isDeveloper)
                    {
                        userInDb.GroupAccessExpirations.Remove(groupAccessExpiration);
                    }
                }

                _context.Entry(userInDb)
                    .State = EntityState.Modified;
                foreach (var @group in userInDb.GroupAccessExpirations)
                {
                    _context.Entry(@group)
                        .State = EntityState.Modified;
                }

                await _context.SaveChangesAsync();

                var jwtToken = TokenUtil.CreateToken(userInDb, userAd, isDeveloper);

                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    user = userInDb,
                    areaTratamentoDados,
                    isDeveloper,
                    token = jwtToken,
                    message = "Usuário logado"
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico.", e });
            }
        }

        /// <summary>
        /// Retorna o membro do Comitê LGPD responsável pelo grupo determinado.
        /// Endpoint disponibilizado para todos os usuários com acesso ao ILA.
        /// </summary>
        /// <param name="gid">Id do grupo especificado</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "comiteMember" contendo os dados dos membros do Comitê LGPD (objeto AgenteTratamento)
        /// Em caso de erro, um objeto JSON com uma chave "message" descrevendo o erro ocorrido.
        /// </returns>
        [Route("comite-members/{gid:int}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetComiteMember(int gid)
        {
            try
            {
                if (gid <= 0)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });
                }

                var selectedGroup = await _context.Groups.FindAsync(gid);

                if (selectedGroup == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Id de grupo inválido." });
                }

                var comiteMembers = await _context.Users.Where(u => u.IsComite == true)
                    .ToListAsync();
                var selectedComiteMember = comiteMembers.FirstOrDefault(cm => cm.GroupAccessExpirations
                    .Select(gae => gae.Group)
                    .Contains(selectedGroup));

                if (selectedComiteMember == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new
                    {
                        message = "Nenhum usuário do Comitê LGPD é responsável por este grupo",
                        comiteMember = new AgenteTratamento()
                        {
                            Nome = "Olivia Shibata Nishiyama",
                            Area = "Encarregado de Dados (DPO)",
                            Telefone = "+ 55 11 3117 – 7001",
                            Email = "encarregado.dados@cptm.sp.gov.br"
                        }
                    });
                }

                var comiteMemberUserAd = Seguranca.ObterUsuario(selectedComiteMember.Username);

                if (comiteMemberUserAd == null)
                {
                    _context.Users.Remove(selectedComiteMember);
                    await _context.SaveChangesAsync();

                    return Request.CreateResponse(HttpStatusCode.OK, new
                    {
                        message = "Nenhum usuário do Comitê LGPD é responsável por este grupo",
                        comiteMember = new AgenteTratamento()
                        {
                            Area = "DFIS",
                            Email = "teste@teste.com",
                            Nome = "Tuba",
                            Telefone = "11954719466"
                        }
                    });
                }

                var comiteMember = new AgenteTratamento()
                {
                    Area = selectedGroup.Nome,
                    Email = comiteMemberUserAd.Email,
                    Nome = comiteMemberUserAd.Nome,
                    Telefone = comiteMemberUserAd.TelefoneComercial
                };

                return Request.CreateResponse(HttpStatusCode.OK, new { comiteMember });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico.", e });
            }
        }

        [Route("comite-members")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetComiteMembers()
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDpo || claims.IsDeveloper))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var comiteMembersUsers = await _context.Users.Where(u => u.IsComite)
                    .ToListAsync();

                var comiteMembers =
                    comiteMembersUsers.ConvertAll<ComiteMember>(Models.AccessControl.User.ReduceToComiteMember);

                return Request.CreateResponse(HttpStatusCode.OK, new { comiteMembers });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Retorna os grupos de um usuário.
        /// Endpoint não disponibilizado publicamente.
        /// </summary>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "groups" contendo o conjunto de grupos de acesso do usuário especificado (objetos Group)
        /// Em caso de erro, um objeto JSON com uma chave "message" descrevendo o erro ocorrido.
        /// </returns>
        [Route("user-groups/{username}")]
        [Authorize]
        [HttpGet]
        public async Task<HttpResponseMessage> GetUserGroups(string username)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
                if (user == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound,
                        new { message = "Usuário não encontrado.", username });
                }

                var groups = user.GroupAccessExpirations;

                return Request.CreateResponse(HttpStatusCode.OK, new { groups });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }

        /// <summary>
        /// Remove um Usuário.
        /// Endpoint disponibilizado apenas para o DPO.
        /// </summary>
        /// <param name="uid">Id da usuário</param>
        /// <returns>
        /// Status da transação e um objeto JSON com uma chave "message" confirmando o registro do comentário, ou indicando o erro ocorrido
        /// </returns>
        [Route("delete/{uid:int}")]
        [Authorize]
        [HttpPost]
        public async Task<HttpResponseMessage> Delete(int uid)
        {
            if (User.Identity is ClaimsIdentity identity)
            {
                var claims = TokenUtil.GetTokenClaims(identity);

                if (!(claims.IsDeveloper || claims.IsDpo))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Recurso não encontrado" });
                }
            }

            try
            {
                var userToDelete = await _context.Users.Where(u => u.Id == uid)
                    .Include(u => u.GroupAccessExpirations)
                    .Include(u => u.OriginGroup)
                    .SingleOrDefaultAsync();
                if (userToDelete == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound,
                        new { message = "Usuário não encontrado. Verifique o id" });
                }

                _context.Users.Remove(userToDelete);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Usuário removido com sucesso!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new { message = "Algo deu errado no servidor. Reporte ao suporte técnico." });
            }
        }
    }
}
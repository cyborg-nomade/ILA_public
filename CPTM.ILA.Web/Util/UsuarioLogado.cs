using System.Web;
using System.Linq;
using CPTM.Comum;
using CPTM.ILA.Web.Models;

namespace CPTM.ILA.Web.Util
{
    /// <summary>
    /// Classe Identificação usuario
    /// </summary>
    public static class UsuarioLogado
    {
        /// Retorna o objeto Usuario mantido na sessão
        /// </summary>
        /// <returns>Objeto do tipo Usuario</returns>
        public static Usuario Dados
        {
            get
            {
                System.Web.Configuration.AuthenticationSection section = (System.Web.Configuration.AuthenticationSection)System.Web.Configuration.WebConfigurationManager.GetSection("system.web/authentication");

                if (HttpContext.Current.Session[Constantes.UsuarioLogado] == null)
                {
                    // Redireciona para tela de logon caso a autenticação seja formulário e não esteja autenticado
                    if(section.Mode == System.Web.Configuration.AuthenticationMode.Forms && !HttpContext.Current.User.Identity.IsAuthenticated)
                    {
                        HttpContext.Current.Response.Redirect(System.Web.Security.FormsAuthentication.LoginUrl);
                    }

                    // Renova a sessão do usuário
                    if ((section.Mode == System.Web.Configuration.AuthenticationMode.Windows || section.Mode == System.Web.Configuration.AuthenticationMode.Forms) && HttpContext.Current.User.Identity.IsAuthenticated)
                    {
                        string[] login = HttpContext.Current.User.Identity.Name.Split('\\');

                        if (login.Length > 1)
                            ArmazenarDadosUsuario(login[1]);
                        else
                            ArmazenarDadosUsuario(login[0]);
                    }
                }

                return HttpContext.Current.Session[Constantes.UsuarioLogado] != null ? (Usuario)HttpContext.Current.Session[Constantes.UsuarioLogado] : null;
            }
        }

        /// <summary>
        /// Método que mantém na sessão dados do usuário logado a partir do login passado
        /// </summary>
        /// <param name="login">O login do usuário</param>
        public static void ArmazenarDadosUsuario(string login)
        {
            Usuario usuarioLogado;

            using (var _context = new ILAContext())
            {
                // Popula o objeto com os dados do usuário
                usuarioLogado = _context.Usuario.Where(x => x.UserName.ToUpper().Equals(login.ToUpper())).FirstOrDefault();

                // Popula a foto do usuário
                var usuarioLogadoFoto = _context.UsuarioFoto.Find(usuarioLogado.UsuarioId);
                usuarioLogado.Foto = usuarioLogadoFoto != null ? usuarioLogadoFoto.Imagem : null;
            }

            HttpContext.Current.Session[Constantes.UsuarioLogado] = usuarioLogado;
        }

        /// <summary>
        /// Obter o UserName do usuário logado
        /// Obs: Esse método só existe para atender a assinatura do delegate CPTM.CasisLibrary.ComponentesLibrary.GerenciadorSeguracaWeb.Instance.ObterIdentificacaoUsuarioEvent
        /// </summary>
        /// <returns>UserName do usuário logado</returns>
        public static string ObterLoginUsuario(string loginUsuario)
        {
            return Dados.UserName;
        }
    }
}

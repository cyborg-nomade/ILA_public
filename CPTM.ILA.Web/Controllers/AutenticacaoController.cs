using System;
using System.Web.Mvc;
using System.Web.Security;
using CPTM.Comum;
using CPTM.ILA.Web.ViewModels;
using CPTM.ILA.Web.Util;

namespace CPTM.ILA.Web.Controllers
{
    public class AutenticacaoController : Controller
    {
		[HttpGet,AllowAnonymous]
		public ActionResult Index()
        {
            return RedirectToAction("Login");
        }

        [HttpGet, AllowAnonymous]
        public ActionResult Login()
        {
            Session.Contents.Clear();
            Session.Contents.Abandon();
            Session.Contents.RemoveAll();

            FormsAuthentication.SignOut();

            return View();
        }

        [HttpPost, AllowAnonymous, ValidateAntiForgeryToken]
        public ActionResult Login(AutenticacaoViewModel model)
        {
            try
            {
                if (CPTM.ActiveDirectory.Seguranca.Autenticar(model.UserName, model.Senha))
                {
                    // Obtendo os dados do usuário e armazenando para utilização posterior
                    UsuarioLogado.ArmazenarDadosUsuario(model.UserName);

                    FormsAuthentication.SetAuthCookie(model.UserName, false);
                    if (Url.IsLocalUrl(model.ReturnUrl) && model.ReturnUrl.Length > 1 && model.ReturnUrl.StartsWith("/")
                        && !model.ReturnUrl.StartsWith("//") && !model.ReturnUrl.StartsWith("/\\"))
                    {
                        return Redirect(model.ReturnUrl);
                    }
                    else
                    {
                        return RedirectToActionPermanent("Index", "Home");
                    }
                }
                else
                {
                    ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Erro;
                    ViewBag.Mensagem = "Usuário ou senha inválido!";

                    model.Senha = String.Empty;

                    return View(model);
                }
            }
            catch (CPTMException ex)
            {
                return Json(new { sucesso = false, msg = ex.Mensagem });
            }
            catch (Exception ex)
            {
                // Registra a exceção no FDW
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
            }

            return View(model);
        }

		[AllowAnonymous]
        public ActionResult Logoff()
        {
            System.Web.Configuration.AuthenticationSection section = (System.Web.Configuration.AuthenticationSection)System.Web.Configuration.WebConfigurationManager.GetSection("system.web/authentication");

            Session.Contents.Clear();
            Session.Contents.Abandon();
            Session.Contents.RemoveAll();

            if (section.Mode == System.Web.Configuration.AuthenticationMode.Forms)
            {
                return RedirectToAction("Login");
            }
            else
            {
                return RedirectPermanent("/");
            }
        }

        [HttpPost, AllowAnonymous, ValidateAntiForgeryToken]
        public JsonResult Autenticar(AutenticacaoViewModel model)
        {
            try
            {
                if (CPTM.ActiveDirectory.Seguranca.Autenticar(model.UserName, model.Senha))
                {
                    return Json(new { sucesso = true, msg = "Autenticado!" });
                }
                else
                {
                    return Json(new { sucesso = false, msg = "Usuário ou senha inválido!" });
                }
            }
            catch (CPTMException ex)
            {
                return Json(new { sucesso = false, msg = ex.Mensagem });
            }
            catch (Exception ex)
            {
                // Registra a exceção no FDW
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

                return Json(new { sucesso = false, msg = ex.Message });
            }
        }
    }
}


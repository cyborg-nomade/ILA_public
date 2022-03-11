using System.Web.Mvc;
using System.Configuration;
using CPTM.CasisLibrary.MVC;
using CPTM.ILA.Web.Util;

namespace CPTM.ILA.Web.Controllers
{
    public class HomeController : BaseController
    {
        [HttpGet]
        [ControleDeAcessoAuthorize("Home/Index")]
        public ActionResult Index()
        {
            if (ConfigurationManager.AppSettings["CasisLibrary.AutenticacaoPorFormulario"].ToUpper().Equals("S"))
            {
                if (UsuarioLogado.Dados == null)
                    return RedirectToAction("Index", "Autenticacao");
            }

            return View();
        }
    }
}


using System.Web.Mvc;
using CPTM.CasisLibrary.MVC;

namespace CPTM.ILA.Web.Controllers
{
    public class ElementoIUController : BaseController
    {
        [ControleDeAcessoAuthorize("ElementoIU/Index")]
        public ActionResult Index()
        {
            return View();
        }

        [ControleDeAcessoAuthorize("ElementoIU/Formulario")]
        public ActionResult Formulario()
        {
            return View();
        }

        [ControleDeAcessoAuthorize("ElementoIU/Painel")]
        public ActionResult Painel()
        {
            return View();
        }

        [ControleDeAcessoAuthorize("ElementoIU/Botao")]
        public ActionResult Botao()
        {
            return View();
        }

        [ControleDeAcessoAuthorize("ElementoIU/Notificacao")]
        public ActionResult Notificacao()
        {
            return View();
        }

        [ControleDeAcessoAuthorize("ElementoIU/Tipografia")]
        public ActionResult Tipografia()
        {
            return View();
        }

        [ControleDeAcessoAuthorize("ElementoIU/Grid")]
        public ActionResult Grid()
        {
            return View();
        }

        [ControleDeAcessoAuthorize("ElementoIU/Icone")]
        public ActionResult Icone()
        {
            return View();
        }


    }
}


using System.Web.Mvc;
using CPTM.CasisLibrary.MVC;

namespace CPTM.ILA.Web.Controllers
{
    public class MensagemAlertaController : BaseController
    {
        [HttpGet]
        [ControleDeAcessoAuthorize("MensagemAlerta")]
        public ActionResult Index()
        {
            return View();
        }

    }
}


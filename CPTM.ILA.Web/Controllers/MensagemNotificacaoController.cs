using System.Web.Mvc;
using CPTM.CasisLibrary.MVC;

namespace CPTM.ILA.Web.Controllers
{
    public class MensagemNotificacaoController : BaseController
    {
        [HttpGet]
        [ControleDeAcessoAuthorize("MensagemNotificacao")]
        public ActionResult Index()
        {
            return View();
        }

    }
}


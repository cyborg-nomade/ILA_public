using System.Web.Mvc;
using CPTM.CasisLibrary.MVC;

namespace CPTM.ILA.Web.Controllers
{
    public class MapaController : Controller
    {
        [HttpGet]
        [ControleDeAcessoAuthorize("Mapa/Index")]
        public ActionResult Index()
        {
            return View();
        }
    }
}

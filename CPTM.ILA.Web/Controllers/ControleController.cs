using System.Web.Mvc;
using CPTM.CasisLibrary.MVC;

namespace CPTM.ILA.Web.Controllers
{
    public class ControleController : BaseController
    {
        //
        // GET: /Controle/
        [ControleDeAcessoAuthorize("Controle")]
        public ActionResult Index()
        {
            ViewBag.ddlCategoria1 = CategoriaController.CarregarCombo(0, true);
            ViewBag.ddlCategoria2 = CategoriaController.CarregarCombo(0, false);

            return View();
        }

    }
}


using System.Web.Mvc;

namespace CPTM.ILA.Web.Controllers
{
    /// <inheritdoc />
    public class HomeController : Controller
    {
        /// <summary>
        /// Página inicial da documentação
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            ViewBag.Title = "Página Inicial";

            return View();
        }
    }
}
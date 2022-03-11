using System.Web.Mvc;

namespace CPTM.ILA.Web.Controllers
{
    public class ModalController : BaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Modal1()
        {
            return View();
        }
    }
}


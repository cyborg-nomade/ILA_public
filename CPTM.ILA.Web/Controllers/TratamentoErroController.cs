using System;
using System.Web.Mvc;
using CPTM.CasisLibrary.MVC;

namespace CPTM.ILA.Web.Controllers
{
    public class TratamentoErroController : BaseController
    {
        [HttpGet]
        [ControleDeAcessoAuthorize("TratamentoErro")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SimularErro()
        {
            throw new Exception("Esse erro foi simulado para demonstrar a página de tratamento de erro.");
        }
    }
}


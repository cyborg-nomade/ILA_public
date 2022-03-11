using System.Collections.Generic;
using System.Web.Mvc;
using CPTM.Comum;
using CPTM.ILA.Web.Models;

namespace CPTM.ILA.Web.Controllers
{
    public class BaseController : Controller
    {
        #region Constantes e Variáveis 

        protected ILAContext _context;

        #endregion

        #region Construtores

        protected BaseController() : base()
        {
            _context = new ILAContext();
        }

        #endregion

        #region Combo

        protected List<SelectListItem> CarregarComboAtivoInativo()
        {
            List<SelectListItem> lista = new List<SelectListItem>();
            lista.Add(new SelectListItem { Value = "-1", Text = Constantes.Todos });
            lista.Add(new SelectListItem { Value = ((int)Enumerador.Status.Ativo).ToString(), Text = Enumerador.Status.Ativo.ToString(), Selected = true });
            lista.Add(new SelectListItem { Value = ((int)Enumerador.Status.Inativo).ToString(), Text = Enumerador.Status.Inativo.ToString() });

            return lista;
        }

        #endregion

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}


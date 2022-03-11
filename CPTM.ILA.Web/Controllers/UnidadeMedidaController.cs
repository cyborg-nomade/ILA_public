using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using CPTM.CasisLibrary.MVC;
using CPTM.Comum;
using CPTM.ILA.Web.Models;

namespace CPTM.ILA.Web.Controllers
{
    public class UnidadeMedidaController : BaseController
    {
        [HttpGet]
        [ControleDeAcessoAuthorize("UnidadeMedida/Index")]
        public ActionResult Index()
        {
            return View();
        }

        public static List<SelectListItem> CarregarCombo(short id, bool registroSelecione)
        {
            List<SelectListItem> lista = new List<SelectListItem>();

            using (var _context = new ILAContext())
            {
                var resultado = _context.UnidadeMedida.OrderBy(x => x.Nome).ToList();

                if (registroSelecione)
                {
                    lista.Add(new SelectListItem
                    {
                        Value = String.Empty,
                        Text = Constantes.Selecione
                    });
                }

                lista.AddRange(resultado.Select(item =>
                    new SelectListItem
                    {
                        Value = item.UnidadeMedidaId.ToString(),
                        Text = item.Nome,
                        Selected = item.UnidadeMedidaId == id
                    }));
            }

            return lista;
        }
    }
}

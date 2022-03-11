using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using CPTM.Comum;
using CPTM.ILA.Web.Models;

namespace CPTM.ILA.Web.Controllers
{
    public class CategoriaController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public static List<SelectListItem> CarregarCombo(int[] ids, bool registroSelecione)
        {
            List<SelectListItem> lista = new List<SelectListItem>();

            using (var _context = new ILAContext())
            {
                var resultado = _context.Categoria.OrderBy(x => x.Nome).ToList();

                if (registroSelecione)
                {
                    lista.Add(new SelectListItem
                    {
                        Value = Constantes.SelecionarValor,
                        Text = Constantes.Selecione
                    });
                }

                lista.AddRange(resultado.Select(item =>
                    new SelectListItem
                    {
                        Value = item.CategoriaId.ToString(),
                        Text = item.Nome,
                        Selected = (ids != null ? ids.Contains(item.CategoriaId) : false)
                    }));
            }

            return lista;
        }

        public static List<SelectListItem> CarregarCombo(short id, bool registroSelecione)
        {
            return CarregarCombo(new int[] { id }, registroSelecione);
        }
    }
}


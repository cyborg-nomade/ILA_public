using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Text;
using System.Web.Mvc;
using CPTM.CasisLibrary.MVC;
using CPTM.Comum;
using CPTM.Comum.Web;
using CPTM.ILA.Web.Models;

namespace CPTM.ILA.Web.Controllers
{
    public class UsuarioController : BaseController
    {
        [HttpGet]
        [ControleDeAcessoAuthorize("Usuario/Index")]
        public ActionResult Index()
        {
            var model = new Usuario.Filtro();

            ViewBag.elementoId = (Request["elementoId"] ?? String.Empty).ToString();
            ViewBag.elementoUserName = (Request["elementoUserName"] ?? String.Empty).ToString();

            ViewBag.ddlAtivos = CarregarComboAtivoInativo();
            
            return View(model);
        }

        [HttpGet]
        [ControleDeAcessoAuthorize("Usuario/Detalhar")]
        public ActionResult Detalhar(int id)
        {
            var usuario = _context.Usuario.Find(id);
            var usuarioFoto = _context.UsuarioFoto.Find(id);

            usuario.Foto = usuarioFoto != null ? usuarioFoto.Imagem : null;

            return View("Detalhar", usuario);
        }

        [HttpPost]
        [ControleDeAcessoAuthorizeAjax("Usuario/Pesquisar")]
        public JsonResult Pesquisar(Usuario.Filtro model)
        {
            // Objeto de retorno
            List<string[]> resultado = new List<string[]>();

            // Paginação
            int totalRegistros = 0;

            // Ordenação
            model.NomeColunas = new string[] { "UserName", "Nome", "Apelido", "EmpresaNome", "AreaSigla" };

            // Realiza pesquisa
            var usuarios = ObterPorFiltro(model, model.PaginaAtual, model.TamanhoPagina, model.Ordenacao, ref totalRegistros);

            foreach (var usuario in usuarios)
            {
                /* Botões */
                // Cria os botões no grid rendedizado pelo plugin utilizando os recursos do CASIS
                var controles = new StringBuilder();
                // Selecionar
                controles.Append(" ");
                controles.Append(CasisControleDinamico.ObterActionLink(this.ControllerContext,
                                                                                            "Selecionar",
                                                                                            "btnGridSelecionar",
                                                                                            string.Empty,
                                                                                            string.Empty,
                                                                                            null,
                                                                                            false,
                                                                                            string.Empty,
                                                                                            new { onclick = "modalUsuarioSelecionar('" + usuario.UsuarioId.ToString() + "','" + usuario.UserName + "','" + usuario.Nome + "')" },
                                                                                            false,
                                                                                            ActionLinkTipo.Customizado,
                                                                                            Tamanho.MuitoPequeno,
                                                                                            BootStrapEstilo.Primario,
                                                                                            Icones.Check_Quadrado_2,
                                                                                            Icones.Nenhum,
                                                                                            false,
                                                                                            true));
                // Detalhar
                controles.Append(" ");
                controles.Append(CasisControleDinamico.ObterActionLink(this.ControllerContext,
                                                                                            "Detalhar",
                                                                                            "btnGridDetalhar",
                                                                                            string.Empty,
                                                                                            string.Empty,
                                                                                            null,
                                                                                            false,
                                                                                            string.Empty,
                                                                                            new { onclick = "modalUsuarioDetalhar('" + usuario.UsuarioId.ToString() + "')" },
                                                                                            false,
                                                                                            ActionLinkTipo.Customizado,
                                                                                            Tamanho.MuitoPequeno,
                                                                                            BootStrapEstilo.Informacao,
                                                                                            Icones.Pesquisar,
                                                                                            Icones.Nenhum,
                                                                                            false,
                                                                                            true));

                resultado.Add(new string[] {
                                                String.Format("<small style='color:{0}'>{1}</small>", usuario.Ativo == 1 ? "inherit" : "red", usuario.UserName),
                                                String.Format("<small style='color:{0}'>{1}</small>", usuario.Ativo == 1 ? "inherit" : "red", usuario.Nome),
                                                String.Format("<small style='color:{0}'>{1}</small>", usuario.Ativo == 1 ? "inherit" : "red", usuario.Apelido),
                                                String.Format("<small style='color:{0}'>{1}</small>", usuario.Ativo == 1 ? "inherit" : "red", usuario.EmpresaNome),
                                                String.Format("<small style='color:{0}'>{1}</small>", usuario.Ativo == 1 ? "inherit" : "red", usuario.AreaSigla),
                                                controles.ToString()
                                            });
            }


            return Json(new
            {
                iTotalRecords = totalRegistros,
                iTotalDisplayRecords = totalRegistros,
                data = resultado,
                dataColluns = model.NomeColunas
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [ControleDeAcessoAuthorizeAjax("Usuario/ObterAtivosPorNome")]
        public JsonResult ObterAtivosPorNome(string query)
        {
            var lista = _context.Usuario
                                .Where(x => x.Ativo == 1 && (x.Nome.Contains(query) || x.UserName.Contains(query)))
                                .Select(x => new { UsuarioId = x.UsuarioId, Nome = $"{x.Nome} ({x.UserName})" });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [ControleDeAcessoAuthorizeAjax("Usuario/ObterPorId")]
        public JsonResult ObterPorId(int id)
        {
            var usuarioModel = new Usuario();
            Usuario usuario;
            UsuarioFoto usuarioFoto;

            usuario = _context.Usuario.Find(id);

            if (usuario != null)
            {
                usuarioFoto = _context.UsuarioFoto.Find(usuario.UsuarioId);

                usuario.Foto = usuarioFoto != null ? usuarioFoto.Imagem : null;
            }

            return Json(usuarioModel, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [ControleDeAcessoAuthorize("Usuario/ObterPorLogin")]
        public ActionResult ObterPorLogin(string login)
        {
            var usuarioId = 0;

            usuarioId = _context.Usuario
                                .Where(x => x.UserName.ToUpper().Equals(login.ToUpper()))
                                .FirstOrDefault()
                                .UsuarioId;

            return ObterPorId(usuarioId);
        }

        [HttpPost]
        [ControleDeAcessoAuthorizeAjax("Usuario/Autocomplete")]
        public JsonResult AutoComplete(string query)
        {
            var lista = _context.Usuario
                                .Where(x => x.Ativo == 1 && (x.Nome.Contains(query) || x.UserName.Contains(query)))
                                .Select(x => new { UsuarioId = x.UsuarioId, Nome = $"{x.Nome} ({x.UserName})" });

            return Json(lista);
        }

        #region Métodos Auxiliares

        private List<Usuario> ObterPorFiltro(Usuario.Filtro filtro, int nrPagina, int tamanhoPagina, string ordenacao, ref int nrTotalRegistros)
        {
            var query = _context.Usuario.AsQueryable();

            // UsuarioId
            if (!filtro.UsuarioId.Equals(0))
            {
                query = query.Where(x => x.UsuarioId == filtro.UsuarioId);
            }

            // UserName
            if (!string.IsNullOrWhiteSpace(filtro.UserName))
            {
                query = query.Where(x => x.UserName.ToUpper().Contains(filtro.UserName.ToUpper()));
            }

            // Nome
            if (!string.IsNullOrWhiteSpace(filtro.Nome))
            {
                query = query.Where(x => x.Nome.ToUpper().Contains(filtro.Nome.ToUpper()));
            }

            // Nome/Usuario
            if (!string.IsNullOrWhiteSpace(filtro.NomeUsuario))
            {
                query = query.Where(x => x.UserName.ToUpper().Contains(filtro.NomeUsuario.ToUpper()) || x.Nome.ToUpper().Contains(filtro.NomeUsuario.ToUpper()));
            }

            // MixId
            if (!(filtro.MixId ?? 0).Equals(0))
            {
                query = query.Where(x => x.MixId == filtro.MixId);
            }

            // Matricula
            if (!string.IsNullOrWhiteSpace(filtro.Matricula))
            {
                query = query.Where(x => x.Matricula == filtro.Matricula);
            }

            // CPF
            if (!string.IsNullOrWhiteSpace(filtro.CPF))
            {
                query = query.Where(x => x.CPF == filtro.CPF);
            }

            // Ativo
            if (filtro.Ativo >= 0)
            {
                query = query.Where(x => x.Ativo == filtro.Ativo);
            }

            // Empresa
            if (!string.IsNullOrWhiteSpace(filtro.EmpresaNome))
            {
                query = query.Where(x => x.EmpresaNome.ToUpper().Contains(filtro.EmpresaNome.ToUpper()));
            }

            // Estrutura
            if (!string.IsNullOrWhiteSpace(filtro.EstruturaOrganizacionalId))
            {
                query = query.Where(x => x.EstruturaOrganizacionalId.Equals(filtro.EstruturaOrganizacionalId, StringComparison.CurrentCultureIgnoreCase));
            }

            // AreaSigla
            if (!string.IsNullOrWhiteSpace(filtro.AreaSigla))
            {
                query = query.Where(x => x.AreaSigla.Equals(filtro.AreaSigla, StringComparison.CurrentCultureIgnoreCase));
            }

            // CargoId
            if (!(filtro.CargoId ?? 0).Equals(0))
            {
                query = query.Where(x => x.CargoId == filtro.CargoId);
            }

            // Email
            if (!string.IsNullOrWhiteSpace(filtro.Email))
            {
                query = query.Where(x => x.Email.ToUpper().Contains(filtro.Email.ToUpper()));
            }

            // Ordenação
            if (string.IsNullOrWhiteSpace(ordenacao))
            {
                query = query.OrderBy(x => x.Nome);
            }
            else
            {
                query = query.OrderByChildrens(ordenacao);
            }

            // Contagem do total de registros
            nrTotalRegistros = query.Count();

            query = query.Skip((nrPagina) * tamanhoPagina).Take(tamanhoPagina);

            return query.ToList();
        }

        private List<Usuario> ObterPorFiltro(Usuario.Filtro filtro)
        {
            int nrTotalRegistros = 0;
            return ObterPorFiltro(filtro, 0, int.MaxValue, string.Empty, ref nrTotalRegistros);
        }

        #endregion
    }
}


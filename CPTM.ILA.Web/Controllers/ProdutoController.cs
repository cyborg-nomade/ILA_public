using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Net;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using Microsoft.Reporting.WebForms;
using OfficeOpenXml;
using CPTM.CasisLibrary.MVC;
using CPTM.Comum;
using CPTM.Comum.Web;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Util;
using System.IO;

namespace CPTM.ILA.Web.Controllers
{
    public class ProdutoController : BaseController
    {
        #region Telas

        [HttpGet]
        [ControleDeAcessoAuthorize("Produto/Index")]
        public ActionResult Index()
        {
            Produto.Filtro model;

            ViewBag.ddlCategoria = CategoriaController.CarregarCombo(0, false);
            ViewBag.ddlUnidadeMedida = UnidadeMedidaController.CarregarCombo(0, false);
            ViewBag.ddlStatus = CarregarComboAtivoInativo();

            // Filtro inicial
            model = new Produto.Filtro();
            model.OrdenarPorIndiceColuna = 1;
            model.OrdenarPorDirecao = Constantes.OrdenacaoAscendente;

            return View(model);
        }

        #endregion

        #region Pesquisa

        [HttpPost]
        [ControleDeAcessoAuthorizeAjax("Produto/Pesquisar")]
        public JsonResult Pesquisar(Produto.Filtro model)
        {
            // Objeto de retorno
            List<string[]> resultado = new List<string[]>();

            // Paginação
            int totalRegistros = 0;
            
            // Ordenação
            model.NomeColunas = new string[] { "ProdutoId", "Nome", "Categoria.Nome", "UnidadeMedida.Nome", "Valor", "Ativo" };

            // Realiza pesquisa
            IList<Produto> produtos = ObterPorFiltro(model, model.PaginaAtual, model.TamanhoPagina, model.Ordenacao, ref totalRegistros);

            foreach (Produto produto in produtos)
            {
                /* Botões */
                // Cria os botões no grid rendedizado pelo plugin utilizando os recursos do CASIS
                var controles = new StringBuilder();
                // Detalhar
                controles.Append(" ");
                controles.Append(CasisControleDinamico.ObterActionLink(this.ControllerContext, 
                                                                                            "Detalhar", 
                                                                                            "btnGridProdutoDetalhar", 
                                                                                            string.Empty, 
                                                                                            string.Empty, 
                                                                                            null, 
                                                                                            true, 
                                                                                            string.Empty,
                                                                                            new { onclick = "produtoDetalhar('" + HttpServerUtility.UrlTokenEncode(Encoding.ASCII.GetBytes(produto.ProdutoId.ToString())) + "')" }, 
                                                                                            false,
                                                                                            ActionLinkTipo.Customizado,
                                                                                            Tamanho.MuitoPequeno,
                                                                                            BootStrapEstilo.Informacao,
                                                                                            Icones.Pesquisar,
                                                                                            Icones.Nenhum,
                                                                                            false, 
                                                                                            true));
                // Alterar
                controles.Append(" ");
                controles.Append(CasisControleDinamico.ObterActionLink(this.ControllerContext, 
                                                                                            "Alterar",
                                                                                            "btnGridProdutoAlterar", 
                                                                                            string.Empty, 
                                                                                            string.Empty, 
                                                                                            null, 
                                                                                            true,
                                                                                            string.Empty,
                                                                                            new { onclick = "produtoAlterar('" + HttpServerUtility.UrlTokenEncode(Encoding.ASCII.GetBytes(produto.ProdutoId.ToString())) + "')" }, 
                                                                                            false,
                                                                                            ActionLinkTipo.Customizado,
                                                                                            Tamanho.MuitoPequeno,
                                                                                            BootStrapEstilo.Alerta,
                                                                                            Icones.Editar,
                                                                                            Icones.Nenhum,
                                                                                            false, 
                                                                                            true));
                // Excluir
                controles.Append(" ");
                controles.Append(CasisControleDinamico.ObterActionLink(this.ControllerContext, 
                                                                                            "Excluir",
                                                                                            "btnGridProdutoExcluir", 
                                                                                            string.Empty, 
                                                                                            string.Empty, 
                                                                                            null, 
                                                                                            true, 
                                                                                            string.Empty,
                                                                                            new { onclick = "produtoExcluir('" + HttpServerUtility.UrlTokenEncode(Encoding.ASCII.GetBytes(produto.ProdutoId.ToString())) + "','" + produto.Nome + "')" }, 
                                                                                            false,
                                                                                            ActionLinkTipo.Customizado,
                                                                                            Tamanho.MuitoPequeno,
                                                                                            BootStrapEstilo.Perigo,
                                                                                            Icones.Lixeira,
                                                                                            Icones.Nenhum,
                                                                                            false, 
                                                                                            true));

                resultado.Add(new string[] { 
                                                produto.ProdutoId.ToString(), 
                                                produto.Nome,
                                                produto.Categoria.Nome,
                                                produto.UnidadeMedida.Nome,
                                                produto.Valor.ToString("N"),
                                                produto.AtivoImagem,
                                                controles.ToString()
                                            });
            }
         
            return Json(new
            {
                iTotalRecords = totalRegistros,
                iTotalDisplayRecords = totalRegistros,
                data = resultado,
                dataColluns = model.NomeColunas
            });
        }

        private List<Produto> ObterPorFiltro(Produto.Filtro filtro, int nrPagina, int tamanhoPagina, string ordenacao, ref int nrTotalRegistros, ref string descricaoFiltrosAplicados)
        {
            var query = _context.Produto
                                .Include("Categoria")
                                .Include("UnidadeMedida")
                                .AsQueryable();

            var descricaoFiltroAplicadosAux = new StringBuilder();

            // Id
            if (!filtro.ProdutoId.Equals(0))
            {
                query = query.Where(x => x.ProdutoId.Equals(filtro.ProdutoId));
                descricaoFiltroAplicadosAux.Append("Id: " + filtro.ProdutoId.ToString());
            }

            // Nome
            if (!string.IsNullOrWhiteSpace(filtro.Nome))
            {
                query = query.Where(x => x.Nome.ToUpper().Contains(filtro.Nome.ToUpper()));
                descricaoFiltroAplicadosAux.Append("Nome: " + filtro.Nome);
            }

            // CategoriaId
            if (filtro.CategoriaId > 0)
            {
                query = query.Where(x => x.CategoriaId.Equals(filtro.CategoriaId));
                descricaoFiltroAplicadosAux.Append("Categoria: " + filtro.CategoriaId.ToString());
            }

            // Categorias
            if (filtro.CategoriaIds != null && filtro.CategoriaIds.Count() > 0)
            {
                // Compara com os valores da lista
                query = query.Where(x => filtro.CategoriaIds.Contains(x.CategoriaId));
                descricaoFiltroAplicadosAux.Append("Categorias: " + filtro.CategoriaIds.ToString());
            }

            // Valor
            if (!filtro.Valor.Equals(0))
            {
                query = query.Where(x => x.Valor.Equals(filtro.Valor));
                descricaoFiltroAplicadosAux.Append("Valor: " + filtro.Valor.ToString());
            }

            // ValorInicial
            if (!filtro.ValorInicial.Equals(0))
            {
                query = query.Where(x => x.Valor >= filtro.ValorInicial);
                descricaoFiltroAplicadosAux.Append("Valor Inicial: " + filtro.ValorInicial.ToString());
            }

            // ValorFinal
            if (!filtro.ValorFinal.Equals(0))
            {
                query = query.Where(x => x.Valor <= filtro.ValorFinal);
                descricaoFiltroAplicadosAux.Append("Valor Final: " + filtro.ValorFinal.ToString());
            }

            // Ativo
            if (filtro.Ativo >= 0)
            {
                query = query.Where(x => x.Ativo == filtro.Ativo);
                descricaoFiltroAplicadosAux.Append("Ativo: " + filtro.Ativo.ToString());
            }

            // Unidade de Medida
            if (!filtro.UnidadeMedidaId.Equals(0))
            {
                query = query.Where(x => x.UnidadeMedidaId.Equals(filtro.UnidadeMedidaId));
                descricaoFiltroAplicadosAux.Append("Unidade de Medida: " + filtro.UnidadeMedidaId.ToString());
            }

            // Unidades de Medida
            if (filtro.UnidadeMedidaIds != null && filtro.UnidadeMedidaIds.Count() > 0)
            {
                // Compara com os valores da lista
                query = query.Where(x => filtro.UnidadeMedidaIds.Contains(x.UnidadeMedidaId));
                descricaoFiltroAplicadosAux.Append("Unidades de Medida: " + filtro.UnidadeMedidaIds.ToString());
            }

            // CadatradoPorUserName
            if (!string.IsNullOrWhiteSpace(filtro.CadastradoPorUserName))
            {
                query = query.Where(x => x.CadastradoPor.UserName.ToUpper().Contains(filtro.CadastradoPorUserName.ToUpper()));
                descricaoFiltroAplicadosAux.Append("Cadastrado Por: " + filtro.CadastradoPorUserName);
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

            // Descrição dos filtros aplicados
            descricaoFiltrosAplicados = descricaoFiltroAplicadosAux.ToString();

            // Contagem do total de registros
            nrTotalRegistros = query.Count();

            query = query.Skip((nrPagina) * tamanhoPagina).Take(tamanhoPagina);

            return query.ToList();
        }

        private List<Produto> ObterPorFiltro(Produto.Filtro filtro)
        {
            int nrTotalRegistros = 0;
            string descricaoFiltrosAplicados = string.Empty;

            return ObterPorFiltro(filtro, 0, int.MaxValue, string.Empty, ref nrTotalRegistros, ref descricaoFiltrosAplicados);
        }

        private List<Produto> ObterPorFiltro(Produto.Filtro filtro, ref string descricaoFiltrosAplicados)
        {
            int nrTotalRegistros = 0;
            return ObterPorFiltro(filtro, 0, int.MaxValue, string.Empty, ref nrTotalRegistros, ref descricaoFiltrosAplicados);
        }

        private List<Produto> ObterPorFiltro(Produto.Filtro filtro, int nrPagina, int tamanhoPagina, string ordenacao, ref int nrTotalRegistros)
        {
            string descricaoFiltrosAplicados = string.Empty;

            return ObterPorFiltro(filtro, nrPagina, tamanhoPagina, ordenacao, ref nrTotalRegistros, ref descricaoFiltrosAplicados);
        }
        
        #endregion

        #region CRUD

        [HttpGet]
        [ControleDeAcessoAuthorize("Produto/Detalhar")]
        public ActionResult Detalhar(string id)
        {
            // Verifica o valor do parâmetro id
            if (String.IsNullOrEmpty(id))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Produto model = _context.Produto.Find(Convert.ToInt32(Encoding.UTF8.GetString(HttpServerUtility.UrlTokenDecode(id))));

            // Verifica se o registro existe
            if (model == null)
            {
                return HttpNotFound();
            }

            model.CadastradoPor = _context.Usuario.Find(model.CadastradoPorId);
            model.AlteradoPor = _context.Usuario.Find(model.AlteradoPorId ?? 0);

            ViewBag.ddlCategoria = CategoriaController.CarregarCombo(model.CategoriaId, false);
            ViewBag.ddlUnidadeMedida = UnidadeMedidaController.CarregarCombo(model.UnidadeMedidaId, false);

            return PartialView("_Detalhar", model);
        }

        [HttpGet]
        [ControleDeAcessoAuthorize("Produto/Inserir")]
        public ActionResult Inserir()
        {
            // Model com os valores iniciais
            var model = new Produto();
            model.Ativo = 1;

            // ViewBag para popular a combo
            ViewBag.ddlCategoria = CategoriaController.CarregarCombo(0, true);
            ViewBag.ddlUnidadeMedida = UnidadeMedidaController.CarregarCombo(0, false);

            return PartialView("_Formulario", model);
        }

        [HttpGet]
        [ControleDeAcessoAuthorize("Produto/Alterar")]
        public ActionResult Alterar(string id)
        {
            // Verifica o valor do parâmetro id
            if (String.IsNullOrEmpty(id))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Produto model = _context.Produto.Find(Convert.ToInt32(Encoding.UTF8.GetString(HttpServerUtility.UrlTokenDecode(id))));

            // Verifica se o registro existe
            if (model == null)
            {
                return HttpNotFound();
            }

            ViewBag.ddlCategoria = CategoriaController.CarregarCombo(model.CategoriaId, true);
            ViewBag.ddlUnidadeMedida = UnidadeMedidaController.CarregarCombo(0, false);

            return PartialView("_Formulario", model);
        }

        [HttpPost, ValidateAntiForgeryToken]
        [ControleDeAcessoAuthorize("Produto/Salvar")]
        public ActionResult Salvar(Produto model)
        {
            // Popula dropdownlist
            ViewBag.ddlCategoria = CategoriaController.CarregarCombo(model.CategoriaId, true);
            ViewBag.ddlUnidadeMedida = UnidadeMedidaController.CarregarCombo(model.UnidadeMedidaId, false);

            try
            {
                // Validação
                ModelState.Remove("ProdutoId");                                            // Remove o campo da validação

                if (!ModelState.IsValid)
                {
                    ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Erro;
                    ViewBag.Mensagem = Validacao.MontarErroModel(this, ViewData.ModelState);
                    return PartialView("_Formulario", model);
                }

                // Inclusão
                if (model.ProdutoId == 0)
                {
                    Produto novoProduto = new Produto();
                    novoProduto.ProdutoId = DbUtil.ObterValorSequence(_context, Produto.Sequence);
                    novoProduto.Nome = model.Nome;
                    novoProduto.CategoriaId = model.CategoriaId;
                    novoProduto.UnidadeMedidaId = model.UnidadeMedidaId;
                    novoProduto.Valor = model.Valor;
                    novoProduto.Ativo = model.Ativo;
                    novoProduto.CadastradoPorId = UsuarioLogado.Dados.UsuarioId;
                    novoProduto.CadastradoEm = DbUtil.ObterDataHoraAtual(_context);

                    _context.Produto.Add(novoProduto);
                }
                // Alteração
                else
                {
                    Produto produto = _context.Produto.Find(model.ProdutoId);
                    produto.Nome = model.Nome;
                    produto.CategoriaId = model.CategoriaId;
                    produto.UnidadeMedidaId = model.UnidadeMedidaId;
                    produto.Valor = model.Valor;
                    produto.Ativo = model.Ativo;
                    produto.AlteradoPorId = UsuarioLogado.Dados.UsuarioId;
                    produto.AlteradoEm = DbUtil.ObterDataHoraAtual(_context);
                }

                _context.SaveChanges();

                // Define o valor do retorno
                ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Sucesso;
                // Define o valor da mensagem
                ViewBag.Mensagem = "Produto salvo com sucesso.";
            }
            catch (DbUpdateException ex)
            {
                var cptmException = new CPTMException(ex.Message, ex.InnerException);
                return Json(new { sucesso = false, msg = cptmException.Mensagem });
            }
            catch (DbEntityValidationException ex)
            {
                // Recupera as mensagens de erro em uma lista de string
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Junta todas as strings da lista em uma única
                var mensagemErro = string.Join(";", errorMessages);

                var cptmException = new CPTMException(mensagemErro, ex.InnerException);

                return Json(new { sucesso = false, msg = cptmException.Mensagem });
            }
            catch (Exception ex)
            {
                // Registra a exceção no FDW
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

                // Define o valor do retorno
                ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Erro;
                // Define o valor da mensagem
                ViewBag.Mensagem = Constantes.MsgNaoFoiPossivelCompletarOperacao;
            }

            return PartialView("_Formulario", model);
        }

        [HttpPost, ValidateAntiForgeryToken]
        [ControleDeAcessoAuthorizeAjax("Produto/Excluir")]
        public ActionResult Excluir(string id)
        {
            try
            {
                // Verifica o valor do parâmetro id
                if (String.IsNullOrEmpty(id))
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }

                var produto = _context.Produto.Find(Convert.ToInt32(Encoding.UTF8.GetString(HttpServerUtility.UrlTokenDecode(id))));

                _context.Produto.Remove(produto);

                _context.SaveChanges();

                return Json(new { sucesso = true, msg = "Produto excluído com sucesso" });
            }
            catch (DbUpdateException ex)
            {
                var cptmException = new CPTMException(ex.Message, ex.InnerException);
                return Json(new { sucesso = false, msg = cptmException.Mensagem });
            }
            catch (DbEntityValidationException ex)
            {
                // Recupera as mensagens de erro em uma lista de string
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Junta todas as strings da lista em uma única
                var mensagemErro = string.Join(";", errorMessages);

                var cptmException = new CPTMException(mensagemErro, ex.InnerException);

                return Json(new { sucesso = false, msg = cptmException.Mensagem });
            }
            catch (Exception ex)
            {
                // Registra a exceção no FDW
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

                return Json(new { sucesso = false, msg = Constantes.MsgNaoFoiPossivelCompletarOperacao });
            }
        }

        #endregion

        #region Exportação

        [HttpGet]
        [ControleDeAcessoAuthorize("Produto/Exportar")]
        public ActionResult Exportar(Produto.Filtro model, String tipoDeSaida)
        {
            string filtrosAplicados = string.Empty;

            try
            {
                if (tipoDeSaida == null)
                    return new HttpStatusCodeResult(HttpStatusCode.BadGateway);

                if (model == null)
                    return RedirectToAction("Index");

                // Realiza pesquisa
                IList<Produto> produtos = ObterPorFiltro(model, ref filtrosAplicados);

                var resultado = produtos.Select(x => 
				new {
                    x.ProdutoId,
                    x.Nome,
                    UnidadeMedida = x.UnidadeMedida.Nome,
                    x.Valor,
                    Status = x.Ativo == 1 ? "Ativo" : "Inativo"
                });

                // Tipo de saída (WORD,PDF,EXCEL)
                tipoDeSaida = tipoDeSaida.ToUpper();

                // Lista para abrigar a configuração das colunas.
                List<Exportacao.Coluna> colunas = new List<Exportacao.Coluna>();

                colunas.Add(new Exportacao.Coluna()
                {
                    // Título da coluna
                    Descricao = "Id",
                    // Largura da coluna, relativa à largura de página, em porcentagem.
                    Tamanho = 0.1,
                    // Nome do campo no conjunto de dados. # Importante: não são aceitos subcampos. Exemplo: Status.Descricao.
                    Nome = "ProdutoId"
                });

                colunas.Add(new Exportacao.Coluna() { Descricao = "Nome", Tamanho = 0.5, Nome = "Nome" });
                colunas.Add(new Exportacao.Coluna() { Descricao = "Unidade de Medida", Tamanho = 0.2, Nome = "UnidadeMedida" });
                colunas.Add(new Exportacao.Coluna() { Descricao = "Valor", Tamanho = 0.1, Nome = "Valor" });
                colunas.Add(new Exportacao.Coluna() { Descricao = "Status", Tamanho = 0.1, Nome = "Status" });

                Exportacao.ExportarLista(this,
                                            resultado,
                                            ConfiguracaoAplicacao.ObterPorParametro(Constantes.ConfiguracaoAplicacaoNome),      // Nome da aplicação
                                            "Relatório de Produtos",                                                            // Título do relatório
                                            "Subtítulo do relatório",                                                           // Subtítulo do relatório
                                            "RelatorioDeProdutos",                                                              // Nome do arquivo
                                            tipoDeSaida,                                                                        // Tipo de arquivo
                                            colunas);                                                                           // Colunas

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

                return RedirectToAction("Index");
            }
        }

        #endregion 

        #region Métodos Auxiliares

        public static List<SelectListItem> CarregarCombo(short id, string nome, bool registroSelecione)
        {
            List<SelectListItem> lista = new List<SelectListItem>();

            if (nome.Length > 2)
            {
                using (var _context = new ILAContext())
                {
                    var resultado = _context.Produto.Where(d => d.Nome.Contains(nome)).Select(x => new { x.ProdutoId, x.Nome, UnidadeMedida = x.UnidadeMedida.Nome }).OrderBy(x => x.Nome).ToList();

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
                            Value = item.ProdutoId.ToString(),
                            Text = item.Nome + '-' + item.UnidadeMedida,
                            Selected = item.ProdutoId == id
                        }));
                }
            }

            return lista;
        }

        #endregion
    }
    
}


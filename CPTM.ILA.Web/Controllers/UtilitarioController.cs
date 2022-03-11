using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using CPTM.CasisLibrary.MVC;
using CPTM.Comum;
using CPTM.Comum.Web;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.ViewModels;
using CPTM.ILA.Web.Util;

namespace CPTM.ILA.Web.Controllers
{
    public class UtilitarioController : BaseController
    {
        #region Configuração

        [ControleDeAcessoAuthorize("Utilitario/Configuracao")]
        public ActionResult Configuracao()
        {
            var configuracaoModel = new Configuracao.Filtro();

            return View(configuracaoModel);
        }

        [HttpPost]
        [ControleDeAcessoAuthorizeAjax("Utilitario/ConfiguracaoPesquisar")]
        public JsonResult ConfiguracaoPesquisar(Configuracao.Filtro model)
        {
            // Objeto de retorno
            List<string[]> resultado = new List<string[]>();

            // Paginação
            int totalRegistros = 0;

            // Ordenação
            model.NomeColunas = new string[] { "Parametro", "Descricao", "Valor" };

            // Realiza pesquisa
            var configuracoes = ObterPorFiltro(model, model.PaginaAtual, model.TamanhoPagina, model.Ordenacao, ref totalRegistros);

            foreach (Configuracao configuracao in configuracoes)
            {
                /* Botões */
                // Cria os botões no grid rendedizado pelo plugin utilizando os recursos do CASIS
                var controles = new StringBuilder();
                // Detalhar
                controles.Append(" ");
                controles.Append(CasisControleDinamico.ObterActionLink(this.ControllerContext,
                                                                                            "Detalhar",
                                                                                            "btnGridConfiguracaoDetalhar",
                                                                                            string.Empty,
                                                                                            string.Empty,
                                                                                            null,
                                                                                            true,
                                                                                            string.Empty,
                                                                                            new { onclick = "configuracaoDetalhar('" + HttpServerUtility.UrlTokenEncode(Encoding.ASCII.GetBytes(configuracao.Parametro.ToString())) + "')" },
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
                                                                                            "btnGridConfiguracaoAlterar",
                                                                                            string.Empty,
                                                                                            string.Empty,
                                                                                            null,
                                                                                            true,
                                                                                            string.Empty,
                                                                                            new { onclick = "configuracaoAlterar('" + HttpServerUtility.UrlTokenEncode(Encoding.ASCII.GetBytes(configuracao.Parametro.ToString())) + "')" },
                                                                                            false,
                                                                                            ActionLinkTipo.Customizado,
                                                                                            Tamanho.MuitoPequeno,
                                                                                            BootStrapEstilo.Alerta,
                                                                                            Icones.Editar,
                                                                                            Icones.Nenhum,
                                                                                            false,
                                                                                            true));

                resultado.Add(new string[] {
                                                String.Format("<span title='{0}'>{1}</span>", configuracao.Parametro, configuracao.Parametro.ToShort(40)),
                                                String.Format("<span title='{0}'>{1}</span>", configuracao.Descricao, configuracao.Descricao.ToShort(40)),
                                                String.Format("<span title='{0}'>{1}</span>", configuracao.Valor, configuracao.Valor.ToShort(40)),
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
        [ControleDeAcessoAuthorize("Utilitario/ConfiguracaoDetalhar")]
        public ActionResult ConfiguracaoDetalhar(string id)
        {
            // Verifica o valor do parâmetro id
            if (String.IsNullOrEmpty(id))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Configuracao model = _context.Configuracao.Find(Encoding.UTF8.GetString(HttpServerUtility.UrlTokenDecode(id)));

            // Verifica se o registro existe
            if (model == null)
            {
                return HttpNotFound();
            }

            model.CadastradoPor = _context.Usuario.Find(model.CadastradoPorId);
            model.AlteradoPor = _context.Usuario.Find(model.AlteradoPorId ?? 0);

            return PartialView("_ConfiguracaoDetalhar", model);
        }

        [HttpGet]
        [ControleDeAcessoAuthorize("Utilitario/Configuracao/Inserir")]
        public ActionResult ConfiguracaoInserir()
        {
            // Model com os valores iniciais
            var model = new Configuracao();

            return PartialView("_ConfiguracaoFormulario", model);
        }

        [HttpGet]
        [ControleDeAcessoAuthorize("Utilitario/ConfiguracaoAlterar")]
        public ActionResult ConfiguracaoAlterar(string id)
        {
            // Verifica o valor do parâmetro id
            if (String.IsNullOrEmpty(id))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Configuracao model = _context.Configuracao.Find(Encoding.UTF8.GetString(HttpServerUtility.UrlTokenDecode(id)));

            // Verifica se o registro existe
            if (model == null)
            {
                return HttpNotFound();
            }

            return PartialView("_ConfiguracaoFormulario", model);
        }

        [HttpPost, ValidateAntiForgeryToken]
		[ValidateInput(false)]
        [ControleDeAcessoAuthorize("Utilitario/ConfiguracaoSalvar")]
        public ActionResult ConfiguracaoSalvar(Configuracao model)
        {
            try
            {
                // Validação
                ModelState.Remove("ConfiguracaoId");                                            // Remove o campo da validação

                if (!ModelState.IsValid)
                {
                    ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Erro;
                    ViewBag.Mensagem = Validacao.MontarErroModel(this, ViewData.ModelState);
                    return PartialView("_ConfiguracaoFormulario", model);
                }

                Configuracao configuracao = _context.Configuracao.Find(model.Parametro);

                // Inclusão
                if (configuracao == null)
                {
                    Configuracao novoConfiguracao = new Configuracao();
                    novoConfiguracao.Parametro = model.Parametro;
                    novoConfiguracao.Valor = model.Valor;
                    novoConfiguracao.CadastradoPorId = UsuarioLogado.Dados.UsuarioId;
                    novoConfiguracao.CadastradoEm = DbUtil.ObterDataHoraAtual(_context);

                    _context.Configuracao.Add(novoConfiguracao);
                }
                // Alteração
                else
                {
                    configuracao.Parametro = model.Parametro;
                    configuracao.Valor = model.Valor;
                    configuracao.AlteradoPorId = UsuarioLogado.Dados.UsuarioId;
                    configuracao.AlteradoEm = DbUtil.ObterDataHoraAtual(_context);
                }

                _context.SaveChanges();

                // Define o valor do retorno
                ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Sucesso;
                // Define o valor da mensagem
                ViewBag.Mensagem = "Configuração salva com sucesso.";
				
				Util.ConfiguracaoAplicacao.LimparCache();
            }
            catch (DbUpdateException ex)
            {
                var cptmException = new CPTMException(ex.Message, ex.InnerException);

                // Define o valor do retorno
                ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Erro;
                // Define o valor da mensagem
                ViewBag.Mensagem = cptmException.Mensagem;
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

                // Define o valor do retorno
                ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Erro;
                // Define o valor da mensagem
                ViewBag.Mensagem = cptmException.Mensagem;
            }

            catch (CPTMException ex)
            {
                // Define o valor do retorno
                ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Erro;
                // Define o valor da mensagem
                ViewBag.Mensagem = ex.Mensagem;
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

            return PartialView("_ConfiguracaoFormulario", model);
        }

        #endregion

        #region Suporte

        [HttpGet]
        [ControleDeAcessoAuthorize("Utilitario/Suporte")]
        public ActionResult Suporte()
        {
            return View();
        }

        [HttpPost, ValidateAntiForgeryToken, Obsolete]
        public JsonResult Suporte(SuporteViewModel model)
        {
            List<string[]> lista;

            try
            {
                var queryTratada = model.LimiteRetorno > 0 ? String.Format("SELECT * FROM ({0}) WHERE ROWNUM <= {1}", model.Query, model.LimiteRetorno.ToString()) : model.Query;
                bool consulta = model.Query.ToUpper().IndexOf("SELECT") > -1;

                lista = Util.DbUtil.ExecutarQuery(_context, queryTratada, consulta);

                if (consulta)
                {
                    var colunas = lista[0];
                    lista.RemoveAt(0);

                    return Json(new
                    {
                        Colunas = colunas,
                        TotalRegistros = lista.Count,
                        Registros = lista,

                    }, JsonRequestBehavior.AllowGet);
                }

                return Json(new
                {
                    Status = 200,
                    Mensagem = "Script executado com sucesso;"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (CPTMException ex)
            {
                return Json(new
                {
                    Status = 400,
                    Mensagem = ex.Mensagem
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Status = 400,
                    Mensagem = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Notificação

        [HttpGet]
        [ControleDeAcessoAuthorize("Utilitario/Notificacao")]
        public ActionResult Notificacao()
        {
            return View();
        }

        #endregion

        #region Controle de Acesso

        [HttpGet]
        [ControleDeAcessoAuthorize("Utilitario/ControleDeAcesso")]
        public ActionResult ControleDeAcesso()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AcessoNegado()
        {
            return View();
        }

        #endregion

        #region Métodos Auxiliares

        private List<Configuracao> ObterPorFiltro(Configuracao.Filtro filtro, int nrPagina, int tamanhoPagina, string ordenacao, ref int nrTotalRegistros)
        {
            var query = _context.Configuracao.AsQueryable();

            // Parametro
            if (!string.IsNullOrWhiteSpace(filtro.Parametro))
            {
                query = query.Where(x => x.Parametro.ToUpper().Contains(filtro.Parametro.ToUpper()));
            }

            // Descricao
            if (!string.IsNullOrWhiteSpace(filtro.Descricao))
            {
                query = query.Where(x => x.Descricao.ToUpper().Contains(filtro.Descricao.ToUpper()));
            }

            // Valor
            if (!string.IsNullOrWhiteSpace(filtro.Valor))
            {
                query = query.Where(x => x.Valor.ToUpper().Contains(filtro.Valor.ToUpper()));
            }


            // Ordenação
            if (string.IsNullOrWhiteSpace(ordenacao))
            {
                query = query.OrderBy(x => x.Parametro);
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

        private List<Configuracao> ObterPorFiltro(Configuracao.Filtro filtro)
        {
            int nrTotalRegistros = 0;
            return ObterPorFiltro(filtro, 0, int.MaxValue, string.Empty, ref nrTotalRegistros);
        }

        #endregion
    }
}


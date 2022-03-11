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
using System.Data;
using System.Web.UI.WebControls;

namespace CPTM.ILA.Web.Controllers
{
    public class RelatorioController : BaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        #region Produto

        #region Telas

        [HttpGet]
        [ControleDeAcessoAuthorize("Relatorio/Produto")]
        public ActionResult Produto()
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

        private List<Produto> ObterPorFiltro(Produto.Filtro filtro, ref string descricaoFiltrosAplicados)
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

            // Descrição dos filtros aplicados
            descricaoFiltrosAplicados = descricaoFiltroAplicadosAux.ToString();

            return query.ToList();
        }

        #endregion

        #region Relatórios

        [HttpGet]
        [ControleDeAcessoAuthorize("Relatorio/Produto1")]
        public ActionResult Produto1(Produto.Filtro model, string tipoDeSaida)
        {
            try
            {
                if (tipoDeSaida == null)
                    return new HttpStatusCodeResult(HttpStatusCode.BadGateway);

                if (model == null)
                    return RedirectToAction("Index");

                string filtrosAplicados = string.Empty;

                // Realiza pesquisa
                var produtos = ObterPorFiltro(model, ref filtrosAplicados);
                                
                var resultado = produtos.Select(x => new
                {
                    x.ProdutoId,
                    x.Nome,
                    x.CategoriaId,
                    CategoriaNome = (x.Categoria ?? new Categoria()).Nome,
                    x.Valor,
                    x.CadastradoPorId,
                    CadastroPorNome = (x.CadastradoPor ?? new Usuario()).Nome,
                    x.CadastradoEm,
                    x.AlteradoPorId,
                    AlteradoPorNome = (x.AlteradoPor ?? new Usuario()).Nome,
                    x.AlteradoEm,
                    Ativo = x.Ativo == 1 ? "Ativo" : "Inativo"
                });

                if (tipoDeSaida.ToUpper().Equals("PDF"))
                {
                    // Report
                    var localReport = new LocalReport();
                    localReport.ReportPath = Server.MapPath("~/Relatorio/Produto.rdlc");

                    // Parâmetros
                    localReport.SetParameters(new ReportParameter("pFiltrosAplicados", filtrosAplicados));

                    // Define o DataSource
                    var reportDataSource = new ReportDataSource("dstRelatorio", resultado);
                    localReport.DataSources.Add(reportDataSource);

                    string reportType = "PDF";
                    string mimeType;
                    string encoding;
                    string fileNameExtension;

                    string deviceInfo =
                          "<DeviceInfo>" +
                          "  <OutputFormat>PDF</OutputFormat>" +
                          "  <PageWidth>29,7cm</PageWidth>" +
                          "  <PageHeight>21cm</PageHeight>" +
                          "  <MarginTop>1cm</MarginTop>" +
                          "  <MarginLeft>1cm</MarginLeft>" +
                          "  <MarginRight>1cm</MarginRight>" +
                          "  <MarginBottom>1cm</MarginBottom>" +
                          "</DeviceInfo>";
                    Warning[] warnings;
                    string[] streams;
                    byte[] renderedBytes;

                    // Renderiza o relatório
                    renderedBytes = localReport.Render(
                        reportType,
                        deviceInfo,
                        out mimeType,
                        out encoding,
                        out fileNameExtension,
                        out streams,
                        out warnings);

                    return File(renderedBytes, mimeType);
                } 
                else if(tipoDeSaida.ToUpper().Equals("EXCEL"))
                {
                    ExcelPackage excel = new ExcelPackage();
                    var workSheet = excel.Workbook.Worksheets.Add("Sheet1");
                    workSheet.Cells[1, 1].LoadFromCollection(resultado, true);

                    using (var memoryStream = new MemoryStream())
                    {
                        Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        Response.AddHeader("content-disposition", "attachment;  filename=Produto.xlsx");
                        excel.SaveAs(memoryStream);
                        memoryStream.WriteTo(Response.OutputStream);
                        Response.Flush();
                        Response.End();
                    }

                    return View("Produto");
                }
                else if (tipoDeSaida.ToUpper().Equals("RDLC"))
                {
                    // Código para utilização de dataset
                    //var dstRelatorio = new Relatorio.Produto();

                    //foreach (var lst in resultado)
                    //{
                    //    var row = dstRelatorio.Dados.NewDadosRow();

                    //    row.ProdutoId = lst.ProdutoId.ToString();
                    //    row.Nome = lst.Nome;
                    //    row.CategoriaNome = lst.CategoriaNome;
                    //    row.Valor = lst.Valor.ToString();

                    //    dstRelatorio.Dados.AddDadosRow(row);
                    //}

                    //var rowFiltro = dstRelatorio.Filtro.NewFiltroRow();

                    //rowFiltro.IdProduto = model.ProdutoId;
                    //rowFiltro.IdCategoria = model.CategoriaId;

                    //dstRelatorio.Filtro.AddFiltroRow(rowFiltro);

                    //dstRelatorio.AcceptChanges();

                    // Geração do relatório
                    var viewer = new ReportViewer();

                    if (resultado.Count() > 0)
                    {
                        viewer.ProcessingMode = ProcessingMode.Local;
                        viewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + "/Relatorio/Produto.rdlc";

                        // Apenas para exemplo pegamos 100 registros.
                        var result = resultado.Select(s => new
                        {
                            s.ProdutoId,
                            s.Nome,
                            s.CategoriaNome,
                            s.Valor,
                        }).Take(100).AsEnumerable();

                        // Parâmetros
                        viewer.LocalReport.SetParameters(new ReportParameter("pProdutoId", model.ProdutoId.ToString()));

                        viewer.LocalReport.DataSources.Clear();
                        viewer.LocalReport.DataSources.Add(new ReportDataSource("dstRelatorio", result));
                        viewer.LocalReport.Refresh();
                    }

                    viewer.AsyncRendering = false;
                    viewer.SizeToReportContent = true;
                    viewer.Width = Unit.Percentage(100);
                    viewer.Height = Unit.Percentage(100);

                    ViewBag.ReportViewer = viewer;

                    return View("RelatorioProduto", model);
                }
                else
                {
                    return new HttpStatusCodeResult(HttpStatusCode.NotFound);
                }
            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

                if (!tipoDeSaida.ToUpper().Equals("RDLC"))
                    return View("Produto");
                else
                    return View("RelatorioProduto");
            }
        }

        #endregion

        #endregion
    }
    
}


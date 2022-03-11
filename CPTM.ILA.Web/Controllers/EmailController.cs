using System;
using System.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using CPTM.Comum;
using CPTM.CasisLibrary.MVC;
using CPTM.ILA.Web.ViewModels;

namespace CPTM.ILA.Web.Controllers
{
    public class EmailController : BaseController
    {
        [HttpGet]
        [ControleDeAcessoAuthorize("Email/Index")]
        public ActionResult Index()
        {
            var model = new EmailViewModel();
            model.Remetente = "projetomodelo@cptm.sp.gov.br";

            return View();
        }

        [HttpPost, ValidateInput(false)]
        [ControleDeAcessoAuthorize("Email/Enviar")]
        public ActionResult Enviar(EmailViewModel model)
        {
            try
            {
                var mensagemErro = String.Empty;

                // Anexos
                var anexos = new Dictionary<string, byte[]>();
                var anexoArquivoNomes = model.Anexos.Where(x => x != null).Select(x => x.FileName).ToList();

                foreach (var anexo in model.Anexos.Where(x => x != null))  
                {
                    using (Stream inputStream = anexo.InputStream)
                    {
                        MemoryStream memoryStream = inputStream as MemoryStream;
                        if (memoryStream == null)
                        {
                            memoryStream = new MemoryStream();
                            inputStream.CopyTo(memoryStream);
                        }
                        anexos.Add(anexo.FileName, memoryStream.ToArray());
                    }
                }

                if (GNU.Library.Email.Enviar(ConfigurationManager.AppSettings["CasisLibrary.CodigoSistema"].ToString(),
                                                model.Remetente,
                                                model.Remetente,
                                                model.Destinatario.Split(';').ToList<string>(),
                                                model.Cc.Split(';').ToList<string>(),
                                                model.Cco.Split(';').ToList<string>(),
                                                model.Assunto,
                                                model.Mensagem,
                                                anexos,
                                                DateTime.Now,
                                                Util.UsuarioLogado.Dados.UsuarioId,
                                                ref mensagemErro))
                {
                    // Define o valor do retorno
                    ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Sucesso;
                    // Define o valor da mensagem
                    ViewBag.Mensagem = "E-mail enviado com sucesso.";

                    model = new EmailViewModel();
                }
                else
                {
                    // Define o valor do retorno
                    ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Erro;
                    // Define o valor da mensagem
                    ViewBag.Mensagem = mensagemErro;
                }
            }
            catch (Exception ex)
            {
                // Define o valor do retorno
                ViewBag.Retorno = Enumerador.EnumRetornoMensagem.Erro;
                // Define o valor da mensagem
                ViewBag.Mensagem = ex.Message;
            }

            return View("Index", model);
        }
    }
}


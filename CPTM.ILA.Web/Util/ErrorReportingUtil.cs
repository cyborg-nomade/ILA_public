using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CPTM.ActiveDirectory;
using CPTM.GNU.Library;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.CaseHelpers;

namespace CPTM.ILA.Web.Util
{
    public class ErrorReportingUtil
    {
        public static async Task<bool> SendErrorReport(Exception e, ILAContext context)
        {
            var userEmailId = context.ILA_VW_USUARIO.Where(u => u.TX_USERNAME == "URIELF")
                .Select(u => u.ID_CODUSUARIO)
                .SingleOrDefault();
            var userAd = Seguranca.ObterUsuario("urielf");
            var assunto = $"ERRO NO SISTEMA ILA";
            var mensagem = $@"A seguinte exceção ocorreio no sistema ILA:

                                {e}";
            var erro = "Algo deu errado no envio do e-mail.";
            //send email
            var enviado = Email.Enviar("ILA", userAd.Nome, userAd.Email,
                new List<string>() { "uriel.fiori@cptm.sp.gov.br" }, assunto, mensagem, DateTime.Now, userEmailId,
                ref erro);

            var chamadoAberto = await ItsmUtil.AbrirChamado("URIELF", "ERRO: \n\n" + e, TipoChamado.ERRO);

            return enviado && chamadoAberto;
        }
    }
}
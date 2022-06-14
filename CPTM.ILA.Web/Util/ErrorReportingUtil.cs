using System;
using System.Collections.Generic;
using System.Linq;
using CPTM.ActiveDirectory;
using CPTM.GNU.Library;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.CaseHelpers;

namespace CPTM.ILA.Web.Util
{
    public class ErrorReportingUtil
    {
        private readonly ILAContext _context;

        public bool SendErrorEmail(Exception e)
        {
            var userEmailId = _context.ILA_VW_USUARIO.Where(u => u.TX_USERNAME == "URIELF")
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

            return enviado;
        }
    }
}
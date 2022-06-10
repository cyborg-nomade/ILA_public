using System.Globalization;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.Models;

namespace CPTM.ILA.Web.DTOs
{
    public class CaseListItem
    {
        public int Id { get; set; }
        public string Ref { get; set; }
        public string Nome { get; set; }
        public string Area { get; set; }
        public string DataEnvio { get; set; }
        public string DataAprovacao { get; set; }
        public string DataProxRevisao { get; set; }
        public string UsuarioResp { get; set; }
        public string DadosPessoaisSensiveis { get; set; }
        public int GrupoCriadorId { get; set; }
        public bool Aprovado { get; set; }
        public bool Reprovado { get; set; }
        public bool EncaminhadoAprovacao { get; set; }

        public static CaseListItem ReduceToListItem(Case fullCase) =>
            new CaseListItem()
            {
                Nome = fullCase.Nome,
                Id = fullCase.Id,
                Ref = fullCase.Ref,
                Area = fullCase.Area,
                UsuarioResp = Seguranca.ObterUsuario(fullCase.UsernameResponsavel)
                    .Nome.ToUpper(),
                DataEnvio = fullCase.DataEnvio?.ToString("d", CultureInfo.GetCultureInfo("pt-BR")) ?? "",
                DataAprovacao = fullCase.DataAprovacao?.ToString("d", CultureInfo.GetCultureInfo("pt-BR")) ?? "",
                DataProxRevisao = fullCase.DataProxRevisao?.ToString("d", CultureInfo.GetCultureInfo("pt-BR")) ?? "",
                DadosPessoaisSensiveis = fullCase.DadosPessoaisSensiveis ? "SIM" : "NÃO",
                GrupoCriadorId = fullCase.GrupoCriadorId,
                Aprovado = fullCase.Aprovado,
                Reprovado = fullCase.Reprovado,
                EncaminhadoAprovacao = fullCase.EncaminhadoAprovacao
            };
    }
}
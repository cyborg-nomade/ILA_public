using System;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.CaseHelpers;
using Microsoft.Ajax.Utilities;

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
        public string ComiteMemberResp { get; set; }

        public static CaseListItem ReduceToListItem(Case fullCase) =>
            new CaseListItem()
            {
                Nome = fullCase.Nome,
                Id = fullCase.Id,
                Ref = fullCase.Ref,
                Area = fullCase.Area,
                UsuarioResp = fullCase.UsernameResponsavel == "LGPDCOMUM"
                    ? "LGPDCOMUM"
                    : Seguranca.ObterUsuario(fullCase.UsernameResponsavel)
                        .Nome.ToUpper(),
                DataEnvio = fullCase.DataEnvio?.ToString("d", CultureInfo.GetCultureInfo("pt-BR")) ?? "",
                DataAprovacao = fullCase.DataAprovacao?.ToString("d", CultureInfo.GetCultureInfo("pt-BR")) ?? "",
                DataProxRevisao = fullCase.DataProxRevisao?.ToString("d", CultureInfo.GetCultureInfo("pt-BR")) ?? "",
                DadosPessoaisSensiveis = fullCase.DadosPessoaisSensiveis ? "SIM" : "NÃO",
                GrupoCriadorId = fullCase.GrupoCriadorId,
                Aprovado = fullCase.Aprovado,
                Reprovado = fullCase.Reprovado,
                EncaminhadoAprovacao = fullCase.EncaminhadoAprovacao,
                ComiteMemberResp = GetGroupComiteMemberRespNome(fullCase.GrupoCriadorId)
            };


        private static string GetGroupComiteMemberRespNome(int gid)
        {
            var context = new ILAContext();

            var selectedGroup = context.Groups.Find(gid);


            var comiteMembers = context.Users.Include(u => u.GroupAccessExpirations.Select(gae => gae.Group))
                .Where(u => u.IsComite == true)
                .ToList();
            var selectedComiteMember = comiteMembers.FirstOrDefault(cm => cm.GroupAccessExpirations
                .Select(gae => gae.Group)
                .Contains(selectedGroup));

            if (selectedComiteMember == null)
            {
                return "OLIVIA SHIBATA NISHIYAMA";
            }

            if (selectedComiteMember.OriginGroup.Nome == "LGPDTESTE")
            {
                return "LGPDCOMUM";
            }

            var comiteMemberUserAd = Seguranca.ObterUsuario(selectedComiteMember.Username.ToUpper());

            return comiteMemberUserAd.Nome.ToUpper();
        }
    }
}
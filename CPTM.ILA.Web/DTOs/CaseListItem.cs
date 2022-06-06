using CPTM.ILA.Web.Models.CaseHelpers.Enums;

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
    }
}
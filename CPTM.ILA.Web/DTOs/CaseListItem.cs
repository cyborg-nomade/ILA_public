using CPTM.ILA.Web.Models.CaseHelpers.Enums;

namespace CPTM.ILA.Web.DTOs
{
    public class CaseListItem
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Area { get; set; }
        public string DataCriacao { get; set; }
        public string DataAtualizacao { get; set; }
        public string HipotesesTratamento { get; set; }
        public string DescricaoFinalidade { get; set; }
        public string DadosPessoaisSensiveis { get; set; }
        public int GrupoCriadorId { get; set; }
    }
}
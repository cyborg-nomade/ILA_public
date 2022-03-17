namespace CPTM.ILA.Web.Models.CaseHelpers
{
    public class CaseListItem
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Area { get; set; }
        public string DataCriacao { get; set; }
        public string DataAtualizacao { get; set; }
        public HipotesesTratamento HipotesesTratamento { get; set; }
        public string DescricaoFinalidade { get; set; }
        public string DadosPessoaisSensiveis { get; set; }
    }
}
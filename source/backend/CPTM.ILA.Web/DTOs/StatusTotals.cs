namespace CPTM.ILA.Web.DTOs
{
    public class StatusTotals
    {
        public bool Aprovado { get; set; }
        public bool EncaminhadoAprovacao { get; set; }
        public bool Reprovado { get; set; }
        public string Nome { get; set; }
        public int QuantidadeByStatus { get; set; }
    }
}
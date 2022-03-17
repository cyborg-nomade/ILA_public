namespace CPTM.ILA.Web.Models.CaseHelpers
{
    public class FasesCicloTratamento
    {
        public bool Coleta { get; set; }
        public bool Retencao { get; set; }
        public bool Processamento { get; set; }
        public bool Compartilhamento { get; set; }
        public bool Eliminacao { get; set; }
    }
}
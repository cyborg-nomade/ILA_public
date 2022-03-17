namespace CPTM.ILA.Web.Models.CaseHelpers
{
    public class ItemCategoriaDadosPessoais
    {
        public string Descricao { get; set; }
        public string TempoRetencao { get; set; }
        private FontesRetenção FonteRetenção { get; set; }
        public string CaminhoRedeSistema { get; set; }
    }
}
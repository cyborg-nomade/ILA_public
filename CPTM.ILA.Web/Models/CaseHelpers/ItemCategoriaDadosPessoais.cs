using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_CAT_DADOS_PESSOAIS")]
    public class ItemCategoriaDadosPessoais
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string TempoRetencao { get; set; }
        private FontesRetenção FonteRetenção { get; set; }
        public string CaminhoRedeSistema { get; set; }
    }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_RISCO_PRIVACIDADE")]
    public class ItemRiscoPrivacidade
    {
        public int Id { get; set; }
        public TipoRiscoPrivacidade TipoRisco { get; set; }
        public string Observacoes { get; set; }
    }
}
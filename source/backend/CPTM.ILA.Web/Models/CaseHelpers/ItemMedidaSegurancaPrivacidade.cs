using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_MEDIDA_SEG_PRIV")]
    public class ItemMedidaSegurancaPrivacidade
    {
        public int Id { get; set; }
        public TipoMedidaSegurancaPrivacidade Tipo { get; set; }
        public string Descricao { get; set; }
    }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_CONTRATO_TI")]
    public class ItemContratoTi
    {
        public int Id { get; set; }
        public string NumeroContrato { get; set; }
        public string NumeroProcessoContratacao { get; set; }
        public string ObjetoContrato { get; set; }
        public string EmailGestorContrato { get; set; }
    }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_TRANSF_INTERNACIONAL")]
    public class ItemTransferenciaInternacional
    {
        public int Id { get; set; }
        public string NomeOrganizacao { get; set; }
        public string Pais { get; set; }
        public string DadosTransferidos { get; set; }
        public TipoGarantiaTransferenciaInternacional TipoGarantia { get; set; }
    }
}
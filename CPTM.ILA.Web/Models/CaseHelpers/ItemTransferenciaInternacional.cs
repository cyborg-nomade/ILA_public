using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_TRANSF_INTERNACIONAL")]
    public class ItemTransferenciaInternacional
    {
        public int Id { get; set; }
        public string NomeOrganizacao { get; set; }
        public string Pais { get; set; }
        public string DadosTransferidos { get; set; }
        [MaxLength(250)] public string TipoGarantia { get; set; }
    }
}
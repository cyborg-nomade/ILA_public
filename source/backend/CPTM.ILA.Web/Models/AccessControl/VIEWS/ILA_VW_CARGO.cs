using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.AccessControl.VIEWS
{
    [Table("ILA.ILA_VW_CARGO")]
    public partial class ILA_VW_CARGO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ID_CARGO { get; set; }

        [StringLength(250)] public string TX_CARGO { get; set; }

        public bool? FL_ATIVO { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.AccessControl.VIEWS
{
    [Table("ILA.ILA_VW_FUNCAO")]
    public partial class ILA_VW_FUNCAO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID_FUNCAO { get; set; }

        [StringLength(100)] public string TX_FUNCAO { get; set; }

        public bool? FL_ATIVO { get; set; }
    }
}
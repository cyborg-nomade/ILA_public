using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.AccessControl.VIEWS
{
    [Table("ILA.ILA_VW_CASIS_GRUPO")]
    public partial class ILA_VW_CASIS_GRUPO
    {
        public int ID_SISTEMA { get; set; }

        [Required] [StringLength(10)] public string TX_SIGLA { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID_GRUPO { get; set; }

        [Required] [StringLength(50)] public string TX_DESCR_GRUPO { get; set; }
    }
}
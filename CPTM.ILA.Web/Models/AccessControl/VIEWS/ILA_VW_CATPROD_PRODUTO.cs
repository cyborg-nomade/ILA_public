using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.AccessControl.VIEWS
{
    [Table("ILA.ILA_VW_CATPROD_PRODUTO")]
    public partial class ILA_VW_CATPROD_PRODUTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID_PRODUTO { get; set; }

        [StringLength(233)] public string TX_NOME { get; set; }
    }
}
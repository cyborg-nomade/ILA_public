using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.Configuration
{
    [Table("ILA.ILA_USUARIO_PREFERENCIA")]
    public partial class ILA_USUARIO_PREFERENCIA
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int IdCodusuario { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string TxCategoria { get; set; }

        public string TxValor { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.AccessControl.VIEWS
{
    [Table("ILA.ILA_VW_USUARIO_FOTO")]
    public partial class ILA_VW_USUARIO_FOTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID_CODUSUARIO { get; set; }

        public byte[] FOTO { get; set; }

        public bool FL_TRATADA { get; set; }
    }
}
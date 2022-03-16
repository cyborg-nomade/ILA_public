namespace CPTM.ILA.Web.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ILA.ILA_USUARIO_PREFERENCIA")]
    public partial class ILA_USUARIO_PREFERENCIA
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID_CODUSUARIO { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string TX_CATEGORIA { get; set; }

        public string TX_VALOR { get; set; }
    }
}

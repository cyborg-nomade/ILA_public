namespace CPTM.ILA.Web.Models.AccessControl
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ILA.ILA_VW_CASIS_GRUPO_USUARIO")]
    public partial class ILA_VW_CASIS_GRUPO_USUARIO
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID_GRUPO { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID_CODUSUARIO { get; set; }
    }
}

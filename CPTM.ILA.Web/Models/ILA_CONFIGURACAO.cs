namespace CPTM.ILA.Web.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ILA.ILA_CONFIGURACAO")]
    public partial class ILA_CONFIGURACAO
    {
        [Key]
        [StringLength(250)]
        public string PARAMETRO { get; set; }

        [StringLength(4000)]
        public string TX_DESCRICAO { get; set; }

        [StringLength(4000)]
        public string VALOR { get; set; }

        public int ID_CODUSUARIO_CADASTRO { get; set; }

        public DateTime DT_CADASTRO { get; set; }

        public int? ID_CODUSUARIO_ALTERACAO { get; set; }

        public DateTime? DT_ALTERACAO { get; set; }
    }
}

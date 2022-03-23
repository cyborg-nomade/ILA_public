namespace CPTM.ILA.Web.Models.AccessControl
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ILA.ILA_VW_USUARIO")]
    public partial class ILA_VW_USUARIO
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID_CODUSUARIO { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(20)]
        public string TX_USERNAME { get; set; }

        [StringLength(100)]
        public string TX_NOMEUSUARIO { get; set; }

        [StringLength(50)]
        public string TX_APELIDO { get; set; }

        [StringLength(40)]
        public string TX_EMPRESA { get; set; }

        public long? ID_MIX { get; set; }

        [StringLength(20)]
        public string MATRICULA { get; set; }

        [StringLength(20)]
        public string MATRICULA_ANTIGA { get; set; }

        [StringLength(20)]
        public string TX_MATRIC_ALTERNATIVA { get; set; }

        [StringLength(10)]
        public string TX_SIGLA_AREA { get; set; }

        [StringLength(40)]
        public string TX_ESTRUTURA { get; set; }

        public DateTime? DT_NASCIMENTO { get; set; }

        public DateTime? DT_ADMISSAO { get; set; }

        public DateTime? DT_DEMISSAO { get; set; }

        public DateTime? DT_ATUALIZACAO { get; set; }

        public DateTime? DT_EXPIRACAO { get; set; }

        public DateTime? DT_DESLIGAMENTO_TERCEIRO { get; set; }

        [StringLength(20)]
        public string CPF { get; set; }

        [StringLength(20)]
        public string RG { get; set; }

        public decimal? CD_FUNCIONARIO { get; set; }

        [StringLength(2)]
        public string CD_TIPO_FUNCIONARIO { get; set; }

        [StringLength(30)]
        public string TX_TIPO_FUNCIONARIO { get; set; }

        [StringLength(50)]
        public string TX_SITE { get; set; }

        [StringLength(15)]
        public string TX_BILHETE_SERVICO { get; set; }

        public long? ID_CARGO { get; set; }

        [StringLength(100)]
        public string TX_CARGO { get; set; }

        public int? ID_FUNCAO { get; set; }

        [StringLength(100)]
        public string TX_FUNCAO { get; set; }

        [StringLength(1)]
        public string CD_SEXO { get; set; }

        [StringLength(15)]
        public string TX_TELEFONE { get; set; }

        [StringLength(15)]
        public string TX_TELEFONE_CELULAR { get; set; }

        [StringLength(15)]
        public string TX_FAX { get; set; }

        [StringLength(100)]
        public string TX_ENDERECO { get; set; }

        [StringLength(10)]
        public string TX_CEP { get; set; }

        [StringLength(50)]
        public string TX_CIDADE { get; set; }

        [StringLength(40)]
        public string TX_ESTADO { get; set; }

        [StringLength(100)]
        public string TX_EMAIL { get; set; }

        public int? ID_CODUSUARIO_GESTOR_AD { get; set; }

        [StringLength(2)]
        public string CD_STATUS_EMPREGADO { get; set; }

        [StringLength(50)]
        public string TX_STATUS_EMPREGADO { get; set; }

        public int? ID_CHEFE_PONTO { get; set; }

        [StringLength(15)]
        public string TX_TIPO_CHEFE { get; set; }

        public bool? FL_EMPREGADO { get; set; }

        public bool? FL_ATIVO { get; set; }

        public bool? FL_ATIVO_AD { get; set; }

        public bool? FL_ATV_NRM { get; set; }
    }
}

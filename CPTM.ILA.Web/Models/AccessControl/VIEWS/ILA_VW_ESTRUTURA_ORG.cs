using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.AccessControl.VIEWS
{
    [Table("ILA.ILA_VW_ESTRUTURA_ORG")]
    public partial class ILA_VW_ESTRUTURA_ORG
    {
        [Key] [StringLength(40)] public string ID_ESTRUTURA { get; set; }

        [StringLength(100)] public string TX_NOME { get; set; }

        [StringLength(100)] public string TX_NOME_REDUZIDO { get; set; }

        [StringLength(60)] public string TX_LOGRADOURO { get; set; }

        [StringLength(10)] public string TX_NUMERO { get; set; }

        [StringLength(25)] public string TX_COMPLEMENTO { get; set; }

        [StringLength(15)] public string CD_CENTRO_CUSTO { get; set; }

        [StringLength(50)] public string TX_BAIRRO { get; set; }

        [StringLength(50)] public string TX_CIDADE { get; set; }

        [StringLength(2)] public string TX_ESTADO { get; set; }

        [StringLength(211)] public string TX_ENDERECO_COMPLETO { get; set; }

        [StringLength(10)] public string TX_SIGLA { get; set; }

        public decimal? NR_NIVEL { get; set; }

        [StringLength(10)] public string DEP_SIGLA { get; set; }

        [StringLength(10)] public string GER_SIGLA { get; set; }

        [StringLength(10)] public string GG_SIGLA { get; set; }

        [StringLength(10)] public string DIR_SIGLA { get; set; }

        [StringLength(10)] public string CD_TIPO_ESTRUTURA { get; set; }

        [StringLength(20)] public string TX_TIPO_ESTRUTURA { get; set; }

        public decimal? FL_ATIVO { get; set; }
    }
}
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_FINALIDADE_TRATAMENTO")]
    public class FinalidadeTratamento
    {
        public int Id { get; set; }
        public HipotesesTratamento HipoteseTratamento { get; set; }
        public string DescricaoFinalidade { get; set; }
        public string PrevisaoLegal { get; set; }
        public string ResultadosTitular { get; set; }
        public string BeneficiosEsperados { get; set; }
    }
}
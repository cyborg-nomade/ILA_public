using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_PROCESSO_JUD_ADM_CRIM")]
    public class ProcessoJudAdmCrim
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais Suspeitas { get; set; }
        public ItemCategoriaDadosPessoais CondenacoesSentencas { get; set; }
        public ItemCategoriaDadosPessoais AcoesJud { get; set; }
        public ItemCategoriaDadosPessoais PenalidadesAdm { get; set; }
    }
}
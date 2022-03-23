using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_PROFISSAO_EMPREGO")]
    public class ProfissaoEmprego
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais EmpregoAtual { get; set; }
        public ItemCategoriaDadosPessoais Recrutamento { get; set; }
        public ItemCategoriaDadosPessoais Rescisao { get; set; }
        public ItemCategoriaDadosPessoais Carreira { get; set; }
        public ItemCategoriaDadosPessoais AbsenteismoDisciplina { get; set; }
        public ItemCategoriaDadosPessoais AvaliacaoDesempenho { get; set; }
    }
}
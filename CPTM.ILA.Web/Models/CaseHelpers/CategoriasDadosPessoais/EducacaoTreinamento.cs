using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_EDUCACAO_TREINAMENTO")]
    public class EducacaoTreinamento
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais AcademicosEscolares { get; set; }
        public ItemCategoriaDadosPessoais RegistroFinanceiro { get; set; }
        public ItemCategoriaDadosPessoais QualificacaoExperienciaProf { get; set; }
    }
}
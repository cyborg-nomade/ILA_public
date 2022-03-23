using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_COMPOSICAO_FAMILIAR")]
    public class ComposicaoFamiliar
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais CasamentoCoabitacao { get; set; }
        public ItemCategoriaDadosPessoais HistoricoConjugal { get; set; }
        public ItemCategoriaDadosPessoais MembrosFamilia { get; set; }
    }
}
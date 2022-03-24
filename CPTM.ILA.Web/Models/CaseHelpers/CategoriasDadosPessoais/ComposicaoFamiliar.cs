using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_COMPOSICAO_FAMILIAR")]
    public class ComposicaoFamiliar
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> CasamentoCoabitacao { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> HistoricoConjugal { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> MembrosFamilia { get; set; }
    }
}
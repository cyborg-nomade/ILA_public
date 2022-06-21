using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.DTOs.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_COMPOSICAO_FAMILIAR")]
    public class ComposicaoFamiliar
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> CasamentoCoabitacao { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> HistoricoConjugal { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> MembrosFamilia { get; set; }
    }
}
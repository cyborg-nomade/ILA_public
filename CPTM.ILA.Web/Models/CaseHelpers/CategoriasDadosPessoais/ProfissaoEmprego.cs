using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_PROFISSAO_EMPREGO")]
    public class ProfissaoEmprego
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> EmpregoAtual { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Recrutamento { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Rescisao { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Carreira { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> AbsenteismoDisciplina { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> AvaliacaoDesempenho { get; set; }
    }
}
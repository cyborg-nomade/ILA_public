using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_PROFISSAO_EMPREGO")]
    public class ProfissaoEmprego
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> EmpregoAtual { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> Recrutamento { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> Rescisao { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> Carreira { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> AbsenteismoDisciplina { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> AvaliacaoDesempenho { get; set; }
    }
}
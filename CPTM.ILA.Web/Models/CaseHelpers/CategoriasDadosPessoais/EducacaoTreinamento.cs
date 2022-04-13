using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_EDUCACAO_TREINAMENTO")]
    public class EducacaoTreinamento
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> AcademicosEscolares { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> RegistroFinanceiro { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> QualificacaoExperienciaProf { get; set; }
    }
}
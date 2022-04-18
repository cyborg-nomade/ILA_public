using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_FINANCEIROS")]
    public class Financeiros
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> IdFin { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> RecursosFin { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> DividasDespesas { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Solvencia { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> EmprestimosHipotecaCredito { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> AssistenciaFin { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> ApoliceSeguro { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> PlanoPensao { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> TransacaoFin { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Compensacao { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> AtividadeProfissional { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> AcordosAjustes { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> AutorizacoesConsentimentos { get; set; }
    }
}
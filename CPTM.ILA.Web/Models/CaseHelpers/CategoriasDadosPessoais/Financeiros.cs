using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_FINANCEIROS")]
    public class Financeiros
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> IdFin { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> RecursosFin { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> DividasDespesas { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> Solvencia { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> EmprestimosHipotecaCredito { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> AssistenciaFin { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> ApoliceSeguro { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> PlanoPensao { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> TransacaoFin { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> Compensacao { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> AtividadeProfissional { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> AcordosAjustes { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> AutorizacoesConsentimentos { get; set; }
    }
}
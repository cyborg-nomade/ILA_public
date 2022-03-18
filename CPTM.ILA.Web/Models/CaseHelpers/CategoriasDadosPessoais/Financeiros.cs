using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_FINANCEIROS")]
    public class Financeiros
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais IdFin { get; set; }
        public ItemCategoriaDadosPessoais RecursosFin { get; set; }
        public ItemCategoriaDadosPessoais DividasDespesas { get; set; }
        public ItemCategoriaDadosPessoais Solvencia { get; set; }
        public ItemCategoriaDadosPessoais EmprestimosHipotecaCredito { get; set; }
        public ItemCategoriaDadosPessoais AssistenciaFin { get; set; }
        public ItemCategoriaDadosPessoais ApoliceSeguro { get; set; }
        public ItemCategoriaDadosPessoais PlanoPensao { get; set; }
        public ItemCategoriaDadosPessoais TransacaoFin { get; set; }
        public ItemCategoriaDadosPessoais Compensacao { get; set; }
        public ItemCategoriaDadosPessoais AtividadeProfissional { get; set; }
        public ItemCategoriaDadosPessoais AcordosAjustes { get; set; }
        public ItemCategoriaDadosPessoais AutorizacoesConsentimentos { get; set; }
    }
}
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.DTOs.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_FINANCEIROS")]
    public class Financeiros
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> IdFin { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> RecursosFin { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> DividasDespesas { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> Solvencia { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> EmprestimosHipotecaCredito { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> AssistenciaFin { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> ApoliceSeguro { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> PlanoPensao { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> TransacaoFin { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> Compensacao { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> AtividadeProfissional { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> AcordosAjustes { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> AutorizacoesConsentimentos { get; set; }
    }
}
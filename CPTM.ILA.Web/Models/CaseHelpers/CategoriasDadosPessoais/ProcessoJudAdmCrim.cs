using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_PROCESSO_JUD_ADM_CRIM")]
    public class ProcessoJudAdmCrim
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Suspeitas { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> CondenacoesSentencas { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> AcoesJud { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> PenalidadesAdm { get; set; }
    }
}
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_IDENTIFICACAO")]
    public class Identificacao
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> IdPessoal { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> IdGov { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> IdEletronica { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> LocEletronica { get; set; }
    }
}
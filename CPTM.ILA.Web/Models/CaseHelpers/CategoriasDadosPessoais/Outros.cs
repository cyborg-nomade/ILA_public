using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_OUTROS")]
    public class Outros
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> OutrosItems { get; set; }
    }
}
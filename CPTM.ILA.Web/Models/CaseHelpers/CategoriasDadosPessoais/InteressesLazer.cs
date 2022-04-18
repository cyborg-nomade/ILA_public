using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_INTERESSES_LAZER")]
    public class InteressesLazer
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> AtividadesInteressesLaz { get; set; }
    }
}
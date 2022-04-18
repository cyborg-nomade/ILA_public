using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_ASSOCIACOES")]
    public class Associacoes
    {
        public int Id { get; set; }

        public virtual ICollection<ItemCategoriaDadosPessoais> OutrasAssNaoSensiveis { get; set; }
    }
}
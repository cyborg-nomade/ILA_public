using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_CARAC_PSICOLOGICAS")]
    public class CaracteristicasPsicologicas
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> DescricaoPsi { get; set; }
    }
}
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.DTOs.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_CARAC_PSICOLOGICAS")]
    public class CaracteristicasPsicologicas
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> DescricaoPsi { get; set; }
    }
}
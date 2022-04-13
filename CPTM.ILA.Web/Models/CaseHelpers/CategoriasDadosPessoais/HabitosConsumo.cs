using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_HABITOS_CONSUMO")]
    public class HabitosConsumo
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> DadosBensServicos { get; set; }
    }
}
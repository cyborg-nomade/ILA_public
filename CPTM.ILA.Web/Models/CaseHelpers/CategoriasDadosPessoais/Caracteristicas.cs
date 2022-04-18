using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_CARACTERISTICAS")]
    public class Caracteristicas
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> DetalhesPessoais { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> DetalhesMilitares { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> SituacaoImigracao { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> DescricaoFisica { get; set; }
    }
}
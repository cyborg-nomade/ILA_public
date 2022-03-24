using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_CARACTERISTICAS")]
    public class Caracteristicas
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> DetalhesPessoais { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> DetalhesMilitares { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> SituacaoImigracao { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> DescricaoFisica { get; set; }
    }
}
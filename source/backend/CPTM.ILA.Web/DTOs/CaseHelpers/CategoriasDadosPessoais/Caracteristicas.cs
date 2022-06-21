using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.DTOs.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_CARACTERISTICAS")]
    public class Caracteristicas
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> DetalhesPessoais { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> DetalhesMilitares { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> SituacaoImigracao { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> DescricaoFisica { get; set; }
    }
}
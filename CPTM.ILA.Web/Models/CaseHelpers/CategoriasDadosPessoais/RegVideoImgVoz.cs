using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_REG_VIDEO_IMG_VOZ")]
    public class RegVideoImgVoz
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> VideoImagem { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> ImagemVigilancia { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Voz { get; set; }
    }
}
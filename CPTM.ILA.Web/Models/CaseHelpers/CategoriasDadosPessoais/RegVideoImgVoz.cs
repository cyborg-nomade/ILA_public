using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_REG_VIDEO_IMG_VOZ")]
    public class RegVideoImgVoz
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais VideoImagem { get; set; }
        public ItemCategoriaDadosPessoais ImagemVigilancia { get; set; }
        public ItemCategoriaDadosPessoais Voz { get; set; }
    }
}
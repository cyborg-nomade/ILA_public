using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_CARACTERISTICAS")]
    public class Caracteristicas
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais DetalhesPessoais { get; set; }
        public ItemCategoriaDadosPessoais DetalhesMilitares { get; set; }
        public ItemCategoriaDadosPessoais SituacaoImigracao { get; set; }
        public ItemCategoriaDadosPessoais DescricaoFisica { get; set; }
    }
}
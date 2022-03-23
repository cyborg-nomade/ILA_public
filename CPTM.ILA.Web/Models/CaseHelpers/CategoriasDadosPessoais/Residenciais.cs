using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_RESIDENCIAIS")]
    public class Residenciais
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais DadosResidencia { get; set; }
    }
}
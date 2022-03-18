using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_IDENTIFICACAO")]
    public class Identificacao
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais IdPessoal { get; set; }
        public ItemCategoriaDadosPessoais IdGov { get; set; }
        public ItemCategoriaDadosPessoais IdEletronica { get; set; }
        public ItemCategoriaDadosPessoais LocEletronica { get; set; }
    }
}
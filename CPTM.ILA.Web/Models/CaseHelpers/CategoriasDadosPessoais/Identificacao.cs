using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_IDENTIFICACAO")]
    public class Identificacao
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> IdPessoal { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> IdGov { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> IdEletronica { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> LocEletronica { get; set; }
    }
}
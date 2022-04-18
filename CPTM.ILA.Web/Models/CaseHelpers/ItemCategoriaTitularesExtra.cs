using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_CAT_TITULARES_EXTRA")]
    public class ItemCategoriaTitularesExtra
    {
        public int Id { get; set; }
        public string TrataDados { get; set; }
        [MaxLength(250)] public string DescricaoDados { get; set; }
    }
}
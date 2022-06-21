using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_OBS_PROCESSO")]
    public class ItemObservacoesProcesso
    {
        public int Id { get; set; }
        public string DescricaoObs { get; set; }
    }
}
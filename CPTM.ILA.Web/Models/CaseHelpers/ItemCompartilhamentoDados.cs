using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_COMPARTILH_DADOS")]
    public class ItemCompartilhamentoDados
    {
        public int Id { get; set; }
        public string NomeInstituicao { get; set; }
        public string DadosCompartilhados { get; set; }
        public string FinalidadeCompartilhamento { get; set; }
    }
}
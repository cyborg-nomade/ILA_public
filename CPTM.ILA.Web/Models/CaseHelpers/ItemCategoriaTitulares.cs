using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_CAT_TITULARES")]
    public class ItemCategoriaTitulares
    {
        public int Id { get; set; }
        public TipoCategoriaTitulares TipoCategoria { get; set; }
        public string Descricao { get; set; }
    }
}
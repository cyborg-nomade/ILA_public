using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.Messaging
{
    [Table("ILA_ITEM_IDENTITIES")]
    public class ItemIdentity
    {
        public int Id { get; set; }
        public string Identifier { get; set; }
        public string Name { get; set; }
    }
}
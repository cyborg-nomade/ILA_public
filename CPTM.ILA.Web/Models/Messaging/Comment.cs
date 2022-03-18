using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.AccessControl;

namespace CPTM.ILA.Web.Models.Messaging
{
    [Table("ILA_COMMENTS")]
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public User Author { get; set; }
        public Thread Thread { get; set; }
    }
}
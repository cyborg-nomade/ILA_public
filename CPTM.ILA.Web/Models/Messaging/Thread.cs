using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.Messaging
{
    [Table("ILA_THREADS")]
    public class Thread
    {
        public int Id { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
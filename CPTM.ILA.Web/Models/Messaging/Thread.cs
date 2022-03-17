using System.Collections.Generic;

namespace CPTM.ILA.Web.Models.Messaging
{
    public class Thread
    {
        public int Id { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
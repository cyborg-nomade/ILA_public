using System.Collections.Generic;

namespace CPTM.ILA.Web.Models.AccessControl
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<Case> Cases { get; set; }
    }
}
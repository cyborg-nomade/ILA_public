using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.AccessControl
{
    [Table("ILA_USERS")]
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public bool IsComite { get; set; }
        public ICollection<Case> Cases { get; set; }
        public Group OriginGroup { get; set; }
        public ICollection<Group> Groups { get; set; }
    }
}
using System.Collections.Generic;
using CPTM.ILA.Web.Models.AccessControl;

namespace CPTM.ILA.Web.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public bool IsComite { get; set; }
        public bool IsDPO { get; set; }
        public bool IsSystem { get; set; }
        public Group OriginGroup { get; set; }
        public ICollection<Group> Groups { get; set; }
        public string Nome { get; set; }
    }
}
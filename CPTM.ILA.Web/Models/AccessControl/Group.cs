using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.AccessControl
{
    [Table("ILA_GROUPS")]
    public class Group
    {
        public int Id { get; set; }
        [MaxLength(2000)] public string Nome { get; set; }
    }
}
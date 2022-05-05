using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.AccessControl
{
    [Table("ILA_GROUP_ACCESS_EXPIRATIONS")]
    public class GroupAccessExpiration
    {
        public int Id { get; set; }
        public Group Group { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
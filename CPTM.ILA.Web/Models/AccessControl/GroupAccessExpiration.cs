using System;

namespace CPTM.ILA.Web.Models.AccessControl
{
    public class GroupAccessExpiration
    {
        public int Id { get; set; }
        public Group Group { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
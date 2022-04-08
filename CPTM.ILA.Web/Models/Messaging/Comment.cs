using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.CaseHelpers;

namespace CPTM.ILA.Web.Models.Messaging
{
    [Table("ILA_COMMENTS")]
    public class Comment
    {
        public int Id { get; set; }
        [MaxLength(250)] public string Text { get; set; }
        public User Author { get; set; }
        public Thread Thread { get; set; }
        public DateTime DataCriacao { get; set; }
        public string RefItem { get; set; }
    }
}
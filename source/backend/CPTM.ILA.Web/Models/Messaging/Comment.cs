using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.Messaging
{
    [Table("ILA_COMMENTS")]
    public class Comment
    {
        public int Id { get; set; }
        [MaxLength(250)] public string Text { get; set; }
        public int UserId { get; set; }
        public int ThreadId { get; set; }
        public DateTime DataCriacao { get; set; }
        public string RefItem { get; set; }
    }
}
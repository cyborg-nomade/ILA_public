using System;
using System.ComponentModel.DataAnnotations;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.Messaging;

namespace CPTM.ILA.Web.DTOs
{
    public class CommentDTO
    {
        public string Text { get; set; }
        public User Author { get; set; }
        public Thread Thread { get; set; }
        public ItemIdentity RefItem { get; set; }
    }
}
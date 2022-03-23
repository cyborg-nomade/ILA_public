using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.AccessControl;

namespace CPTM.ILA.Web.Models.Messaging
{
    [Table("ILA_THREADS")]
    public class Thread
    {
        public int Id { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public Group AuthorGroup { get; set; }
        public ThreadStatus AuthorStatus { get; set; }
        public ThreadStatus ComiteStatus { get; set; }

        public Thread AddComment(Comment comment)
        {
            this.Comments.Add(comment);
            return this;
        }

        public Thread AddComiteReply()
        {
            this.AuthorStatus = ThreadStatus.Novo;
            this.ComiteStatus = ThreadStatus.Respondido;
            return this;
        }

        public Thread AddAuthorReply()
        {
            this.AuthorStatus = ThreadStatus.Respondido;
            this.ComiteStatus = ThreadStatus.Novo;
            return this;
        }

        public Thread ReadReplyComite()
        {
            this.ComiteStatus = ThreadStatus.Pendente;
            return this;
        }

        public Thread ReadReplyAuthor()
        {
            this.AuthorStatus = ThreadStatus.Pendente;
            return this;
        }
    }

    public enum ThreadStatus
    {
        Respondido,
        Pendente,
        Novo
    }
}
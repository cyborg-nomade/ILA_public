using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.Messaging
{
    [Table("ILA_THREADS")]
    public class Thread
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public ThreadStatus AuthorStatus { get; set; }
        public ThreadStatus ComiteStatus { get; set; }

        public Thread AddComiteReply()
        {
            AuthorStatus = ThreadStatus.Novo;
            ComiteStatus = ThreadStatus.Respondido;
            return this;
        }

        public Thread AddAuthorReply()
        {
            AuthorStatus = ThreadStatus.Respondido;
            ComiteStatus = ThreadStatus.Novo;
            return this;
        }

        public Thread ReadReplyComite()
        {
            ComiteStatus = ThreadStatus.Pendente;
            return this;
        }

        public Thread ReadReplyAuthor()
        {
            AuthorStatus = ThreadStatus.Pendente;
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
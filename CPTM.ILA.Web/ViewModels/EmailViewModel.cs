using System;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace CPTM.ILA.Web.ViewModels
{
    public class EmailViewModel
    {
        [Required(ErrorMessage = "Remetente obrigatório", AllowEmptyStrings = false)]
        [DisplayName("Remetente")]
        public String Remetente { get; set; }

        [Required(ErrorMessage = "Destinatário obrigatório", AllowEmptyStrings = false)]
        [DisplayName("Destinatário")]
        public String Destinatario { get; set; }

        [DisplayName("Cc")]
        public String Cc { get; set; }

        [DisplayName("Cco")]
        public String Cco { get; set; }

        [Required(ErrorMessage = "Assunto obrigatório", AllowEmptyStrings = false)]
        [DisplayName("Assunto")]
        public String Assunto { get; set; }

        [Required(ErrorMessage = "Mensagem obrigatória", AllowEmptyStrings = false)]
        [DisplayName("Mensagem")]
        public String Mensagem { get; set; }

        [DisplayName("Anexos")]
        public HttpPostedFileBase[] Anexos { get; set; }

    }
}

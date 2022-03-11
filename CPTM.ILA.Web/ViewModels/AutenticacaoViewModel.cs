using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace CPTM.ILA.Web.ViewModels
{
    public class AutenticacaoViewModel
    {
        [Required(ErrorMessage = "Usuário obrigatório", AllowEmptyStrings = false)]
        [DisplayName("Usuário")]
        public String UserName { get; set; }

        [Required(ErrorMessage = "Senha obrigatória", AllowEmptyStrings = false)]
        [DataType(System.ComponentModel.DataAnnotations.DataType.Password)]
        [DisplayName("Senha")]
        public String Senha { get; set; }

        public String ReturnUrl { get; set; }
    }
}

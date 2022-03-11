//-----------------------------------------------------------------------------------------------------------------------
// <CPTM>
//
//  Este codigo foi gerado automaticamente por um template e não pode ser alterado.
//
// <CPTM>
//-----------------------------------------------------------------------------------------------------------------------

namespace CPTM.ILA.Web.Models
{
    using System;
    using System.Collections.Generic;
    using CPTM.Comum.Web;
    
    public partial class UsuarioPreferencia : BaseModel
    {
        public int UsuarioId { get; set; }
        public string Categoria { get; set; }
        public string Valor { get; set; }
    
        public virtual Usuario Usuario { get; set; }
    }
}


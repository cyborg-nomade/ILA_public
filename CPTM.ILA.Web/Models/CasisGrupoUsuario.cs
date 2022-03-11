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
    
    public partial class CasisGrupoUsuario : BaseModel
    {
        public int GrupoId { get; set; }
        public int UsuarioId { get; set; }
    
        public virtual CasisGrupo CasisGrupo { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}


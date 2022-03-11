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
    
    public partial class CasisGrupo : BaseModel
    {
        public CasisGrupo()
        {
            this.Usuarios = new HashSet<CasisGrupoUsuario>();
        }
    
        public int SistemaId { get; set; }
        public string SistemaSigla { get; set; }
        public int GrupoId { get; set; }
        public string GrupoNome { get; set; }
    
        public virtual ICollection<CasisGrupoUsuario> Usuarios { get; set; }
    }
}


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
    
    public partial class UsuarioFoto : BaseModel
    {
        public int UsuarioId { get; set; }
        public byte[] Imagem { get; set; }
        public short Tratada { get; set; }
    }
}


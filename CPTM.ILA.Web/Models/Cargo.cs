﻿//-----------------------------------------------------------------------------------------------------------------------
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
    
    public partial class Cargo : BaseModel
    {
        public int CargoId { get; set; }
        public string Nome { get; set; }
        public Nullable<short> Ativo { get; set; }
    }
}


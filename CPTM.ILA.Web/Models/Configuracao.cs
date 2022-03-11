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
    
    public partial class Configuracao : BaseModel
    {
        public string Parametro { get; set; }
        public string Descricao { get; set; }
        public string Valor { get; set; }
        public int CadastradoPorId { get; set; }
        public System.DateTime CadastradoEm { get; set; }
        public Nullable<int> AlteradoPorId { get; set; }
        public Nullable<System.DateTime> AlteradoEm { get; set; }
    }
}


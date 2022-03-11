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
    
    public partial class HistoricoEvento : BaseModel
    {
        public string HistoricoEventoId { get; set; }
        public string AgragateId { get; set; }
        public string TipoMensagem { get; set; }
        public string Valor { get; set; }
        public string Acao { get; set; }
        public Nullable<System.DateTime> DataEvento { get; set; }
        public string UsuarioNome { get; set; }
    }
}


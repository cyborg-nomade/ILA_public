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
    
    public partial class TipoMovimentacao : BaseModel
    {
        public TipoMovimentacao()
        {
            this.Movimentacao = new HashSet<Movimentacao>();
        }
    
        public short TipoMovimentacaoId { get; set; }
        public string Nome { get; set; }
        public Nullable<decimal> Multiplicador { get; set; }
    
        public virtual ICollection<Movimentacao> Movimentacao { get; set; }
    }
}


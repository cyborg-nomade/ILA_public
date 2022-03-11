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
    
    public partial class Operacao : BaseModel
    {
        public Operacao()
        {
            this.Movimentacoes = new HashSet<Movimentacao>();
        }
    
        public decimal OperacaoId { get; set; }
        public Nullable<int> ClienteId { get; set; }
        public Nullable<int> CadastradoPorId { get; set; }
        public Nullable<System.DateTime> CadastradoEm { get; set; }
        public Nullable<int> AlteradoPorId { get; set; }
        public Nullable<System.DateTime> AlteradoEm { get; set; }
        public Nullable<short> Ativo { get; set; }
    
        public virtual ICollection<Movimentacao> Movimentacoes { get; set; }
    }
}


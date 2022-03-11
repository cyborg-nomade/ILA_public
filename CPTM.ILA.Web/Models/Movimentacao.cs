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
    
    public partial class Movimentacao : BaseModel
    {
        public decimal MovimentacaoId { get; set; }
        public decimal OperacaoId { get; set; }
        public short TipoMovimentacaoId { get; set; }
        public int ProdutoId { get; set; }
        public decimal Quantidade { get; set; }
        public int CadastradoPorId { get; set; }
        public System.DateTime CadastradoEm { get; set; }
        public Nullable<int> AlteradoPorId { get; set; }
        public Nullable<System.DateTime> AlteradoEm { get; set; }
        public Nullable<short> Ativo { get; set; }
    
        public virtual Operacao Operacao { get; set; }
        public virtual Produto Produto { get; set; }
        public virtual TipoMovimentacao TipoMovimentacao { get; set; }
    }
}


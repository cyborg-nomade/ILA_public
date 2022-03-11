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
    
    public partial class Produto : BaseModel
    {
        public Produto()
        {
            this.Movimentacoes = new HashSet<Movimentacao>();
        }
    
        public int ProdutoId { get; set; }
        public string Nome { get; set; }
        public short CategoriaId { get; set; }
        public decimal Valor { get; set; }
        public int CadastradoPorId { get; set; }
        public System.DateTime CadastradoEm { get; set; }
        public Nullable<int> AlteradoPorId { get; set; }
        public Nullable<System.DateTime> AlteradoEm { get; set; }
        public short Ativo { get; set; }
        public short UnidadeMedidaId { get; set; }
    
        public virtual Categoria Categoria { get; set; }
        public virtual UnidadeMedida UnidadeMedida { get; set; }
        public virtual ICollection<Movimentacao> Movimentacoes { get; set; }
    }
}


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
    
    public partial class UnidadeMedida : BaseModel
    {
        public UnidadeMedida()
        {
            this.Produtos = new HashSet<Produto>();
        }
    
        public short UnidadeMedidaId { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public Nullable<short> Fracao { get; set; }
    
        public virtual ICollection<Produto> Produtos { get; set; }
    }
}


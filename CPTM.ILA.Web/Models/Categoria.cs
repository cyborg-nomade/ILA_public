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
    
    public partial class Categoria : BaseModel
    {
        public Categoria()
        {
            this.Produtos = new HashSet<Produto>();
        }
    
        public short CategoriaId { get; set; }
        public string Nome { get; set; }
    
        public virtual ICollection<Produto> Produtos { get; set; }
    }
}


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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ILAContext : DbContext
    {
        public ILAContext()
            : base("name=ILAContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Configuracao> Configuracao { get; set; }
        public DbSet<HistoricoEvento> HistoricoEvento { get; set; }
        public DbSet<UnidadeMedida> UnidadeMedida { get; set; }
        public DbSet<Movimentacao> Movimentacao { get; set; }
        public DbSet<Operacao> Operacao { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<TipoMovimentacao> TipoMovimentacao { get; set; }
        public DbSet<CasisGrupoUsuario> CasisGrupoUsuario { get; set; }
        public DbSet<CasisGrupo> CasisGrupo { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<UsuarioFoto> UsuarioFoto { get; set; }
        public DbSet<UsuarioPreferencia> UsuarioPreferencia { get; set; }
        public DbSet<Cargo> Cargo { get; set; }
        public DbSet<EstruturaOrganizacional> EstruturaOrganizacional { get; set; }
        public DbSet<Funcao> Funcao { get; set; }
    }
}


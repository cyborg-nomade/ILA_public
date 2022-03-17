using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using CPTM.ILA.Web.Models.Configuration;

namespace CPTM.ILA.Web.Models
{
    public partial class IlaContext : DbContext
    {
        public IlaContext() : base("name=ILAContext")
        {
        }

        public virtual DbSet<IlaConfiguracao> IlaConfiguracao { get; set; }
        public virtual DbSet<IlaUsuarioPreferencia> IlaUsuarioPreferencia { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IlaConfiguracao>()
                .Property(e => e.Parametro)
                .IsUnicode(false);

            modelBuilder.Entity<IlaConfiguracao>()
                .Property(e => e.TxDescricao)
                .IsUnicode(false);

            modelBuilder.Entity<IlaConfiguracao>()
                .Property(e => e.Valor)
                .IsUnicode(false);

            modelBuilder.Entity<IlaUsuarioPreferencia>()
                .Property(e => e.TxCategoria)
                .IsUnicode(false);

            modelBuilder.Entity<IlaUsuarioPreferencia>()
                .Property(e => e.TxValor)
                .IsUnicode(false);
        }
    }
}
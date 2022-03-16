using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace CPTM.ILA.Web.Models
{
    public partial class ILAContext : DbContext
    {
        public ILAContext() : base("name=ILAContext")
        {
        }

        public virtual DbSet<ILA_CONFIGURACAO> ILA_CONFIGURACAO { get; set; }
        public virtual DbSet<ILA_USUARIO_PREFERENCIA> ILA_USUARIO_PREFERENCIA { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ILA_CONFIGURACAO>()
                .Property(e => e.PARAMETRO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_CONFIGURACAO>()
                .Property(e => e.TX_DESCRICAO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_CONFIGURACAO>()
                .Property(e => e.VALOR)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_USUARIO_PREFERENCIA>()
                .Property(e => e.TX_CATEGORIA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_USUARIO_PREFERENCIA>()
                .Property(e => e.TX_VALOR)
                .IsUnicode(false);
        }
    }
}
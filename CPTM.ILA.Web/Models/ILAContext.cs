using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Models.Configuration;
using CPTM.ILA.Web.Models.Messaging;

namespace CPTM.ILA.Web.Models
{
    public partial class IlaContext : DbContext
    {
        public IlaContext() : base("name=ILAContext")
        {
        }

        public virtual DbSet<IlaConfiguracao> IlaConfiguracao { get; set; }

        public virtual DbSet<IlaUsuarioPreferencia> IlaUsuarioPreferencia { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<Case> Cases { get; set; }

        public virtual DbSet<AccessRequest> AccessRequests { get; set; }
        public virtual DbSet<Thread> Threads { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ILA");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

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
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.AccessControl.VIEWS;
using CPTM.ILA.Web.Models.ChangeLogging;
using CPTM.ILA.Web.Models.Configuration;
using CPTM.ILA.Web.Models.Messaging;

namespace CPTM.ILA.Web.Models
{
    public class ILAContext : DbContext
    {
        public ILAContext() : base("name=ILAContext")
        {
        }

        public virtual DbSet<ILA_CONFIGURACAO> ILA_CONFIGURACAO { get; set; }
        public virtual DbSet<ILA_USUARIO_PREFERENCIA> ILA_USUARIO_PREFERENCIA { get; set; }
        public virtual DbSet<ILA_VW_CARGO> ILA_VW_CARGO { get; set; }
        public virtual DbSet<ILA_VW_CASIS_GRUPO> ILA_VW_CASIS_GRUPO { get; set; }
        public virtual DbSet<ILA_VW_CASIS_GRUPO_USUARIO> ILA_VW_CASIS_GRUPO_USUARIO { get; set; }
        public virtual DbSet<ILA_VW_ESTRUTURA_ORG> ILA_VW_ESTRUTURA_ORG { get; set; }
        public virtual DbSet<ILA_VW_FUNCAO> ILA_VW_FUNCAO { get; set; }
        public virtual DbSet<ILA_VW_USUARIO_FOTO> ILA_VW_USUARIO_FOTO { get; set; }
        public virtual DbSet<ILA_VW_USUARIO> ILA_VW_USUARIO { get; set; }

        public virtual DbSet<Case> Cases { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<AccessRequest> AccessRequests { get; set; }
        public virtual DbSet<ChangeLog> ChangeLogs { get; set; }
        public virtual DbSet<Thread> Threads { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ILA");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<ILA_CONFIGURACAO>()
                .Property(e => e.Parametro)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_CONFIGURACAO>()
                .Property(e => e.TxDescricao)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_CONFIGURACAO>()
                .Property(e => e.Valor)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_USUARIO_PREFERENCIA>()
                .Property(e => e.TxCategoria)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_USUARIO_PREFERENCIA>()
                .Property(e => e.TxValor)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_CARGO>()
                .Property(e => e.TX_CARGO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_CASIS_GRUPO>()
                .Property(e => e.TX_SIGLA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_CASIS_GRUPO>()
                .Property(e => e.TX_DESCR_GRUPO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.ID_ESTRUTURA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_NOME)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_NOME_REDUZIDO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_LOGRADOURO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_NUMERO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_COMPLEMENTO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.CD_CENTRO_CUSTO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_BAIRRO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_CIDADE)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_ESTADO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_ENDERECO_COMPLETO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_SIGLA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.NR_NIVEL)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.DEP_SIGLA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.GER_SIGLA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.GG_SIGLA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.DIR_SIGLA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.CD_TIPO_ESTRUTURA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.TX_TIPO_ESTRUTURA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_ESTRUTURA_ORG>()
                .Property(e => e.FL_ATIVO)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ILA_VW_FUNCAO>()
                .Property(e => e.TX_FUNCAO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_USERNAME)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_NOMEUSUARIO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_APELIDO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_EMPRESA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.MATRICULA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.MATRICULA_ANTIGA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_MATRIC_ALTERNATIVA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_SIGLA_AREA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_ESTRUTURA)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.CPF)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.RG)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.CD_FUNCIONARIO)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.CD_TIPO_FUNCIONARIO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_TIPO_FUNCIONARIO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_SITE)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_BILHETE_SERVICO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_CARGO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_FUNCAO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.CD_SEXO)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_TELEFONE)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_TELEFONE_CELULAR)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_FAX)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_ENDERECO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_CEP)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_CIDADE)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_ESTADO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_EMAIL)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.CD_STATUS_EMPREGADO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_STATUS_EMPREGADO)
                .IsUnicode(false);

            modelBuilder.Entity<ILA_VW_USUARIO>()
                .Property(e => e.TX_TIPO_CHEFE)
                .IsUnicode(false);
        }
    }
}
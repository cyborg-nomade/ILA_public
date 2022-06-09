namespace CPTM.ILA.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FullModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "ILA.ILA_ACCESS_REQUESTS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        UsernameSolicitante = c.String(),
                        UsernameSuperior = c.String(),
                        Justificativa = c.String(),
                        EmailSuperiorPath = c.String(),
                        TipoSolicitacaoAcesso = c.Decimal(nullable: false, precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_GROUPS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Nome = c.String(maxLength: 2000),
                        AccessRequest_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ACCESS_REQUESTS", t => t.AccessRequest_Id)
                .Index(t => t.AccessRequest_Id);
            
            CreateTable(
                "ILA.ILA_CASES",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Ref = c.String(maxLength: 250),
                        Nome = c.String(maxLength: 250),
                        Area = c.String(),
                        DataCriacao = c.DateTime(nullable: false),
                        DataAtualizacao = c.DateTime(nullable: false),
                        DataEnvio = c.DateTime(),
                        DataAprovacao = c.DateTime(),
                        DataProxRevisao = c.DateTime(),
                        UsernameResponsavel = c.String(maxLength: 250),
                        GrupoCriadorId = c.Decimal(nullable: false, precision: 9, scale: 0),
                        Aprovado = c.Decimal(nullable: false, precision: 1, scale: 0),
                        Reprovado = c.Decimal(nullable: false, precision: 1, scale: 0),
                        ComentarioReprovacao = c.String(),
                        EncaminhadoAprovacao = c.Decimal(nullable: false, precision: 1, scale: 0),
                        DadosPessoaisSensiveis = c.Decimal(nullable: false, precision: 1, scale: 0),
                        DescricaoFluxoTratamento = c.String(),
                        AbrangenciaGeografica_Value = c.String(),
                        FonteDados = c.String(),
                        FrequenciaTratamento_Value = c.String(),
                        QtdeDadosTratados = c.Decimal(nullable: false, precision: 9, scale: 0),
                        QtdeDadosSensiveisTratados = c.Decimal(nullable: false, precision: 9, scale: 0),
                        AreaTratamentoDados_Id = c.Decimal(precision: 9, scale: 0),
                        CategoriasTitulares_Id = c.Decimal(precision: 9, scale: 0),
                        Controlador_Id = c.Decimal(precision: 9, scale: 0),
                        Encarregado_Id = c.Decimal(precision: 9, scale: 0),
                        ExtensaoEncarregado_Id = c.Decimal(precision: 9, scale: 0),
                        FasesCicloTratamento_Id = c.Decimal(precision: 9, scale: 0),
                        FinalidadeTratamento_Id = c.Decimal(precision: 9, scale: 0),
                        Operador_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_AGENTE_TRATAMENTO", t => t.AreaTratamentoDados_Id)
                .ForeignKey("ILA.ILA_CATEGORIA_TITULARES", t => t.CategoriasTitulares_Id)
                .ForeignKey("ILA.ILA_AGENTE_TRATAMENTO", t => t.Controlador_Id)
                .ForeignKey("ILA.ILA_AGENTE_TRATAMENTO", t => t.Encarregado_Id)
                .ForeignKey("ILA.ILA_AGENTE_TRATAMENTO", t => t.ExtensaoEncarregado_Id)
                .ForeignKey("ILA.ILA_FASES_CICLO_TRATAMENTO", t => t.FasesCicloTratamento_Id)
                .ForeignKey("ILA.ILA_FINALIDADE_TRATAMENTO", t => t.FinalidadeTratamento_Id)
                .ForeignKey("ILA.ILA_AGENTE_TRATAMENTO", t => t.Operador_Id)
                .Index(t => t.AreaTratamentoDados_Id)
                .Index(t => t.CategoriasTitulares_Id)
                .Index(t => t.Controlador_Id)
                .Index(t => t.Encarregado_Id)
                .Index(t => t.ExtensaoEncarregado_Id)
                .Index(t => t.FasesCicloTratamento_Id)
                .Index(t => t.FinalidadeTratamento_Id)
                .Index(t => t.Operador_Id);
            
            CreateTable(
                "ILA.ILA_AGENTE_TRATAMENTO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Nome = c.String(),
                        Area = c.String(),
                        Telefone = c.String(),
                        Email = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_CATEGORIA_TITULARES",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        CriancasAdolescentes_Id = c.Decimal(precision: 9, scale: 0),
                        OutrosGruposVulneraveis_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_TITULARES_EXTRA", t => t.CriancasAdolescentes_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_TITULARES_EXTRA", t => t.OutrosGruposVulneraveis_Id)
                .Index(t => t.CriancasAdolescentes_Id)
                .Index(t => t.OutrosGruposVulneraveis_Id);
            
            CreateTable(
                "ILA.ILA_ITEM_CAT_TITULARES",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        TipoCategoria_Value = c.String(),
                        Descricao = c.String(maxLength: 250),
                        CategoriasTitulares_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CATEGORIA_TITULARES", t => t.CategoriasTitulares_Id)
                .Index(t => t.CategoriasTitulares_Id);
            
            CreateTable(
                "ILA.ILA_ITEM_CAT_TITULARES_EXTRA",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        TrataDados = c.String(),
                        DescricaoDados = c.String(maxLength: 250),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_ITEM_COMPARTILH_DADOS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        NomeInstituicao = c.String(),
                        TipoCompDados_Value = c.String(),
                        NivelCompartilhamento_Value = c.String(),
                        DescricaoDadosCompartilhados = c.String(maxLength: 250),
                        FinalidadeComp_Value = c.String(),
                        DescricaoFinalidadeComp = c.String(maxLength: 250),
                        Case_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CASES", t => t.Case_Id)
                .Index(t => t.Case_Id);
            
            CreateTable(
                "ILA.ILA_ITEM_CONTRATO_TI",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        NumeroContrato = c.String(),
                        NumeroProcessoContratacao = c.String(),
                        ObjetoContrato = c.String(),
                        EmailGestorContrato = c.String(),
                        Case_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CASES", t => t.Case_Id)
                .Index(t => t.Case_Id);
            
            CreateTable(
                "ILA.ILA_FASES_CICLO_TRATAMENTO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Coleta = c.Decimal(nullable: false, precision: 1, scale: 0),
                        Retencao = c.Decimal(nullable: false, precision: 1, scale: 0),
                        Processamento = c.Decimal(nullable: false, precision: 1, scale: 0),
                        Compartilhamento = c.Decimal(nullable: false, precision: 1, scale: 0),
                        Eliminacao = c.Decimal(nullable: false, precision: 1, scale: 0),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_FINALIDADE_TRATAMENTO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        HipoteseTratamento_Value = c.String(),
                        DescricaoFinalidade = c.String(),
                        PrevisaoLegal = c.String(),
                        ResultadosTitular = c.String(),
                        BeneficiosEsperados = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Descricao = c.String(),
                        TempoRetencao_Value = c.String(),
                        FonteRetencao_Value = c.String(),
                        LocalArmazenamento = c.String(),
                        CategoriaDadosPessoais = c.Decimal(nullable: false, precision: 9, scale: 0),
                        Case_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CASES", t => t.Case_Id)
                .Index(t => t.Case_Id);
            
            CreateTable(
                "ILA.ILA_ITEM_MEDIDA_SEG_PRIV",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Tipo_Value = c.String(),
                        Descricao = c.String(),
                        Case_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CASES", t => t.Case_Id)
                .Index(t => t.Case_Id);
            
            CreateTable(
                "ILA.ILA_ITEM_OBS_PROCESSO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        DescricaoObs = c.String(),
                        Case_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CASES", t => t.Case_Id)
                .Index(t => t.Case_Id);
            
            CreateTable(
                "ILA.ILA_ITEM_RISCO_PRIVACIDADE",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        TipoRisco_Value = c.String(),
                        Observacoes = c.String(),
                        Case_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CASES", t => t.Case_Id)
                .Index(t => t.Case_Id);
            
            CreateTable(
                "ILA.ILA_ITEM_TRANSF_INTERNACIONAL",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        NomeOrganizacao = c.String(),
                        Pais = c.String(),
                        DadosTransferidos = c.String(),
                        TipoGarantia = c.String(maxLength: 250),
                        Case_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CASES", t => t.Case_Id)
                .Index(t => t.Case_Id);
            
            CreateTable(
                "ILA.ILA_CHANGELOGS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        UserId = c.Decimal(nullable: false, precision: 9, scale: 0),
                        UsernameResp = c.String(),
                        CaseId = c.Decimal(nullable: false, precision: 9, scale: 0),
                        CaseRef = c.String(),
                        ChangeDate = c.DateTime(nullable: false),
                        CaseDiff = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_USERS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Username = c.String(maxLength: 2000),
                        IsComite = c.Decimal(nullable: false, precision: 1, scale: 0),
                        IsDPO = c.Decimal(nullable: false, precision: 1, scale: 0),
                        IsSystem = c.Decimal(nullable: false, precision: 1, scale: 0),
                        OriginGroup_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_GROUPS", t => t.OriginGroup_Id)
                .Index(t => t.OriginGroup_Id);
            
            CreateTable(
                "ILA.ILA_GROUP_ACCESS_EXPIRATIONS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        ExpirationDate = c.DateTime(nullable: false),
                        Group_Id = c.Decimal(precision: 9, scale: 0),
                        User_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_GROUPS", t => t.Group_Id)
                .ForeignKey("ILA.ILA_USERS", t => t.User_Id)
                .Index(t => t.Group_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("ILA.ILA_USERS", "OriginGroup_Id", "ILA.ILA_GROUPS");
            DropForeignKey("ILA.ILA_GROUP_ACCESS_EXPIRATIONS", "User_Id", "ILA.ILA_USERS");
            DropForeignKey("ILA.ILA_GROUP_ACCESS_EXPIRATIONS", "Group_Id", "ILA.ILA_GROUPS");
            DropForeignKey("ILA.ILA_ITEM_TRANSF_INTERNACIONAL", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_RISCO_PRIVACIDADE", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_CASES", "Operador_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_ITEM_OBS_PROCESSO", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_MEDIDA_SEG_PRIV", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_CASES", "FinalidadeTratamento_Id", "ILA.ILA_FINALIDADE_TRATAMENTO");
            DropForeignKey("ILA.ILA_CASES", "FasesCicloTratamento_Id", "ILA.ILA_FASES_CICLO_TRATAMENTO");
            DropForeignKey("ILA.ILA_CASES", "ExtensaoEncarregado_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_CASES", "Encarregado_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_CASES", "Controlador_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_ITEM_CONTRATO_TI", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_COMPARTILH_DADOS", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_CASES", "CategoriasTitulares_Id", "ILA.ILA_CATEGORIA_TITULARES");
            DropForeignKey("ILA.ILA_CATEGORIA_TITULARES", "OutrosGruposVulneraveis_Id", "ILA.ILA_ITEM_CAT_TITULARES_EXTRA");
            DropForeignKey("ILA.ILA_CATEGORIA_TITULARES", "CriancasAdolescentes_Id", "ILA.ILA_ITEM_CAT_TITULARES_EXTRA");
            DropForeignKey("ILA.ILA_ITEM_CAT_TITULARES", "CategoriasTitulares_Id", "ILA.ILA_CATEGORIA_TITULARES");
            DropForeignKey("ILA.ILA_CASES", "AreaTratamentoDados_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_GROUPS", "AccessRequest_Id", "ILA.ILA_ACCESS_REQUESTS");
            DropIndex("ILA.ILA_GROUP_ACCESS_EXPIRATIONS", new[] { "User_Id" });
            DropIndex("ILA.ILA_GROUP_ACCESS_EXPIRATIONS", new[] { "Group_Id" });
            DropIndex("ILA.ILA_USERS", new[] { "OriginGroup_Id" });
            DropIndex("ILA.ILA_ITEM_TRANSF_INTERNACIONAL", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_RISCO_PRIVACIDADE", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_OBS_PROCESSO", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_MEDIDA_SEG_PRIV", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_CONTRATO_TI", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_COMPARTILH_DADOS", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_TITULARES", new[] { "CategoriasTitulares_Id" });
            DropIndex("ILA.ILA_CATEGORIA_TITULARES", new[] { "OutrosGruposVulneraveis_Id" });
            DropIndex("ILA.ILA_CATEGORIA_TITULARES", new[] { "CriancasAdolescentes_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Operador_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "FinalidadeTratamento_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "FasesCicloTratamento_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "ExtensaoEncarregado_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Encarregado_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Controlador_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "CategoriasTitulares_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "AreaTratamentoDados_Id" });
            DropIndex("ILA.ILA_GROUPS", new[] { "AccessRequest_Id" });
            DropTable("ILA.ILA_GROUP_ACCESS_EXPIRATIONS");
            DropTable("ILA.ILA_USERS");
            DropTable("ILA.ILA_CHANGELOGS");
            DropTable("ILA.ILA_ITEM_TRANSF_INTERNACIONAL");
            DropTable("ILA.ILA_ITEM_RISCO_PRIVACIDADE");
            DropTable("ILA.ILA_ITEM_OBS_PROCESSO");
            DropTable("ILA.ILA_ITEM_MEDIDA_SEG_PRIV");
            DropTable("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropTable("ILA.ILA_FINALIDADE_TRATAMENTO");
            DropTable("ILA.ILA_FASES_CICLO_TRATAMENTO");
            DropTable("ILA.ILA_ITEM_CONTRATO_TI");
            DropTable("ILA.ILA_ITEM_COMPARTILH_DADOS");
            DropTable("ILA.ILA_ITEM_CAT_TITULARES_EXTRA");
            DropTable("ILA.ILA_ITEM_CAT_TITULARES");
            DropTable("ILA.ILA_CATEGORIA_TITULARES");
            DropTable("ILA.ILA_AGENTE_TRATAMENTO");
            DropTable("ILA.ILA_CASES");
            DropTable("ILA.ILA_GROUPS");
            DropTable("ILA.ILA_ACCESS_REQUESTS");
        }
    }
}

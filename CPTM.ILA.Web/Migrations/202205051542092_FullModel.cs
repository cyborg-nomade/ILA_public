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
                        Nome = c.String(),
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
                        Nome = c.String(maxLength: 250),
                        Area = c.String(),
                        DataCriacao = c.DateTime(nullable: false),
                        DataAtualizacao = c.DateTime(nullable: false),
                        GrupoCriadorId = c.Decimal(nullable: false, precision: 9, scale: 0),
                        Aprovado = c.Decimal(nullable: false, precision: 1, scale: 0),
                        EncaminhadoAprovacao = c.Decimal(nullable: false, precision: 1, scale: 0),
                        DadosPessoaisSensiveis = c.Decimal(nullable: false, precision: 1, scale: 0),
                        DescricaoFluxoTratamento = c.String(),
                        AbrangenciaGeografica_Value = c.String(),
                        FonteDados = c.String(),
                        FrequenciaTratamento_Value = c.String(),
                        QtdeDadosTratados = c.Decimal(nullable: false, precision: 9, scale: 0),
                        QtdeDadosSensiveisTratados = c.Decimal(nullable: false, precision: 9, scale: 0),
                        AreaTratamentoDados_Id = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id = c.Decimal(precision: 9, scale: 0),
                        CategoriaDadosPessoais_Id = c.Decimal(precision: 9, scale: 0),
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
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id)
                .ForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", t => t.CategoriaDadosPessoais_Id)
                .ForeignKey("ILA.ILA_CATEGORIA_TITULARES", t => t.CategoriasTitulares_Id)
                .ForeignKey("ILA.ILA_AGENTE_TRATAMENTO", t => t.Controlador_Id)
                .ForeignKey("ILA.ILA_AGENTE_TRATAMENTO", t => t.Encarregado_Id)
                .ForeignKey("ILA.ILA_AGENTE_TRATAMENTO", t => t.ExtensaoEncarregado_Id)
                .ForeignKey("ILA.ILA_FASES_CICLO_TRATAMENTO", t => t.FasesCicloTratamento_Id)
                .ForeignKey("ILA.ILA_FINALIDADE_TRATAMENTO", t => t.FinalidadeTratamento_Id)
                .ForeignKey("ILA.ILA_AGENTE_TRATAMENTO", t => t.Operador_Id)
                .Index(t => t.AreaTratamentoDados_Id)
                .Index(t => t.CatDadosPessoaisSensiveis_Id)
                .Index(t => t.CategoriaDadosPessoais_Id)
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
                "ILA.ILA_CAT_DADOS_PESSOAIS_SENS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
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
                        CatDadosPessoaisSensiveis_Id = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id1 = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id2 = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id3 = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id4 = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id5 = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id6 = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id7 = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id8 = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id9 = c.Decimal(precision: 9, scale: 0),
                        Associacoes_Id = c.Decimal(precision: 9, scale: 0),
                        Caracteristicas_Id = c.Decimal(precision: 9, scale: 0),
                        Caracteristicas_Id1 = c.Decimal(precision: 9, scale: 0),
                        Caracteristicas_Id2 = c.Decimal(precision: 9, scale: 0),
                        Caracteristicas_Id3 = c.Decimal(precision: 9, scale: 0),
                        CaracteristicasPsicologicas_Id = c.Decimal(precision: 9, scale: 0),
                        ComposicaoFamiliar_Id = c.Decimal(precision: 9, scale: 0),
                        ComposicaoFamiliar_Id1 = c.Decimal(precision: 9, scale: 0),
                        ComposicaoFamiliar_Id2 = c.Decimal(precision: 9, scale: 0),
                        EducacaoTreinamento_Id = c.Decimal(precision: 9, scale: 0),
                        EducacaoTreinamento_Id1 = c.Decimal(precision: 9, scale: 0),
                        EducacaoTreinamento_Id2 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id1 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id2 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id3 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id4 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id5 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id6 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id7 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id8 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id9 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id10 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id11 = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id12 = c.Decimal(precision: 9, scale: 0),
                        Habitos_Id = c.Decimal(precision: 9, scale: 0),
                        Habitos_Id1 = c.Decimal(precision: 9, scale: 0),
                        Habitos_Id2 = c.Decimal(precision: 9, scale: 0),
                        Habitos_Id3 = c.Decimal(precision: 9, scale: 0),
                        Habitos_Id4 = c.Decimal(precision: 9, scale: 0),
                        Habitos_Id5 = c.Decimal(precision: 9, scale: 0),
                        Habitos_Id6 = c.Decimal(precision: 9, scale: 0),
                        Habitos_Id7 = c.Decimal(precision: 9, scale: 0),
                        HabitosConsumo_Id = c.Decimal(precision: 9, scale: 0),
                        Identificacao_Id = c.Decimal(precision: 9, scale: 0),
                        Identificacao_Id1 = c.Decimal(precision: 9, scale: 0),
                        Identificacao_Id2 = c.Decimal(precision: 9, scale: 0),
                        Identificacao_Id3 = c.Decimal(precision: 9, scale: 0),
                        InteressesLazer_Id = c.Decimal(precision: 9, scale: 0),
                        Outros_Id = c.Decimal(precision: 9, scale: 0),
                        ProcessoJudAdmCrim_Id = c.Decimal(precision: 9, scale: 0),
                        ProcessoJudAdmCrim_Id1 = c.Decimal(precision: 9, scale: 0),
                        ProcessoJudAdmCrim_Id2 = c.Decimal(precision: 9, scale: 0),
                        ProcessoJudAdmCrim_Id3 = c.Decimal(precision: 9, scale: 0),
                        ProfissaoEmprego_Id = c.Decimal(precision: 9, scale: 0),
                        ProfissaoEmprego_Id1 = c.Decimal(precision: 9, scale: 0),
                        ProfissaoEmprego_Id2 = c.Decimal(precision: 9, scale: 0),
                        ProfissaoEmprego_Id3 = c.Decimal(precision: 9, scale: 0),
                        ProfissaoEmprego_Id4 = c.Decimal(precision: 9, scale: 0),
                        ProfissaoEmprego_Id5 = c.Decimal(precision: 9, scale: 0),
                        RegVideoImgVoz_Id = c.Decimal(precision: 9, scale: 0),
                        RegVideoImgVoz_Id1 = c.Decimal(precision: 9, scale: 0),
                        RegVideoImgVoz_Id2 = c.Decimal(precision: 9, scale: 0),
                        Residenciais_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id1)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id2)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id3)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id4)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id5)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id6)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id7)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id8)
                .ForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", t => t.CatDadosPessoaisSensiveis_Id9)
                .ForeignKey("ILA.ILA_ASSOCIACOES", t => t.Associacoes_Id)
                .ForeignKey("ILA.ILA_CARACTERISTICAS", t => t.Caracteristicas_Id)
                .ForeignKey("ILA.ILA_CARACTERISTICAS", t => t.Caracteristicas_Id1)
                .ForeignKey("ILA.ILA_CARACTERISTICAS", t => t.Caracteristicas_Id2)
                .ForeignKey("ILA.ILA_CARACTERISTICAS", t => t.Caracteristicas_Id3)
                .ForeignKey("ILA.ILA_CARAC_PSICOLOGICAS", t => t.CaracteristicasPsicologicas_Id)
                .ForeignKey("ILA.ILA_COMPOSICAO_FAMILIAR", t => t.ComposicaoFamiliar_Id)
                .ForeignKey("ILA.ILA_COMPOSICAO_FAMILIAR", t => t.ComposicaoFamiliar_Id1)
                .ForeignKey("ILA.ILA_COMPOSICAO_FAMILIAR", t => t.ComposicaoFamiliar_Id2)
                .ForeignKey("ILA.ILA_EDUCACAO_TREINAMENTO", t => t.EducacaoTreinamento_Id)
                .ForeignKey("ILA.ILA_EDUCACAO_TREINAMENTO", t => t.EducacaoTreinamento_Id1)
                .ForeignKey("ILA.ILA_EDUCACAO_TREINAMENTO", t => t.EducacaoTreinamento_Id2)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id1)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id2)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id3)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id4)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id5)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id6)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id7)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id8)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id9)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id10)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id11)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id12)
                .ForeignKey("ILA.ILA_HABITOS", t => t.Habitos_Id)
                .ForeignKey("ILA.ILA_HABITOS", t => t.Habitos_Id1)
                .ForeignKey("ILA.ILA_HABITOS", t => t.Habitos_Id2)
                .ForeignKey("ILA.ILA_HABITOS", t => t.Habitos_Id3)
                .ForeignKey("ILA.ILA_HABITOS", t => t.Habitos_Id4)
                .ForeignKey("ILA.ILA_HABITOS", t => t.Habitos_Id5)
                .ForeignKey("ILA.ILA_HABITOS", t => t.Habitos_Id6)
                .ForeignKey("ILA.ILA_HABITOS", t => t.Habitos_Id7)
                .ForeignKey("ILA.ILA_HABITOS_CONSUMO", t => t.HabitosConsumo_Id)
                .ForeignKey("ILA.ILA_IDENTIFICACAO", t => t.Identificacao_Id)
                .ForeignKey("ILA.ILA_IDENTIFICACAO", t => t.Identificacao_Id1)
                .ForeignKey("ILA.ILA_IDENTIFICACAO", t => t.Identificacao_Id2)
                .ForeignKey("ILA.ILA_IDENTIFICACAO", t => t.Identificacao_Id3)
                .ForeignKey("ILA.ILA_INTERESSES_LAZER", t => t.InteressesLazer_Id)
                .ForeignKey("ILA.ILA_OUTROS", t => t.Outros_Id)
                .ForeignKey("ILA.ILA_PROCESSO_JUD_ADM_CRIM", t => t.ProcessoJudAdmCrim_Id)
                .ForeignKey("ILA.ILA_PROCESSO_JUD_ADM_CRIM", t => t.ProcessoJudAdmCrim_Id1)
                .ForeignKey("ILA.ILA_PROCESSO_JUD_ADM_CRIM", t => t.ProcessoJudAdmCrim_Id2)
                .ForeignKey("ILA.ILA_PROCESSO_JUD_ADM_CRIM", t => t.ProcessoJudAdmCrim_Id3)
                .ForeignKey("ILA.ILA_PROFISSAO_EMPREGO", t => t.ProfissaoEmprego_Id)
                .ForeignKey("ILA.ILA_PROFISSAO_EMPREGO", t => t.ProfissaoEmprego_Id1)
                .ForeignKey("ILA.ILA_PROFISSAO_EMPREGO", t => t.ProfissaoEmprego_Id2)
                .ForeignKey("ILA.ILA_PROFISSAO_EMPREGO", t => t.ProfissaoEmprego_Id3)
                .ForeignKey("ILA.ILA_PROFISSAO_EMPREGO", t => t.ProfissaoEmprego_Id4)
                .ForeignKey("ILA.ILA_PROFISSAO_EMPREGO", t => t.ProfissaoEmprego_Id5)
                .ForeignKey("ILA.ILA_REG_VIDEO_IMG_VOZ", t => t.RegVideoImgVoz_Id)
                .ForeignKey("ILA.ILA_REG_VIDEO_IMG_VOZ", t => t.RegVideoImgVoz_Id1)
                .ForeignKey("ILA.ILA_REG_VIDEO_IMG_VOZ", t => t.RegVideoImgVoz_Id2)
                .ForeignKey("ILA.ILA_RESIDENCIAIS", t => t.Residenciais_Id)
                .Index(t => t.CatDadosPessoaisSensiveis_Id)
                .Index(t => t.CatDadosPessoaisSensiveis_Id1)
                .Index(t => t.CatDadosPessoaisSensiveis_Id2)
                .Index(t => t.CatDadosPessoaisSensiveis_Id3)
                .Index(t => t.CatDadosPessoaisSensiveis_Id4)
                .Index(t => t.CatDadosPessoaisSensiveis_Id5)
                .Index(t => t.CatDadosPessoaisSensiveis_Id6)
                .Index(t => t.CatDadosPessoaisSensiveis_Id7)
                .Index(t => t.CatDadosPessoaisSensiveis_Id8)
                .Index(t => t.CatDadosPessoaisSensiveis_Id9)
                .Index(t => t.Associacoes_Id)
                .Index(t => t.Caracteristicas_Id)
                .Index(t => t.Caracteristicas_Id1)
                .Index(t => t.Caracteristicas_Id2)
                .Index(t => t.Caracteristicas_Id3)
                .Index(t => t.CaracteristicasPsicologicas_Id)
                .Index(t => t.ComposicaoFamiliar_Id)
                .Index(t => t.ComposicaoFamiliar_Id1)
                .Index(t => t.ComposicaoFamiliar_Id2)
                .Index(t => t.EducacaoTreinamento_Id)
                .Index(t => t.EducacaoTreinamento_Id1)
                .Index(t => t.EducacaoTreinamento_Id2)
                .Index(t => t.Financeiros_Id)
                .Index(t => t.Financeiros_Id1)
                .Index(t => t.Financeiros_Id2)
                .Index(t => t.Financeiros_Id3)
                .Index(t => t.Financeiros_Id4)
                .Index(t => t.Financeiros_Id5)
                .Index(t => t.Financeiros_Id6)
                .Index(t => t.Financeiros_Id7)
                .Index(t => t.Financeiros_Id8)
                .Index(t => t.Financeiros_Id9)
                .Index(t => t.Financeiros_Id10)
                .Index(t => t.Financeiros_Id11)
                .Index(t => t.Financeiros_Id12)
                .Index(t => t.Habitos_Id)
                .Index(t => t.Habitos_Id1)
                .Index(t => t.Habitos_Id2)
                .Index(t => t.Habitos_Id3)
                .Index(t => t.Habitos_Id4)
                .Index(t => t.Habitos_Id5)
                .Index(t => t.Habitos_Id6)
                .Index(t => t.Habitos_Id7)
                .Index(t => t.HabitosConsumo_Id)
                .Index(t => t.Identificacao_Id)
                .Index(t => t.Identificacao_Id1)
                .Index(t => t.Identificacao_Id2)
                .Index(t => t.Identificacao_Id3)
                .Index(t => t.InteressesLazer_Id)
                .Index(t => t.Outros_Id)
                .Index(t => t.ProcessoJudAdmCrim_Id)
                .Index(t => t.ProcessoJudAdmCrim_Id1)
                .Index(t => t.ProcessoJudAdmCrim_Id2)
                .Index(t => t.ProcessoJudAdmCrim_Id3)
                .Index(t => t.ProfissaoEmprego_Id)
                .Index(t => t.ProfissaoEmprego_Id1)
                .Index(t => t.ProfissaoEmprego_Id2)
                .Index(t => t.ProfissaoEmprego_Id3)
                .Index(t => t.ProfissaoEmprego_Id4)
                .Index(t => t.ProfissaoEmprego_Id5)
                .Index(t => t.RegVideoImgVoz_Id)
                .Index(t => t.RegVideoImgVoz_Id1)
                .Index(t => t.RegVideoImgVoz_Id2)
                .Index(t => t.Residenciais_Id);
            
            CreateTable(
                "ILA.ILA_CATEGORIA_DADOS_PESSOAIS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Associacoes_Id = c.Decimal(precision: 9, scale: 0),
                        Caracteristicas_Id = c.Decimal(precision: 9, scale: 0),
                        CaracteristicasPsicologicas_Id = c.Decimal(precision: 9, scale: 0),
                        ComposicaoFamiliar_Id = c.Decimal(precision: 9, scale: 0),
                        EducacaoTreinamento_Id = c.Decimal(precision: 9, scale: 0),
                        Financeiros_Id = c.Decimal(precision: 9, scale: 0),
                        Habitos_Id = c.Decimal(precision: 9, scale: 0),
                        HabitosConsumo_Id = c.Decimal(precision: 9, scale: 0),
                        Identificacao_Id = c.Decimal(precision: 9, scale: 0),
                        InteressesLazer_Id = c.Decimal(precision: 9, scale: 0),
                        Outros_Id = c.Decimal(precision: 9, scale: 0),
                        ProcessoJudAdmCrim_Id = c.Decimal(precision: 9, scale: 0),
                        ProfissaoEmprego_Id = c.Decimal(precision: 9, scale: 0),
                        RegVideoImgVoz_Id = c.Decimal(precision: 9, scale: 0),
                        Residenciais_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ASSOCIACOES", t => t.Associacoes_Id)
                .ForeignKey("ILA.ILA_CARACTERISTICAS", t => t.Caracteristicas_Id)
                .ForeignKey("ILA.ILA_CARAC_PSICOLOGICAS", t => t.CaracteristicasPsicologicas_Id)
                .ForeignKey("ILA.ILA_COMPOSICAO_FAMILIAR", t => t.ComposicaoFamiliar_Id)
                .ForeignKey("ILA.ILA_EDUCACAO_TREINAMENTO", t => t.EducacaoTreinamento_Id)
                .ForeignKey("ILA.ILA_FINANCEIROS", t => t.Financeiros_Id)
                .ForeignKey("ILA.ILA_HABITOS", t => t.Habitos_Id)
                .ForeignKey("ILA.ILA_HABITOS_CONSUMO", t => t.HabitosConsumo_Id)
                .ForeignKey("ILA.ILA_IDENTIFICACAO", t => t.Identificacao_Id)
                .ForeignKey("ILA.ILA_INTERESSES_LAZER", t => t.InteressesLazer_Id)
                .ForeignKey("ILA.ILA_OUTROS", t => t.Outros_Id)
                .ForeignKey("ILA.ILA_PROCESSO_JUD_ADM_CRIM", t => t.ProcessoJudAdmCrim_Id)
                .ForeignKey("ILA.ILA_PROFISSAO_EMPREGO", t => t.ProfissaoEmprego_Id)
                .ForeignKey("ILA.ILA_REG_VIDEO_IMG_VOZ", t => t.RegVideoImgVoz_Id)
                .ForeignKey("ILA.ILA_RESIDENCIAIS", t => t.Residenciais_Id)
                .Index(t => t.Associacoes_Id)
                .Index(t => t.Caracteristicas_Id)
                .Index(t => t.CaracteristicasPsicologicas_Id)
                .Index(t => t.ComposicaoFamiliar_Id)
                .Index(t => t.EducacaoTreinamento_Id)
                .Index(t => t.Financeiros_Id)
                .Index(t => t.Habitos_Id)
                .Index(t => t.HabitosConsumo_Id)
                .Index(t => t.Identificacao_Id)
                .Index(t => t.InteressesLazer_Id)
                .Index(t => t.Outros_Id)
                .Index(t => t.ProcessoJudAdmCrim_Id)
                .Index(t => t.ProfissaoEmprego_Id)
                .Index(t => t.RegVideoImgVoz_Id)
                .Index(t => t.Residenciais_Id);
            
            CreateTable(
                "ILA.ILA_ASSOCIACOES",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_CARACTERISTICAS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_CARAC_PSICOLOGICAS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_COMPOSICAO_FAMILIAR",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_EDUCACAO_TREINAMENTO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_FINANCEIROS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_HABITOS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_HABITOS_CONSUMO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_IDENTIFICACAO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_INTERESSES_LAZER",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_OUTROS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_PROCESSO_JUD_ADM_CRIM",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_PROFISSAO_EMPREGO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_REG_VIDEO_IMG_VOZ",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_RESIDENCIAIS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
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
                        CaseId = c.Decimal(nullable: false, precision: 9, scale: 0),
                        ChangeDate = c.DateTime(nullable: false),
                        CaseDiff = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_USERS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Username = c.String(),
                        IsComite = c.Decimal(nullable: false, precision: 1, scale: 0),
                        IsDPO = c.Decimal(nullable: false, precision: 1, scale: 0),
                        IsSystem = c.Decimal(nullable: false, precision: 1, scale: 0),
                        OriginGroup_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_GROUPS", t => t.OriginGroup_Id)
                .Index(t => t.OriginGroup_Id);
            
            CreateTable(
                "ILA.ILA_GROUP_ACCESS_REQUESTS",
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
            DropForeignKey("ILA.ILA_GROUP_ACCESS_REQUESTS", "User_Id", "ILA.ILA_USERS");
            DropForeignKey("ILA.ILA_GROUP_ACCESS_REQUESTS", "Group_Id", "ILA.ILA_GROUPS");
            DropForeignKey("ILA.ILA_ITEM_TRANSF_INTERNACIONAL", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_RISCO_PRIVACIDADE", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_CASES", "Operador_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_ITEM_OBS_PROCESSO", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_MEDIDA_SEG_PRIV", "Case_Id", "ILA.ILA_CASES");
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
            DropForeignKey("ILA.ILA_CASES", "CategoriaDadosPessoais_Id", "ILA.ILA_CATEGORIA_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Residenciais_Id", "ILA.ILA_RESIDENCIAIS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Residenciais_Id", "ILA.ILA_RESIDENCIAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "RegVideoImgVoz_Id", "ILA.ILA_REG_VIDEO_IMG_VOZ");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "RegVideoImgVoz_Id2", "ILA.ILA_REG_VIDEO_IMG_VOZ");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "RegVideoImgVoz_Id1", "ILA.ILA_REG_VIDEO_IMG_VOZ");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "RegVideoImgVoz_Id", "ILA.ILA_REG_VIDEO_IMG_VOZ");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "ProfissaoEmprego_Id", "ILA.ILA_PROFISSAO_EMPREGO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProfissaoEmprego_Id5", "ILA.ILA_PROFISSAO_EMPREGO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProfissaoEmprego_Id4", "ILA.ILA_PROFISSAO_EMPREGO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProfissaoEmprego_Id3", "ILA.ILA_PROFISSAO_EMPREGO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProfissaoEmprego_Id2", "ILA.ILA_PROFISSAO_EMPREGO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProfissaoEmprego_Id1", "ILA.ILA_PROFISSAO_EMPREGO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProfissaoEmprego_Id", "ILA.ILA_PROFISSAO_EMPREGO");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "ProcessoJudAdmCrim_Id", "ILA.ILA_PROCESSO_JUD_ADM_CRIM");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProcessoJudAdmCrim_Id3", "ILA.ILA_PROCESSO_JUD_ADM_CRIM");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProcessoJudAdmCrim_Id2", "ILA.ILA_PROCESSO_JUD_ADM_CRIM");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProcessoJudAdmCrim_Id1", "ILA.ILA_PROCESSO_JUD_ADM_CRIM");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ProcessoJudAdmCrim_Id", "ILA.ILA_PROCESSO_JUD_ADM_CRIM");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Outros_Id", "ILA.ILA_OUTROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Outros_Id", "ILA.ILA_OUTROS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "InteressesLazer_Id", "ILA.ILA_INTERESSES_LAZER");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "InteressesLazer_Id", "ILA.ILA_INTERESSES_LAZER");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Identificacao_Id", "ILA.ILA_IDENTIFICACAO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Identificacao_Id3", "ILA.ILA_IDENTIFICACAO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Identificacao_Id2", "ILA.ILA_IDENTIFICACAO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Identificacao_Id1", "ILA.ILA_IDENTIFICACAO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Identificacao_Id", "ILA.ILA_IDENTIFICACAO");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "HabitosConsumo_Id", "ILA.ILA_HABITOS_CONSUMO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "HabitosConsumo_Id", "ILA.ILA_HABITOS_CONSUMO");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Habitos_Id", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Habitos_Id7", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Habitos_Id6", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Habitos_Id5", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Habitos_Id4", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Habitos_Id3", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Habitos_Id2", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Habitos_Id1", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Habitos_Id", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Financeiros_Id", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id12", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id11", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id10", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id9", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id8", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id7", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id6", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id5", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id4", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id3", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id2", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id1", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Financeiros_Id", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "EducacaoTreinamento_Id", "ILA.ILA_EDUCACAO_TREINAMENTO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "EducacaoTreinamento_Id2", "ILA.ILA_EDUCACAO_TREINAMENTO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "EducacaoTreinamento_Id1", "ILA.ILA_EDUCACAO_TREINAMENTO");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "EducacaoTreinamento_Id", "ILA.ILA_EDUCACAO_TREINAMENTO");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "ComposicaoFamiliar_Id", "ILA.ILA_COMPOSICAO_FAMILIAR");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ComposicaoFamiliar_Id2", "ILA.ILA_COMPOSICAO_FAMILIAR");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ComposicaoFamiliar_Id1", "ILA.ILA_COMPOSICAO_FAMILIAR");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "ComposicaoFamiliar_Id", "ILA.ILA_COMPOSICAO_FAMILIAR");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "CaracteristicasPsicologicas_Id", "ILA.ILA_CARAC_PSICOLOGICAS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CaracteristicasPsicologicas_Id", "ILA.ILA_CARAC_PSICOLOGICAS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Caracteristicas_Id", "ILA.ILA_CARACTERISTICAS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Caracteristicas_Id3", "ILA.ILA_CARACTERISTICAS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Caracteristicas_Id2", "ILA.ILA_CARACTERISTICAS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Caracteristicas_Id1", "ILA.ILA_CARACTERISTICAS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Caracteristicas_Id", "ILA.ILA_CARACTERISTICAS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Associacoes_Id", "ILA.ILA_ASSOCIACOES");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Associacoes_Id", "ILA.ILA_ASSOCIACOES");
            DropForeignKey("ILA.ILA_CASES", "CatDadosPessoaisSensiveis_Id", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id9", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id8", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id7", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id6", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id5", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id4", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id3", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id2", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id1", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "CatDadosPessoaisSensiveis_Id", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_CASES", "AreaTratamentoDados_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_GROUPS", "AccessRequest_Id", "ILA.ILA_ACCESS_REQUESTS");
            DropIndex("ILA.ILA_GROUP_ACCESS_REQUESTS", new[] { "User_Id" });
            DropIndex("ILA.ILA_GROUP_ACCESS_REQUESTS", new[] { "Group_Id" });
            DropIndex("ILA.ILA_USERS", new[] { "OriginGroup_Id" });
            DropIndex("ILA.ILA_ITEM_TRANSF_INTERNACIONAL", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_RISCO_PRIVACIDADE", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_OBS_PROCESSO", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_MEDIDA_SEG_PRIV", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_CONTRATO_TI", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_COMPARTILH_DADOS", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_TITULARES", new[] { "CategoriasTitulares_Id" });
            DropIndex("ILA.ILA_CATEGORIA_TITULARES", new[] { "OutrosGruposVulneraveis_Id" });
            DropIndex("ILA.ILA_CATEGORIA_TITULARES", new[] { "CriancasAdolescentes_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "Residenciais_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "RegVideoImgVoz_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "ProfissaoEmprego_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "ProcessoJudAdmCrim_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "Outros_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "InteressesLazer_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "Identificacao_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "HabitosConsumo_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "Habitos_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "Financeiros_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "EducacaoTreinamento_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "ComposicaoFamiliar_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "CaracteristicasPsicologicas_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "Caracteristicas_Id" });
            DropIndex("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", new[] { "Associacoes_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Residenciais_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "RegVideoImgVoz_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "RegVideoImgVoz_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "RegVideoImgVoz_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProfissaoEmprego_Id5" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProfissaoEmprego_Id4" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProfissaoEmprego_Id3" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProfissaoEmprego_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProfissaoEmprego_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProfissaoEmprego_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProcessoJudAdmCrim_Id3" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProcessoJudAdmCrim_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProcessoJudAdmCrim_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ProcessoJudAdmCrim_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Outros_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "InteressesLazer_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Identificacao_Id3" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Identificacao_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Identificacao_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Identificacao_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "HabitosConsumo_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Habitos_Id7" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Habitos_Id6" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Habitos_Id5" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Habitos_Id4" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Habitos_Id3" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Habitos_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Habitos_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Habitos_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id12" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id11" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id10" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id9" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id8" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id7" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id6" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id5" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id4" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id3" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Financeiros_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "EducacaoTreinamento_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "EducacaoTreinamento_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "EducacaoTreinamento_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ComposicaoFamiliar_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ComposicaoFamiliar_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "ComposicaoFamiliar_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CaracteristicasPsicologicas_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Caracteristicas_Id3" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Caracteristicas_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Caracteristicas_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Caracteristicas_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Associacoes_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id9" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id8" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id7" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id6" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id5" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id4" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id3" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "CatDadosPessoaisSensiveis_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Operador_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "FinalidadeTratamento_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "FasesCicloTratamento_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "ExtensaoEncarregado_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Encarregado_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Controlador_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "CategoriasTitulares_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "CategoriaDadosPessoais_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "CatDadosPessoaisSensiveis_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "AreaTratamentoDados_Id" });
            DropIndex("ILA.ILA_GROUPS", new[] { "AccessRequest_Id" });
            DropTable("ILA.ILA_GROUP_ACCESS_REQUESTS");
            DropTable("ILA.ILA_USERS");
            DropTable("ILA.ILA_CHANGELOGS");
            DropTable("ILA.ILA_ITEM_TRANSF_INTERNACIONAL");
            DropTable("ILA.ILA_ITEM_RISCO_PRIVACIDADE");
            DropTable("ILA.ILA_ITEM_OBS_PROCESSO");
            DropTable("ILA.ILA_ITEM_MEDIDA_SEG_PRIV");
            DropTable("ILA.ILA_FINALIDADE_TRATAMENTO");
            DropTable("ILA.ILA_FASES_CICLO_TRATAMENTO");
            DropTable("ILA.ILA_ITEM_CONTRATO_TI");
            DropTable("ILA.ILA_ITEM_COMPARTILH_DADOS");
            DropTable("ILA.ILA_ITEM_CAT_TITULARES_EXTRA");
            DropTable("ILA.ILA_ITEM_CAT_TITULARES");
            DropTable("ILA.ILA_CATEGORIA_TITULARES");
            DropTable("ILA.ILA_RESIDENCIAIS");
            DropTable("ILA.ILA_REG_VIDEO_IMG_VOZ");
            DropTable("ILA.ILA_PROFISSAO_EMPREGO");
            DropTable("ILA.ILA_PROCESSO_JUD_ADM_CRIM");
            DropTable("ILA.ILA_OUTROS");
            DropTable("ILA.ILA_INTERESSES_LAZER");
            DropTable("ILA.ILA_IDENTIFICACAO");
            DropTable("ILA.ILA_HABITOS_CONSUMO");
            DropTable("ILA.ILA_HABITOS");
            DropTable("ILA.ILA_FINANCEIROS");
            DropTable("ILA.ILA_EDUCACAO_TREINAMENTO");
            DropTable("ILA.ILA_COMPOSICAO_FAMILIAR");
            DropTable("ILA.ILA_CARAC_PSICOLOGICAS");
            DropTable("ILA.ILA_CARACTERISTICAS");
            DropTable("ILA.ILA_ASSOCIACOES");
            DropTable("ILA.ILA_CATEGORIA_DADOS_PESSOAIS");
            DropTable("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropTable("ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropTable("ILA.ILA_AGENTE_TRATAMENTO");
            DropTable("ILA.ILA_CASES");
            DropTable("ILA.ILA_GROUPS");
            DropTable("ILA.ILA_ACCESS_REQUESTS");
        }
    }
}

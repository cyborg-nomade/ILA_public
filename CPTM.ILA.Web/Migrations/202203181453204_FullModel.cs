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
                        Justificativa = c.String(),
                        UsernameSuperior = c.String(),
                        TipoSolicitacaoAcesso = c.Decimal(nullable: false, precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_CASES",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Nome = c.String(),
                        Area = c.String(),
                        DataCriacao = c.DateTime(nullable: false),
                        DataAtualizacao = c.DateTime(nullable: false),
                        Aprovado = c.Decimal(nullable: false, precision: 1, scale: 0),
                        DadosPessoaisSensiveis = c.Decimal(nullable: false, precision: 1, scale: 0),
                        DescricaoFluxoTratamento = c.String(),
                        AbrangenciaGeografica = c.String(),
                        FonteDados = c.String(),
                        FrequenciaTratamento = c.String(),
                        QuantidadeDadosTratados = c.String(),
                        AreaTratamentoDados_Id = c.Decimal(precision: 9, scale: 0),
                        CatDadosPessoaisSensiveis_Id = c.Decimal(precision: 9, scale: 0),
                        CategoriaDadosPessoais_Id = c.Decimal(precision: 9, scale: 0),
                        CategoriasTitulares_Id = c.Decimal(precision: 9, scale: 0),
                        Controlador_Id = c.Decimal(precision: 9, scale: 0),
                        Criador_Id = c.Decimal(precision: 9, scale: 0),
                        User_Id = c.Decimal(precision: 9, scale: 0),
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
                .ForeignKey("ILA.ILA_GROUPS", t => t.Criador_Id)
                .ForeignKey("ILA.ILA_USERS", t => t.User_Id)
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
                .Index(t => t.Criador_Id)
                .Index(t => t.User_Id)
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
                        Biometricos_Id = c.Decimal(precision: 9, scale: 0),
                        ConviccaoReligiosa_Id = c.Decimal(precision: 9, scale: 0),
                        FiliacaoCrencaFilosofica_Id = c.Decimal(precision: 9, scale: 0),
                        FiliacaoOrgReligiosa_Id = c.Decimal(precision: 9, scale: 0),
                        FiliacaoPreferenciaPolitica_Id = c.Decimal(precision: 9, scale: 0),
                        FiliacaoSindicato_Id = c.Decimal(precision: 9, scale: 0),
                        Geneticos_Id = c.Decimal(precision: 9, scale: 0),
                        OpiniaoPolitica_Id = c.Decimal(precision: 9, scale: 0),
                        OrigemRacialEtnica_Id = c.Decimal(precision: 9, scale: 0),
                        SaudeVidaSexual_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Biometricos_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.ConviccaoReligiosa_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.FiliacaoCrencaFilosofica_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.FiliacaoOrgReligiosa_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.FiliacaoPreferenciaPolitica_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.FiliacaoSindicato_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Geneticos_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.OpiniaoPolitica_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.OrigemRacialEtnica_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.SaudeVidaSexual_Id)
                .Index(t => t.Biometricos_Id)
                .Index(t => t.ConviccaoReligiosa_Id)
                .Index(t => t.FiliacaoCrencaFilosofica_Id)
                .Index(t => t.FiliacaoOrgReligiosa_Id)
                .Index(t => t.FiliacaoPreferenciaPolitica_Id)
                .Index(t => t.FiliacaoSindicato_Id)
                .Index(t => t.Geneticos_Id)
                .Index(t => t.OpiniaoPolitica_Id)
                .Index(t => t.OrigemRacialEtnica_Id)
                .Index(t => t.SaudeVidaSexual_Id);
            
            CreateTable(
                "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Descricao = c.String(),
                        TempoRetencao = c.String(),
                        CaminhoRedeSistema = c.String(),
                        Outros_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_OUTROS", t => t.Outros_Id)
                .Index(t => t.Outros_Id);
            
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
                        OutrasAssNaoSensiveis_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.OutrasAssNaoSensiveis_Id)
                .Index(t => t.OutrasAssNaoSensiveis_Id);
            
            CreateTable(
                "ILA.ILA_CARACTERISTICAS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        DescricaoFisica_Id = c.Decimal(precision: 9, scale: 0),
                        DetalhesMilitares_Id = c.Decimal(precision: 9, scale: 0),
                        DetalhesPessoais_Id = c.Decimal(precision: 9, scale: 0),
                        SituacaoImigracao_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.DescricaoFisica_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.DetalhesMilitares_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.DetalhesPessoais_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.SituacaoImigracao_Id)
                .Index(t => t.DescricaoFisica_Id)
                .Index(t => t.DetalhesMilitares_Id)
                .Index(t => t.DetalhesPessoais_Id)
                .Index(t => t.SituacaoImigracao_Id);
            
            CreateTable(
                "ILA.ILA_CARAC_PSICOLOGICAS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        DescricaoPsi_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.DescricaoPsi_Id)
                .Index(t => t.DescricaoPsi_Id);
            
            CreateTable(
                "ILA.ILA_COMPOSICAO_FAMILIAR",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        CasamentoCoabitacao_Id = c.Decimal(precision: 9, scale: 0),
                        HistoricoConjugal_Id = c.Decimal(precision: 9, scale: 0),
                        MembrosFamilia_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.CasamentoCoabitacao_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.HistoricoConjugal_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.MembrosFamilia_Id)
                .Index(t => t.CasamentoCoabitacao_Id)
                .Index(t => t.HistoricoConjugal_Id)
                .Index(t => t.MembrosFamilia_Id);
            
            CreateTable(
                "ILA.ILA_EDUCACAO_TREINAMENTO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        AcademicosEscolares_Id = c.Decimal(precision: 9, scale: 0),
                        QualificacaoExperienciaProf_Id = c.Decimal(precision: 9, scale: 0),
                        RegistroFinanceiro_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.AcademicosEscolares_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.QualificacaoExperienciaProf_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.RegistroFinanceiro_Id)
                .Index(t => t.AcademicosEscolares_Id)
                .Index(t => t.QualificacaoExperienciaProf_Id)
                .Index(t => t.RegistroFinanceiro_Id);
            
            CreateTable(
                "ILA.ILA_FINANCEIROS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        AcordosAjustes_Id = c.Decimal(precision: 9, scale: 0),
                        ApoliceSeguro_Id = c.Decimal(precision: 9, scale: 0),
                        AssistenciaFin_Id = c.Decimal(precision: 9, scale: 0),
                        AtividadeProfissional_Id = c.Decimal(precision: 9, scale: 0),
                        AutorizacoesConsentimentos_Id = c.Decimal(precision: 9, scale: 0),
                        Compensacao_Id = c.Decimal(precision: 9, scale: 0),
                        DividasDespesas_Id = c.Decimal(precision: 9, scale: 0),
                        EmprestimosHipotecaCredito_Id = c.Decimal(precision: 9, scale: 0),
                        IdFin_Id = c.Decimal(precision: 9, scale: 0),
                        PlanoPensao_Id = c.Decimal(precision: 9, scale: 0),
                        RecursosFin_Id = c.Decimal(precision: 9, scale: 0),
                        Solvencia_Id = c.Decimal(precision: 9, scale: 0),
                        TransacaoFin_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.AcordosAjustes_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.ApoliceSeguro_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.AssistenciaFin_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.AtividadeProfissional_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.AutorizacoesConsentimentos_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Compensacao_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.DividasDespesas_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.EmprestimosHipotecaCredito_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.IdFin_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.PlanoPensao_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.RecursosFin_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Solvencia_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.TransacaoFin_Id)
                .Index(t => t.AcordosAjustes_Id)
                .Index(t => t.ApoliceSeguro_Id)
                .Index(t => t.AssistenciaFin_Id)
                .Index(t => t.AtividadeProfissional_Id)
                .Index(t => t.AutorizacoesConsentimentos_Id)
                .Index(t => t.Compensacao_Id)
                .Index(t => t.DividasDespesas_Id)
                .Index(t => t.EmprestimosHipotecaCredito_Id)
                .Index(t => t.IdFin_Id)
                .Index(t => t.PlanoPensao_Id)
                .Index(t => t.RecursosFin_Id)
                .Index(t => t.Solvencia_Id)
                .Index(t => t.TransacaoFin_Id);
            
            CreateTable(
                "ILA.ILA_HABITOS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        ContatosSociais_Id = c.Decimal(precision: 9, scale: 0),
                        DenunciasIncAcidentes_Id = c.Decimal(precision: 9, scale: 0),
                        Distincoes_Id = c.Decimal(precision: 9, scale: 0),
                        EstiloVida_Id = c.Decimal(precision: 9, scale: 0),
                        HabitosPessoais_Id = c.Decimal(precision: 9, scale: 0),
                        Posses_Id = c.Decimal(precision: 9, scale: 0),
                        UsoMidia_Id = c.Decimal(precision: 9, scale: 0),
                        ViagensDeslocamento_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.ContatosSociais_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.DenunciasIncAcidentes_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Distincoes_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.EstiloVida_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.HabitosPessoais_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Posses_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.UsoMidia_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.ViagensDeslocamento_Id)
                .Index(t => t.ContatosSociais_Id)
                .Index(t => t.DenunciasIncAcidentes_Id)
                .Index(t => t.Distincoes_Id)
                .Index(t => t.EstiloVida_Id)
                .Index(t => t.HabitosPessoais_Id)
                .Index(t => t.Posses_Id)
                .Index(t => t.UsoMidia_Id)
                .Index(t => t.ViagensDeslocamento_Id);
            
            CreateTable(
                "ILA.ILA_HABITOS_CONSUMO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        DadosBensServicos_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.DadosBensServicos_Id)
                .Index(t => t.DadosBensServicos_Id);
            
            CreateTable(
                "ILA.ILA_IDENTIFICACAO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        IdEletronica_Id = c.Decimal(precision: 9, scale: 0),
                        IdGov_Id = c.Decimal(precision: 9, scale: 0),
                        IdPessoal_Id = c.Decimal(precision: 9, scale: 0),
                        LocEletronica_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.IdEletronica_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.IdGov_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.IdPessoal_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.LocEletronica_Id)
                .Index(t => t.IdEletronica_Id)
                .Index(t => t.IdGov_Id)
                .Index(t => t.IdPessoal_Id)
                .Index(t => t.LocEletronica_Id);
            
            CreateTable(
                "ILA.ILA_INTERESSES_LAZER",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        AtividadesInteressesLaz_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.AtividadesInteressesLaz_Id)
                .Index(t => t.AtividadesInteressesLaz_Id);
            
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
                        AcoesJud_Id = c.Decimal(precision: 9, scale: 0),
                        CondenacoesSentencas_Id = c.Decimal(precision: 9, scale: 0),
                        PenalidadesAdm_Id = c.Decimal(precision: 9, scale: 0),
                        Suspeitas_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.AcoesJud_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.CondenacoesSentencas_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.PenalidadesAdm_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Suspeitas_Id)
                .Index(t => t.AcoesJud_Id)
                .Index(t => t.CondenacoesSentencas_Id)
                .Index(t => t.PenalidadesAdm_Id)
                .Index(t => t.Suspeitas_Id);
            
            CreateTable(
                "ILA.ILA_PROFISSAO_EMPREGO",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        AbsenteismoDisciplina_Id = c.Decimal(precision: 9, scale: 0),
                        AvaliacaoDesempenho_Id = c.Decimal(precision: 9, scale: 0),
                        Carreira_Id = c.Decimal(precision: 9, scale: 0),
                        EmpregoAtual_Id = c.Decimal(precision: 9, scale: 0),
                        Recrutamento_Id = c.Decimal(precision: 9, scale: 0),
                        Rescisao_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.AbsenteismoDisciplina_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.AvaliacaoDesempenho_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Carreira_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.EmpregoAtual_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Recrutamento_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Rescisao_Id)
                .Index(t => t.AbsenteismoDisciplina_Id)
                .Index(t => t.AvaliacaoDesempenho_Id)
                .Index(t => t.Carreira_Id)
                .Index(t => t.EmpregoAtual_Id)
                .Index(t => t.Recrutamento_Id)
                .Index(t => t.Rescisao_Id);
            
            CreateTable(
                "ILA.ILA_REG_VIDEO_IMG_VOZ",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        ImagemVigilancia_Id = c.Decimal(precision: 9, scale: 0),
                        VideoImagem_Id = c.Decimal(precision: 9, scale: 0),
                        Voz_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.ImagemVigilancia_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.VideoImagem_Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.Voz_Id)
                .Index(t => t.ImagemVigilancia_Id)
                .Index(t => t.VideoImagem_Id)
                .Index(t => t.Voz_Id);
            
            CreateTable(
                "ILA.ILA_RESIDENCIAIS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        DadosResidencia_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", t => t.DadosResidencia_Id)
                .Index(t => t.DadosResidencia_Id);
            
            CreateTable(
                "ILA.ILA_CATEGORIA_TITULARES",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_ITEM_CAT_TITULARES",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        TipoCategoria_Value = c.String(),
                        Descricao = c.String(),
                        CategoriasTitulares_Id = c.Decimal(precision: 9, scale: 0),
                        CategoriasTitulares_Id1 = c.Decimal(precision: 9, scale: 0),
                        CategoriasTitulares_Id2 = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CATEGORIA_TITULARES", t => t.CategoriasTitulares_Id)
                .ForeignKey("ILA.ILA_CATEGORIA_TITULARES", t => t.CategoriasTitulares_Id1)
                .ForeignKey("ILA.ILA_CATEGORIA_TITULARES", t => t.CategoriasTitulares_Id2)
                .Index(t => t.CategoriasTitulares_Id)
                .Index(t => t.CategoriasTitulares_Id1)
                .Index(t => t.CategoriasTitulares_Id2);
            
            CreateTable(
                "ILA.ILA_ITEM_COMPARTILH_DADOS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        NomeInstituicao = c.String(),
                        DadosCompartilhados = c.String(),
                        FinalidadeCompartilhamento = c.String(),
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
                "ILA.ILA_GROUPS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.ILA_USERS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Username = c.String(),
                        IsComite = c.Decimal(nullable: false, precision: 1, scale: 0),
                    })
                .PrimaryKey(t => t.Id);
            
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
                        TipoGarantia_Value = c.String(),
                        Case_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_CASES", t => t.Case_Id)
                .Index(t => t.Case_Id);
            
            CreateTable(
                "ILA.ILA_COMMENTS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Text = c.String(),
                        Author_Id = c.Decimal(precision: 9, scale: 0),
                        Thread_Id = c.Decimal(precision: 9, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("ILA.ILA_USERS", t => t.Author_Id)
                .ForeignKey("ILA.ILA_THREADS", t => t.Thread_Id)
                .Index(t => t.Author_Id)
                .Index(t => t.Thread_Id);
            
            CreateTable(
                "ILA.ILA_THREADS",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "ILA.UserGroup",
                c => new
                    {
                        User_Id = c.Decimal(nullable: false, precision: 9, scale: 0),
                        Group_Id = c.Decimal(nullable: false, precision: 9, scale: 0),
                    })
                .PrimaryKey(t => new { t.User_Id, t.Group_Id })
                .ForeignKey("ILA.ILA_USERS", t => t.User_Id, cascadeDelete: true)
                .ForeignKey("ILA.ILA_GROUPS", t => t.Group_Id, cascadeDelete: true)
                .Index(t => t.User_Id)
                .Index(t => t.Group_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("ILA.ILA_COMMENTS", "Thread_Id", "ILA.ILA_THREADS");
            DropForeignKey("ILA.ILA_COMMENTS", "Author_Id", "ILA.ILA_USERS");
            DropForeignKey("ILA.ILA_ITEM_TRANSF_INTERNACIONAL", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_RISCO_PRIVACIDADE", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_CASES", "Operador_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_ITEM_OBS_PROCESSO", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_MEDIDA_SEG_PRIV", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_CASES", "FinalidadeTratamento_Id", "ILA.ILA_FINALIDADE_TRATAMENTO");
            DropForeignKey("ILA.ILA_CASES", "FasesCicloTratamento_Id", "ILA.ILA_FASES_CICLO_TRATAMENTO");
            DropForeignKey("ILA.ILA_CASES", "ExtensaoEncarregado_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_CASES", "Encarregado_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.UserGroup", "Group_Id", "ILA.ILA_GROUPS");
            DropForeignKey("ILA.UserGroup", "User_Id", "ILA.ILA_USERS");
            DropForeignKey("ILA.ILA_CASES", "User_Id", "ILA.ILA_USERS");
            DropForeignKey("ILA.ILA_CASES", "Criador_Id", "ILA.ILA_GROUPS");
            DropForeignKey("ILA.ILA_CASES", "Controlador_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropForeignKey("ILA.ILA_ITEM_CONTRATO_TI", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_COMPARTILH_DADOS", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_CASES", "CategoriasTitulares_Id", "ILA.ILA_CATEGORIA_TITULARES");
            DropForeignKey("ILA.ILA_ITEM_CAT_TITULARES", "CategoriasTitulares_Id2", "ILA.ILA_CATEGORIA_TITULARES");
            DropForeignKey("ILA.ILA_ITEM_CAT_TITULARES", "CategoriasTitulares_Id1", "ILA.ILA_CATEGORIA_TITULARES");
            DropForeignKey("ILA.ILA_ITEM_CAT_TITULARES", "CategoriasTitulares_Id", "ILA.ILA_CATEGORIA_TITULARES");
            DropForeignKey("ILA.ILA_CASES", "CategoriaDadosPessoais_Id", "ILA.ILA_CATEGORIA_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Residenciais_Id", "ILA.ILA_RESIDENCIAIS");
            DropForeignKey("ILA.ILA_RESIDENCIAIS", "DadosResidencia_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "RegVideoImgVoz_Id", "ILA.ILA_REG_VIDEO_IMG_VOZ");
            DropForeignKey("ILA.ILA_REG_VIDEO_IMG_VOZ", "Voz_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_REG_VIDEO_IMG_VOZ", "VideoImagem_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_REG_VIDEO_IMG_VOZ", "ImagemVigilancia_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "ProfissaoEmprego_Id", "ILA.ILA_PROFISSAO_EMPREGO");
            DropForeignKey("ILA.ILA_PROFISSAO_EMPREGO", "Rescisao_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_PROFISSAO_EMPREGO", "Recrutamento_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_PROFISSAO_EMPREGO", "EmpregoAtual_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_PROFISSAO_EMPREGO", "Carreira_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_PROFISSAO_EMPREGO", "AvaliacaoDesempenho_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_PROFISSAO_EMPREGO", "AbsenteismoDisciplina_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "ProcessoJudAdmCrim_Id", "ILA.ILA_PROCESSO_JUD_ADM_CRIM");
            DropForeignKey("ILA.ILA_PROCESSO_JUD_ADM_CRIM", "Suspeitas_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_PROCESSO_JUD_ADM_CRIM", "PenalidadesAdm_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_PROCESSO_JUD_ADM_CRIM", "CondenacoesSentencas_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_PROCESSO_JUD_ADM_CRIM", "AcoesJud_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Outros_Id", "ILA.ILA_OUTROS");
            DropForeignKey("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "Outros_Id", "ILA.ILA_OUTROS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "InteressesLazer_Id", "ILA.ILA_INTERESSES_LAZER");
            DropForeignKey("ILA.ILA_INTERESSES_LAZER", "AtividadesInteressesLaz_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Identificacao_Id", "ILA.ILA_IDENTIFICACAO");
            DropForeignKey("ILA.ILA_IDENTIFICACAO", "LocEletronica_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_IDENTIFICACAO", "IdPessoal_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_IDENTIFICACAO", "IdGov_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_IDENTIFICACAO", "IdEletronica_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "HabitosConsumo_Id", "ILA.ILA_HABITOS_CONSUMO");
            DropForeignKey("ILA.ILA_HABITOS_CONSUMO", "DadosBensServicos_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Habitos_Id", "ILA.ILA_HABITOS");
            DropForeignKey("ILA.ILA_HABITOS", "ViagensDeslocamento_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_HABITOS", "UsoMidia_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_HABITOS", "Posses_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_HABITOS", "HabitosPessoais_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_HABITOS", "EstiloVida_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_HABITOS", "Distincoes_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_HABITOS", "DenunciasIncAcidentes_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_HABITOS", "ContatosSociais_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Financeiros_Id", "ILA.ILA_FINANCEIROS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "TransacaoFin_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "Solvencia_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "RecursosFin_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "PlanoPensao_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "IdFin_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "EmprestimosHipotecaCredito_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "DividasDespesas_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "Compensacao_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "AutorizacoesConsentimentos_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "AtividadeProfissional_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "AssistenciaFin_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "ApoliceSeguro_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_FINANCEIROS", "AcordosAjustes_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "EducacaoTreinamento_Id", "ILA.ILA_EDUCACAO_TREINAMENTO");
            DropForeignKey("ILA.ILA_EDUCACAO_TREINAMENTO", "RegistroFinanceiro_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_EDUCACAO_TREINAMENTO", "QualificacaoExperienciaProf_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_EDUCACAO_TREINAMENTO", "AcademicosEscolares_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "ComposicaoFamiliar_Id", "ILA.ILA_COMPOSICAO_FAMILIAR");
            DropForeignKey("ILA.ILA_COMPOSICAO_FAMILIAR", "MembrosFamilia_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_COMPOSICAO_FAMILIAR", "HistoricoConjugal_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_COMPOSICAO_FAMILIAR", "CasamentoCoabitacao_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "CaracteristicasPsicologicas_Id", "ILA.ILA_CARAC_PSICOLOGICAS");
            DropForeignKey("ILA.ILA_CARAC_PSICOLOGICAS", "DescricaoPsi_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Caracteristicas_Id", "ILA.ILA_CARACTERISTICAS");
            DropForeignKey("ILA.ILA_CARACTERISTICAS", "SituacaoImigracao_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CARACTERISTICAS", "DetalhesPessoais_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CARACTERISTICAS", "DetalhesMilitares_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CARACTERISTICAS", "DescricaoFisica_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CATEGORIA_DADOS_PESSOAIS", "Associacoes_Id", "ILA.ILA_ASSOCIACOES");
            DropForeignKey("ILA.ILA_ASSOCIACOES", "OutrasAssNaoSensiveis_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CASES", "CatDadosPessoaisSensiveis_Id", "ILA.ILA_CAT_DADOS_PESSOAIS_SENS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "SaudeVidaSexual_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "OrigemRacialEtnica_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "OpiniaoPolitica_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "Geneticos_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "FiliacaoSindicato_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "FiliacaoPreferenciaPolitica_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "FiliacaoOrgReligiosa_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "FiliacaoCrencaFilosofica_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "ConviccaoReligiosa_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", "Biometricos_Id", "ILA.ILA_ITEM_CAT_DADOS_PESSOAIS");
            DropForeignKey("ILA.ILA_CASES", "AreaTratamentoDados_Id", "ILA.ILA_AGENTE_TRATAMENTO");
            DropIndex("ILA.UserGroup", new[] { "Group_Id" });
            DropIndex("ILA.UserGroup", new[] { "User_Id" });
            DropIndex("ILA.ILA_COMMENTS", new[] { "Thread_Id" });
            DropIndex("ILA.ILA_COMMENTS", new[] { "Author_Id" });
            DropIndex("ILA.ILA_ITEM_TRANSF_INTERNACIONAL", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_RISCO_PRIVACIDADE", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_OBS_PROCESSO", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_MEDIDA_SEG_PRIV", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_CONTRATO_TI", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_COMPARTILH_DADOS", new[] { "Case_Id" });
            DropIndex("ILA.ILA_ITEM_CAT_TITULARES", new[] { "CategoriasTitulares_Id2" });
            DropIndex("ILA.ILA_ITEM_CAT_TITULARES", new[] { "CategoriasTitulares_Id1" });
            DropIndex("ILA.ILA_ITEM_CAT_TITULARES", new[] { "CategoriasTitulares_Id" });
            DropIndex("ILA.ILA_RESIDENCIAIS", new[] { "DadosResidencia_Id" });
            DropIndex("ILA.ILA_REG_VIDEO_IMG_VOZ", new[] { "Voz_Id" });
            DropIndex("ILA.ILA_REG_VIDEO_IMG_VOZ", new[] { "VideoImagem_Id" });
            DropIndex("ILA.ILA_REG_VIDEO_IMG_VOZ", new[] { "ImagemVigilancia_Id" });
            DropIndex("ILA.ILA_PROFISSAO_EMPREGO", new[] { "Rescisao_Id" });
            DropIndex("ILA.ILA_PROFISSAO_EMPREGO", new[] { "Recrutamento_Id" });
            DropIndex("ILA.ILA_PROFISSAO_EMPREGO", new[] { "EmpregoAtual_Id" });
            DropIndex("ILA.ILA_PROFISSAO_EMPREGO", new[] { "Carreira_Id" });
            DropIndex("ILA.ILA_PROFISSAO_EMPREGO", new[] { "AvaliacaoDesempenho_Id" });
            DropIndex("ILA.ILA_PROFISSAO_EMPREGO", new[] { "AbsenteismoDisciplina_Id" });
            DropIndex("ILA.ILA_PROCESSO_JUD_ADM_CRIM", new[] { "Suspeitas_Id" });
            DropIndex("ILA.ILA_PROCESSO_JUD_ADM_CRIM", new[] { "PenalidadesAdm_Id" });
            DropIndex("ILA.ILA_PROCESSO_JUD_ADM_CRIM", new[] { "CondenacoesSentencas_Id" });
            DropIndex("ILA.ILA_PROCESSO_JUD_ADM_CRIM", new[] { "AcoesJud_Id" });
            DropIndex("ILA.ILA_INTERESSES_LAZER", new[] { "AtividadesInteressesLaz_Id" });
            DropIndex("ILA.ILA_IDENTIFICACAO", new[] { "LocEletronica_Id" });
            DropIndex("ILA.ILA_IDENTIFICACAO", new[] { "IdPessoal_Id" });
            DropIndex("ILA.ILA_IDENTIFICACAO", new[] { "IdGov_Id" });
            DropIndex("ILA.ILA_IDENTIFICACAO", new[] { "IdEletronica_Id" });
            DropIndex("ILA.ILA_HABITOS_CONSUMO", new[] { "DadosBensServicos_Id" });
            DropIndex("ILA.ILA_HABITOS", new[] { "ViagensDeslocamento_Id" });
            DropIndex("ILA.ILA_HABITOS", new[] { "UsoMidia_Id" });
            DropIndex("ILA.ILA_HABITOS", new[] { "Posses_Id" });
            DropIndex("ILA.ILA_HABITOS", new[] { "HabitosPessoais_Id" });
            DropIndex("ILA.ILA_HABITOS", new[] { "EstiloVida_Id" });
            DropIndex("ILA.ILA_HABITOS", new[] { "Distincoes_Id" });
            DropIndex("ILA.ILA_HABITOS", new[] { "DenunciasIncAcidentes_Id" });
            DropIndex("ILA.ILA_HABITOS", new[] { "ContatosSociais_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "TransacaoFin_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "Solvencia_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "RecursosFin_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "PlanoPensao_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "IdFin_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "EmprestimosHipotecaCredito_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "DividasDespesas_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "Compensacao_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "AutorizacoesConsentimentos_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "AtividadeProfissional_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "AssistenciaFin_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "ApoliceSeguro_Id" });
            DropIndex("ILA.ILA_FINANCEIROS", new[] { "AcordosAjustes_Id" });
            DropIndex("ILA.ILA_EDUCACAO_TREINAMENTO", new[] { "RegistroFinanceiro_Id" });
            DropIndex("ILA.ILA_EDUCACAO_TREINAMENTO", new[] { "QualificacaoExperienciaProf_Id" });
            DropIndex("ILA.ILA_EDUCACAO_TREINAMENTO", new[] { "AcademicosEscolares_Id" });
            DropIndex("ILA.ILA_COMPOSICAO_FAMILIAR", new[] { "MembrosFamilia_Id" });
            DropIndex("ILA.ILA_COMPOSICAO_FAMILIAR", new[] { "HistoricoConjugal_Id" });
            DropIndex("ILA.ILA_COMPOSICAO_FAMILIAR", new[] { "CasamentoCoabitacao_Id" });
            DropIndex("ILA.ILA_CARAC_PSICOLOGICAS", new[] { "DescricaoPsi_Id" });
            DropIndex("ILA.ILA_CARACTERISTICAS", new[] { "SituacaoImigracao_Id" });
            DropIndex("ILA.ILA_CARACTERISTICAS", new[] { "DetalhesPessoais_Id" });
            DropIndex("ILA.ILA_CARACTERISTICAS", new[] { "DetalhesMilitares_Id" });
            DropIndex("ILA.ILA_CARACTERISTICAS", new[] { "DescricaoFisica_Id" });
            DropIndex("ILA.ILA_ASSOCIACOES", new[] { "OutrasAssNaoSensiveis_Id" });
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
            DropIndex("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", new[] { "Outros_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "SaudeVidaSexual_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "OrigemRacialEtnica_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "OpiniaoPolitica_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "Geneticos_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "FiliacaoSindicato_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "FiliacaoPreferenciaPolitica_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "FiliacaoOrgReligiosa_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "FiliacaoCrencaFilosofica_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "ConviccaoReligiosa_Id" });
            DropIndex("ILA.ILA_CAT_DADOS_PESSOAIS_SENS", new[] { "Biometricos_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Operador_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "FinalidadeTratamento_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "FasesCicloTratamento_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "ExtensaoEncarregado_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Encarregado_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "User_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Criador_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "Controlador_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "CategoriasTitulares_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "CategoriaDadosPessoais_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "CatDadosPessoaisSensiveis_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "AreaTratamentoDados_Id" });
            DropTable("ILA.UserGroup");
            DropTable("ILA.ILA_THREADS");
            DropTable("ILA.ILA_COMMENTS");
            DropTable("ILA.ILA_ITEM_TRANSF_INTERNACIONAL");
            DropTable("ILA.ILA_ITEM_RISCO_PRIVACIDADE");
            DropTable("ILA.ILA_ITEM_OBS_PROCESSO");
            DropTable("ILA.ILA_ITEM_MEDIDA_SEG_PRIV");
            DropTable("ILA.ILA_FINALIDADE_TRATAMENTO");
            DropTable("ILA.ILA_FASES_CICLO_TRATAMENTO");
            DropTable("ILA.ILA_USERS");
            DropTable("ILA.ILA_GROUPS");
            DropTable("ILA.ILA_ITEM_CONTRATO_TI");
            DropTable("ILA.ILA_ITEM_COMPARTILH_DADOS");
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
            DropTable("ILA.ILA_ACCESS_REQUESTS");
        }
    }
}

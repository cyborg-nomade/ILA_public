using System;
using System.Collections.Generic;
using System.Linq;
using CPTM.ILA.Web.DTOs.CaseHelpers;
using CPTM.ILA.Web.DTOs.CaseHelpers.CategoriasDadosPessoais;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;
using Microsoft.Ajax.Utilities;

namespace CPTM.ILA.Web.DTOs
{
    public class CaseDTO
    {
        public int Id { get; set; }
        public string Ref { get; set; }
        public string Nome { get; set; }
        public string Area { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }
        public DateTime? DataEnvio { get; set; }
        public DateTime? DataAprovacao { get; set; }
        public DateTime? DataProxRevisao { get; set; }
        public string UsernameResponsavel { get; set; }
        public int GrupoCriadorId { get; set; }
        public bool Aprovado { get; set; }
        public bool Reprovado { get; set; }
        public string ComentarioReprovacao { get; set; }
        public bool EncaminhadoAprovacao { get; set; }
        public bool DadosPessoaisSensiveis { get; set; }

        public AgenteTratamento Controlador { get; set; }
        public AgenteTratamento Encarregado { get; set; }
        public AgenteTratamento ExtensaoEncarregado { get; set; }
        public AgenteTratamento AreaTratamentoDados { get; set; }
        public AgenteTratamento Operador { get; set; }

        public FasesCicloTratamento FasesCicloTratamento { get; set; }
        public string DescricaoFluxoTratamento { get; set; }
        public TipoAbrangenciaGeografica AbrangenciaGeografica { get; set; }
        public string FonteDados { get; set; }
        public FinalidadeTratamento FinalidadeTratamento { get; set; }

        public CategoriaDadosPessoais CategoriaDadosPessoais { get; set; }
        public CatDadosPessoaisSensiveis CatDadosPessoaisSensiveis { get; set; }

        public TipoFrequenciaTratamento FrequenciaTratamento { get; set; }
        public int QtdeDadosTratados { get; set; }
        public int QtdeDadosSensiveisTratados { get; set; }

        public CategoriasTitulares CategoriasTitulares { get; set; }

        public ICollection<ItemCompartilhamentoDados> CompartilhamentoDadosPessoais { get; set; }
        public ICollection<ItemMedidaSegurancaPrivacidade> MedidasSegurancaPrivacidade { get; set; }
        public ICollection<ItemTransferenciaInternacional> TransferenciaInternacional { get; set; }
        public ICollection<ItemContratoTi> ContratoServicosTi { get; set; }
        public ICollection<ItemRiscoPrivacidade> RiscosPrivacidade { get; set; }
        public ICollection<ItemObservacoesProcesso> ObservacoesProcesso { get; set; }

        public static CaseDTO ConvertToCaseDTO(Case fullCase)
        {
            var caseDto = new CaseDTO()
            {
                AbrangenciaGeografica = fullCase.AbrangenciaGeografica,
                Aprovado = fullCase.Aprovado,
                Area = fullCase.Area,
                AreaTratamentoDados = fullCase.AreaTratamentoDados,
                CatDadosPessoaisSensiveis = new CatDadosPessoaisSensiveis()
                {
                    Biometricos = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisBiometricos),
                    ConviccaoReligiosa = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisConviccaoReligiosa),
                    FiliacaoCrencaFilosofica = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisFiliacaoCrencaFilosofica),
                    FiliacaoOrgReligiosa = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisFiliacaoOrgReligiosa),
                    FiliacaoPreferenciaPolitica = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisFiliacaoPreferenciaPolitica),
                    FiliacaoSindicato = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisFiliacaoSindicato),
                    Geneticos = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisGeneticos),
                    OpiniaoPolitica = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisOpiniaoPolitica),
                    OrigemRacialEtnica = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisOrigemRacialEtnica),
                    SaudeVidaSexual = GetItemCategoriaDadosPessoasDtos(fullCase,
                        CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisSaudeVidaSexual),
                },
                CategoriaDadosPessoais = new CategoriaDadosPessoais()
                {
                    Associacoes = new Associacoes()
                    {
                        OutrasAssNaoSensiveis = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.AssociacoesOutrasAssNaoSensiveis),
                    },
                    Caracteristicas = new Caracteristicas()
                    {
                        DescricaoFisica = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.CaracteristicasDescricaoFisica),
                        DetalhesMilitares = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.CaracteristicasDetalhesMilitares),
                        DetalhesPessoais = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.CaracteristicasDetalhesPessoais),
                        SituacaoImigracao = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.CaracteristicasSituacaoImigracao)
                    },
                    CaracteristicasPsicologicas = new CaracteristicasPsicologicas()
                    {
                        DescricaoPsi = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.CaracteristicasPsicologicasDescricaoPsi)
                    },
                    ComposicaoFamiliar = new ComposicaoFamiliar()
                    {
                        CasamentoCoabitacao = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ComposicaoFamiliarCasamentoCoabitacao),
                        HistoricoConjugal = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ComposicaoFamiliarHistoricoConjugal),
                        MembrosFamilia = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ComposicaoFamiliarMembrosFamilia),
                    },
                    EducacaoTreinamento = new EducacaoTreinamento()
                    {
                        AcademicosEscolares = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.EducacaoTreinamentoAcademicosEscolares),
                        QualificacaoExperienciaProf = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.EducacaoTreinamentoQualificacaoExperienciaProf),
                        RegistroFinanceiro = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.EducacaoTreinamentoRegistroFinanceiro),
                    },
                    Financeiros = new Financeiros()
                    {
                        AcordosAjustes = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosAcordosAjustes),
                        ApoliceSeguro = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosApoliceSeguro),
                        AssistenciaFin = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosAssistenciaFin),
                        AtividadeProfissional = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosAtividadeProfissional),
                        AutorizacoesConsentimentos = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosAutorizacoesConsentimentos),
                        Compensacao = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosCompensacao),
                        DividasDespesas = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosDividasDespesas),
                        EmprestimosHipotecaCredito = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosEmprestimosHipotecaCredito),
                        IdFin = GetItemCategoriaDadosPessoasDtos(fullCase, CategoriaDadosPessoaisEnum.FinanceirosIdFin),
                        PlanoPensao = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosPlanoPensao),
                        RecursosFin = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosRecursosFin),
                        Solvencia = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosSolvencia),
                        TransacaoFin = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.FinanceirosTransacaoFin),
                    },
                    Habitos = new Habitos()
                    {
                        ContatosSociais = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.HabitosContatosSociais),
                        DenunciasIncAcidentes = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.HabitosDenunciasIncAcidentes),
                        Distincoes =
                            GetItemCategoriaDadosPessoasDtos(fullCase, CategoriaDadosPessoaisEnum.HabitosDistincoes),
                        EstiloVida =
                            GetItemCategoriaDadosPessoasDtos(fullCase, CategoriaDadosPessoaisEnum.HabitosEstiloVida),
                        HabitosPessoais = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.HabitosHabitosPessoais),
                        Posses = GetItemCategoriaDadosPessoasDtos(fullCase, CategoriaDadosPessoaisEnum.HabitosPosses),
                        UsoMidia = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.HabitosUsoMidia),
                        ViagensDeslocamento = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.HabitosViagensDeslocamento),
                    },
                    HabitosConsumo = new HabitosConsumo()
                    {
                        DadosBensServicos = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.HabitosConsumoDadosBensServicos),
                    },
                    Identificacao = new Identificacao()
                    {
                        IdEletronica = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.IdentificacaoIdEletronica),
                        IdGov = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.IdentificacaoIdGov),
                        IdPessoal = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.IdentificacaoIdPessoal),
                        LocEletronica = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.IdentificacaoLocEletronica),
                    },
                    InteressesLazer = new InteressesLazer()
                    {
                        AtividadesInteressesLaz = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.InteressesLazerAtividadesInteressesLaz),
                    },
                    Outros = new Outros()
                    {
                        OutrosItems =
                            GetItemCategoriaDadosPessoasDtos(fullCase, CategoriaDadosPessoaisEnum.OutrosItems),
                    },
                    ProcessoJudAdmCrim = new ProcessoJudAdmCrim()
                    {
                        AcoesJud = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProcessoJudAdmCrimAcoesJud),
                        CondenacoesSentencas = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProcessoJudAdmCrimCondenacoesSentencas),
                        PenalidadesAdm = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProcessoJudAdmCrimPenalidadesAdm),
                        Suspeitas = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProcessoJudAdmCrimSuspeitas),
                    },
                    ProfissaoEmprego = new ProfissaoEmprego()
                    {
                        AbsenteismoDisciplina = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProfissaoEmpregoAbsenteismoDisciplina),
                        AvaliacaoDesempenho = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProfissaoEmpregoAvaliacaoDesempenho),
                        Carreira = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProfissaoEmpregoCarreira),
                        EmpregoAtual = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProfissaoEmpregoEmpregoAtual),
                        Recrutamento = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProfissaoEmpregoRecrutamento),
                        Rescisao = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ProfissaoEmpregoRescisao),
                    },
                    RegVideoImgVoz = new RegVideoImgVoz()
                    {
                        ImagemVigilancia = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.RegVideoImgVozImagemVigilancia),
                        VideoImagem = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.RegVideoImgVozVideoImagem),
                        Voz = GetItemCategoriaDadosPessoasDtos(fullCase, CategoriaDadosPessoaisEnum.RegVideoImgVozVoz),
                    },
                    Residenciais = new Residenciais()
                    {
                        DadosResidencia = GetItemCategoriaDadosPessoasDtos(fullCase,
                            CategoriaDadosPessoaisEnum.ResidenciaisDadosResidencia),
                    }
                },
                CategoriasTitulares = fullCase.CategoriasTitulares,
                ComentarioReprovacao = fullCase.ComentarioReprovacao,
                CompartilhamentoDadosPessoais = fullCase.CompartilhamentoDadosPessoais,
                ContratoServicosTi = fullCase.ContratoServicosTi,
                Controlador = fullCase.Controlador,
                DadosPessoaisSensiveis = fullCase.DadosPessoaisSensiveis,
                Nome = fullCase.Nome,
                DataAprovacao = fullCase.DataAprovacao,
                Reprovado = fullCase.Reprovado,
                Ref = fullCase.Ref,
                DataAtualizacao = fullCase.DataAtualizacao,
                DataCriacao = fullCase.DataCriacao,
                DataEnvio = fullCase.DataEnvio,
                DataProxRevisao = fullCase.DataProxRevisao,
                DescricaoFluxoTratamento = fullCase.DescricaoFluxoTratamento,
                EncaminhadoAprovacao = fullCase.EncaminhadoAprovacao,
                Encarregado = fullCase.Encarregado,
                ExtensaoEncarregado = fullCase.ExtensaoEncarregado,
                FasesCicloTratamento = fullCase.FasesCicloTratamento,
                FinalidadeTratamento = fullCase.FinalidadeTratamento,
                FonteDados = fullCase.FonteDados,
                FrequenciaTratamento = fullCase.FrequenciaTratamento,
                GrupoCriadorId = fullCase.GrupoCriadorId,
                Id = fullCase.Id,
                MedidasSegurancaPrivacidade = fullCase.MedidasSegurancaPrivacidade,
                ObservacoesProcesso = fullCase.ObservacoesProcesso,
                Operador = fullCase.Operador,
                QtdeDadosSensiveisTratados = fullCase.QtdeDadosSensiveisTratados,
                QtdeDadosTratados = fullCase.QtdeDadosTratados,
                RiscosPrivacidade = fullCase.RiscosPrivacidade,
                TransferenciaInternacional = fullCase.TransferenciaInternacional,
                UsernameResponsavel = fullCase.UsernameResponsavel,
            };
            return caseDto;
        }

        public static Case ConvertToDomainCase(CaseDTO caseDto)
        {
            var fullCase = new Case()
            {
                DataAprovacao = caseDto.DataAprovacao,
                Reprovado = caseDto.Reprovado,
                Nome = caseDto.Nome,
                Ref = caseDto.Ref,
                Aprovado = caseDto.Aprovado,
                EncaminhadoAprovacao = caseDto.EncaminhadoAprovacao,
                UsernameResponsavel = caseDto.UsernameResponsavel,
                AbrangenciaGeografica = caseDto.AbrangenciaGeografica,
                Area = caseDto.Area,
                AreaTratamentoDados = caseDto.AreaTratamentoDados,
                CategoriasTitulares = caseDto.CategoriasTitulares,
                ComentarioReprovacao = caseDto.ComentarioReprovacao,
                CompartilhamentoDadosPessoais = caseDto.CompartilhamentoDadosPessoais,
                ContratoServicosTi = caseDto.ContratoServicosTi,
                Controlador = caseDto.Controlador,
                DadosPessoaisSensiveis = caseDto.DadosPessoaisSensiveis,
                DataAtualizacao = caseDto.DataAtualizacao,
                DataCriacao = caseDto.DataCriacao,
                DataEnvio = caseDto.DataEnvio,
                DataProxRevisao = caseDto.DataProxRevisao,
                DescricaoFluxoTratamento = caseDto.DescricaoFluxoTratamento,
                Encarregado = caseDto.Encarregado,
                ExtensaoEncarregado = caseDto.ExtensaoEncarregado,
                FasesCicloTratamento = caseDto.FasesCicloTratamento,
                FinalidadeTratamento = caseDto.FinalidadeTratamento,
                FonteDados = caseDto.FonteDados,
                FrequenciaTratamento = caseDto.FrequenciaTratamento,
                GrupoCriadorId = caseDto.GrupoCriadorId,
                Id = caseDto.Id,
                ItemCategoriaDadosPessoaisCollection = GetItemCategoriaDadosPessoaisList(caseDto),
                MedidasSegurancaPrivacidade = caseDto.MedidasSegurancaPrivacidade,
                ObservacoesProcesso = caseDto.ObservacoesProcesso,
                Operador = caseDto.Operador,
                QtdeDadosSensiveisTratados = caseDto.QtdeDadosSensiveisTratados,
                QtdeDadosTratados = caseDto.QtdeDadosTratados,
                RiscosPrivacidade = caseDto.RiscosPrivacidade,
                TransferenciaInternacional = caseDto.TransferenciaInternacional
            };
            return fullCase;
        }

        public static List<ItemCategoriaDadosPessoasDTO> GetItemCategoriaDadosPessoasDtos(Case fullCase,
            CategoriaDadosPessoaisEnum categoria)
        {
            return fullCase.ItemCategoriaDadosPessoaisCollection.Where(i => i.CategoriaDadosPessoais == categoria)
                .Select(ItemCategoriaDadosPessoasDTO.ConvertToItemCategoriaDadosPessoasDto)
                .ToList();
        }

        public static List<ItemCategoriaDadosPessoais> GetItemCategoriaDadosPessoaisList(CaseDTO caseDto)
        {
            var items = new List<ItemCategoriaDadosPessoais>();
            caseDto.CategoriaDadosPessoais.Associacoes.OutrasAssNaoSensiveis.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.AssociacoesOutrasAssNaoSensiveis)));
            caseDto.CategoriaDadosPessoais.Caracteristicas.DescricaoFisica.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CaracteristicasDescricaoFisica)));
            caseDto.CategoriaDadosPessoais.Caracteristicas.DetalhesMilitares.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CaracteristicasDetalhesMilitares)));
            caseDto.CategoriaDadosPessoais.Caracteristicas.DetalhesPessoais.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CaracteristicasDetalhesPessoais)));
            caseDto.CategoriaDadosPessoais.Caracteristicas.SituacaoImigracao.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CaracteristicasSituacaoImigracao)));
            caseDto.CategoriaDadosPessoais.CaracteristicasPsicologicas.DescricaoPsi.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CaracteristicasPsicologicasDescricaoPsi)));
            caseDto.CategoriaDadosPessoais.ComposicaoFamiliar.CasamentoCoabitacao.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ComposicaoFamiliarCasamentoCoabitacao)));
            caseDto.CategoriaDadosPessoais.ComposicaoFamiliar.HistoricoConjugal.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ComposicaoFamiliarHistoricoConjugal)));
            caseDto.CategoriaDadosPessoais.ComposicaoFamiliar.MembrosFamilia.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ComposicaoFamiliarMembrosFamilia)));
            caseDto.CategoriaDadosPessoais.EducacaoTreinamento.AcademicosEscolares.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.EducacaoTreinamentoAcademicosEscolares)));
            caseDto.CategoriaDadosPessoais.EducacaoTreinamento.QualificacaoExperienciaProf.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.EducacaoTreinamentoQualificacaoExperienciaProf)));
            caseDto.CategoriaDadosPessoais.EducacaoTreinamento.RegistroFinanceiro.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.EducacaoTreinamentoRegistroFinanceiro)));
            caseDto.CategoriaDadosPessoais.Financeiros.AcordosAjustes.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosAcordosAjustes)));
            caseDto.CategoriaDadosPessoais.Financeiros.ApoliceSeguro.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosApoliceSeguro)));
            caseDto.CategoriaDadosPessoais.Financeiros.AssistenciaFin.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosAssistenciaFin)));
            caseDto.CategoriaDadosPessoais.Financeiros.AtividadeProfissional.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosAtividadeProfissional)));
            caseDto.CategoriaDadosPessoais.Financeiros.AutorizacoesConsentimentos.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosAutorizacoesConsentimentos)));
            caseDto.CategoriaDadosPessoais.Financeiros.Compensacao.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosCompensacao)));
            caseDto.CategoriaDadosPessoais.Financeiros.DividasDespesas.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosDividasDespesas)));
            caseDto.CategoriaDadosPessoais.Financeiros.EmprestimosHipotecaCredito.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosEmprestimosHipotecaCredito)));
            caseDto.CategoriaDadosPessoais.Financeiros.IdFin.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosIdFin)));
            caseDto.CategoriaDadosPessoais.Financeiros.PlanoPensao.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosPlanoPensao)));
            caseDto.CategoriaDadosPessoais.Financeiros.RecursosFin.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosRecursosFin)));
            caseDto.CategoriaDadosPessoais.Financeiros.Solvencia.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosSolvencia)));
            caseDto.CategoriaDadosPessoais.Financeiros.TransacaoFin.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.FinanceirosTransacaoFin)));
            caseDto.CategoriaDadosPessoais.Habitos.ContatosSociais.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.HabitosContatosSociais)));
            caseDto.CategoriaDadosPessoais.Habitos.DenunciasIncAcidentes.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.HabitosDenunciasIncAcidentes)));
            caseDto.CategoriaDadosPessoais.Habitos.Distincoes.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.HabitosDistincoes)));
            caseDto.CategoriaDadosPessoais.Habitos.EstiloVida.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.HabitosEstiloVida)));
            caseDto.CategoriaDadosPessoais.Habitos.HabitosPessoais.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.HabitosHabitosPessoais)));
            caseDto.CategoriaDadosPessoais.Habitos.Posses.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.HabitosPosses)));
            caseDto.CategoriaDadosPessoais.Habitos.UsoMidia.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.HabitosUsoMidia)));
            caseDto.CategoriaDadosPessoais.Habitos.ViagensDeslocamento.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.HabitosViagensDeslocamento)));
            caseDto.CategoriaDadosPessoais.HabitosConsumo.DadosBensServicos.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.HabitosConsumoDadosBensServicos)));
            caseDto.CategoriaDadosPessoais.Identificacao.IdEletronica.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.IdentificacaoIdEletronica)));
            caseDto.CategoriaDadosPessoais.Identificacao.IdGov.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.IdentificacaoIdGov)));
            caseDto.CategoriaDadosPessoais.Identificacao.IdPessoal.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.IdentificacaoIdPessoal)));
            caseDto.CategoriaDadosPessoais.Identificacao.LocEletronica.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.IdentificacaoLocEletronica)));
            caseDto.CategoriaDadosPessoais.InteressesLazer.AtividadesInteressesLaz.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.InteressesLazerAtividadesInteressesLaz)));
            caseDto.CategoriaDadosPessoais.Outros.OutrosItems.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.OutrosItems)));
            caseDto.CategoriaDadosPessoais.ProcessoJudAdmCrim.AcoesJud.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProcessoJudAdmCrimAcoesJud)));
            caseDto.CategoriaDadosPessoais.ProcessoJudAdmCrim.CondenacoesSentencas.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProcessoJudAdmCrimCondenacoesSentencas)));
            caseDto.CategoriaDadosPessoais.ProcessoJudAdmCrim.PenalidadesAdm.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProcessoJudAdmCrimPenalidadesAdm)));
            caseDto.CategoriaDadosPessoais.ProcessoJudAdmCrim.Suspeitas.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProcessoJudAdmCrimSuspeitas)));
            caseDto.CategoriaDadosPessoais.ProfissaoEmprego.AbsenteismoDisciplina.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProfissaoEmpregoAbsenteismoDisciplina)));
            caseDto.CategoriaDadosPessoais.ProfissaoEmprego.AvaliacaoDesempenho.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProfissaoEmpregoAvaliacaoDesempenho)));
            caseDto.CategoriaDadosPessoais.ProfissaoEmprego.Carreira.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProfissaoEmpregoCarreira)));
            caseDto.CategoriaDadosPessoais.ProfissaoEmprego.EmpregoAtual.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProfissaoEmpregoEmpregoAtual)));
            caseDto.CategoriaDadosPessoais.ProfissaoEmprego.Recrutamento.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProfissaoEmpregoRecrutamento)));
            caseDto.CategoriaDadosPessoais.ProfissaoEmprego.Rescisao.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ProfissaoEmpregoRescisao)));
            caseDto.CategoriaDadosPessoais.RegVideoImgVoz.ImagemVigilancia.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.RegVideoImgVozImagemVigilancia)));
            caseDto.CategoriaDadosPessoais.RegVideoImgVoz.VideoImagem.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.RegVideoImgVozVideoImagem)));
            caseDto.CategoriaDadosPessoais.RegVideoImgVoz.Voz.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.RegVideoImgVozVoz)));
            caseDto.CategoriaDadosPessoais.Residenciais.DadosResidencia.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.ResidenciaisDadosResidencia)));
            caseDto.CatDadosPessoaisSensiveis.Biometricos.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisBiometricos)));
            caseDto.CatDadosPessoaisSensiveis.ConviccaoReligiosa.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisConviccaoReligiosa)));
            caseDto.CatDadosPessoaisSensiveis.FiliacaoCrencaFilosofica.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisFiliacaoCrencaFilosofica)));
            caseDto.CatDadosPessoaisSensiveis.FiliacaoOrgReligiosa.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisFiliacaoOrgReligiosa)));
            caseDto.CatDadosPessoaisSensiveis.FiliacaoPreferenciaPolitica.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisFiliacaoPreferenciaPolitica)));
            caseDto.CatDadosPessoaisSensiveis.FiliacaoSindicato.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisFiliacaoSindicato)));
            caseDto.CatDadosPessoaisSensiveis.Geneticos.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisGeneticos)));
            caseDto.CatDadosPessoaisSensiveis.OpiniaoPolitica.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisOpiniaoPolitica)));
            caseDto.CatDadosPessoaisSensiveis.OrigemRacialEtnica.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisOrigemRacialEtnica)));
            caseDto.CatDadosPessoaisSensiveis.SaudeVidaSexual.ForEach(i =>
                items.Add(ItemCategoriaDadosPessoasDTO.ConvertToDomainItemCategoriaDadosPessoais(i,
                    CategoriaDadosPessoaisEnum.CategoriaDadosPessoaisSensiveisSaudeVidaSexual)));

            return items;
        }
    }
}
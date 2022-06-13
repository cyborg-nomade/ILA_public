using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;
using CPTM.GNU.Library;

namespace CPTM.ILA.Web.Models
{
    [Table("ILA_CASES")]
    public class Case
    {
        public int Id { get; set; }
        [MaxLength(250)] public string Ref { get; set; }
        [MaxLength(250)] public string Nome { get; set; }
        public string Area { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }
        public DateTime? DataEnvio { get; set; }
        public DateTime? DataAprovacao { get; set; }
        public DateTime? DataProxRevisao { get; set; }
        [MaxLength(250)] public string UsernameResponsavel { get; set; }
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

        public ICollection<ItemCategoriaDadosPessoais> ItensCategoriaDadosPessoais { get; set; }

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

        public Case FillStandardValues()
        {
            Controlador = new AgenteTratamento()
            {
                Area = "CPTM"
            };
            Encarregado = new AgenteTratamento()
            {
                Nome = "Olivia Shibata Nishiyama", Area = "Encarregado de Dados (DPO)",
                Telefone = "+ 55 11 3117 – 7001", Email = "encarregado.dados@cptm.sp.gov.br"
            };
            FinalidadeTratamento.DescricaoFinalidade =
                "Atendimento de finalidade pública, na persecução do interesse público, com o objetivo de executar as competências legais ou cumprir as atribuições legais do serviço público.";
            return this;
        }

        public Case RectifyCase()
        {
            FillStandardValues();
            foreach (var item in CompartilhamentoDadosPessoais)
            {
                item.Rectify();
            }

            foreach (var itemTransferenciaInternacional in TransferenciaInternacional)
            {
                itemTransferenciaInternacional.Rectify();
            }

            if (FinalidadeTratamento.HipoteseTratamento.Value !=
                HipotesesTratamento.ObrigacaoLegal()
                    .Value)
            {
                FinalidadeTratamento.PrevisaoLegal = "";
            }

            return this;
        }

        public Case ApproveCase()
        {
            Aprovado = true;
            Reprovado = false;
            EncaminhadoAprovacao = false;
            DataAprovacao = DateTime.Today;
            DataProxRevisao = DataAprovacao?.AddYears(1);
            return this;
        }

        public Case ReproveCase(string comentarioReprovacao)
        {
            Aprovado = false;
            EncaminhadoAprovacao = false;
            Reprovado = true;
            ComentarioReprovacao = comentarioReprovacao;
            return this;
        }

        public Case SendCaseToApproval(string usernameCriador, int idUsuario)
        {
            EncaminhadoAprovacao = true;
            Aprovado = false;
            Reprovado = false;

            DataEnvio = DateTime.Today;

            if (FinalidadeTratamento.HipoteseTratamento.Value !=
                HipotesesTratamento.Consentimento()
                    .Value &&
                FinalidadeTratamento.HipoteseTratamento.Value !=
                HipotesesTratamento.InteressesLegitimosControlador()
                    .Value)
                return this;
            var userAd = Seguranca.ObterUsuario(usernameCriador);
            var assunto = $"Processo LGPD {Nome} - ID {Id}";
            var mensagem =
                $@"O processo {Nome} acabou de ser enviado para aprovação pelo Comitê LGPD, e sua Hipótese de Tratamento foi declarada como {FinalidadeTratamento.HipoteseTratamento.Value}";
            var erro = "Algo deu errado no envio do e-mail. Contate o suporte técnico";
            //send email
            var enviado = Email.Enviar("ILA", userAd.Nome, userAd.Email,
                new List<string>() { "uriel.fiori@cptm.sp.gov.br" }, assunto, mensagem, DateTime.Now, idUsuario,
                ref erro);

            // encarregado.dados@cptm.sp.gov.br

            return this;
        }
    }
}
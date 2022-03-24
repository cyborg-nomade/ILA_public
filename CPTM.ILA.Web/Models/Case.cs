using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;

namespace CPTM.ILA.Web.Models
{
    [Table("ILA_CASES")]
    public class Case
    {
        public int Id { get; set; }
        [MaxLength(250)] public string Nome { get; set; }
        public string Area { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }
        public Group GrupoCriador { get; set; }
        public User UsuarioCriador { get; set; }
        public bool Aprovado { get; set; }
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
        public CategoriaDadosPessoaisSensiveis CatDadosPessoaisSensiveis { get; set; }

        public TipoFrequenciaTratamento FrequenciaTratamento { get; set; }
        public int QuantidadeDadosTratados { get; set; }
        public int QuantidadeDadosSensiveisTratados { get; set; }

        public CategoriasTitulares CategoriasTitulares { get; set; }

        public ICollection<ItemCompartilhamentoDados> CompartilhamentoDadosPessoais { get; set; }
        public ICollection<ItemMedidaSegurancaPrivacidade> MedidasSegurancaPrivacidade { get; set; }
        public ICollection<ItemTransferenciaInternacional> TransferenciaInternacional { get; set; }
        public ICollection<ItemContratoTi> ContratoServicosTi { get; set; }
        public ICollection<ItemRiscoPrivacidade> RiscosPrivacidade { get; set; }
        public ICollection<ItemObservacoesProcesso> ObservacoesProcesso { get; set; }

        public static CaseListItem ReduceToListItem(Case fullCase)
        {
            return new CaseListItem()
            {
                Area = fullCase.Area,
                DadosPessoaisSensiveis = fullCase.DadosPessoaisSensiveis ? "SIM" : "NÃO",
                DataAtualizacao = fullCase.DataAtualizacao.ToString("d", CultureInfo.GetCultureInfo("pt-BR")),
                DataCriacao = fullCase.DataAtualizacao.ToString("d", CultureInfo.GetCultureInfo("pt-BR")),
                DescricaoFinalidade = fullCase.FinalidadeTratamento.DescricaoFinalidade,
                HipotesesTratamento = fullCase.FinalidadeTratamento.HipoteseTratamento,
                Id = fullCase.Id,
                Nome = fullCase.Nome,
                GrupoCriador = fullCase.GrupoCriador.Nome
            };
        }

        public Case FillStandardValues()
        {
            this.Controlador = new AgenteTratamento()
            {
                Area = "CPTM"
            };
            this.Encarregado = new AgenteTratamento()
            {
                Nome = "Olivia Shibata Nishiyama", Area = "Encarregado de Dados (DPO)",
                Telefone = "+ 55 11 3117 – 7001", Email = "encarregado.dados@cptm.sp.gov.br"
            };
            this.FinalidadeTratamento = new FinalidadeTratamento()
            {
                DescricaoFinalidade =
                    "Atendimento de finalidade pública, na persecução do interesse público, com o objetivo de executar as competências legais ou cumprir as atribuições legais do serviço público."
            };
            return this;
        }
    }
}
using System;
using System.Collections.Generic;
using CPTM.ILA.Web.DTOs.CaseHelpers;
using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;

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
            var caseDto = new CaseDTO();
            return caseDto;
        }

        public static Case ConvertToDomainCase(CaseDTO caseDto)
        {
            var fullCase = new Case();
            return fullCase;
        }
    }
}
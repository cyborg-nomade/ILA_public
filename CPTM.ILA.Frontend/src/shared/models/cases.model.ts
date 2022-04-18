import {
  AgenteTratamento,
  CategoriaDadosPessoais,
  CategoriaDadosPessoaisSensiveis,
  CategoriaTitulares,
  emptyAgenteTratamento,
  emptyCategoriaDadosPessoais,
  emptyCategoriaDadosPessoaisSensiveis,
  emptyCategoriaTitulares,
  emptyFasesCicloTratamento,
  emptyFinalidadeTratamento,
  FasesCicloTratamento,
  FinalidadeTratamento,
  itemCompartilhamentoDados,
  itemContratoTI,
  itemMedidasSegurancaPrivacidade,
  itemObservacoesProcesso,
  itemRiscoPrivacidade,
  itemTransferenciaInternacional,
} from "./case-helpers/case-helpers.model";
import { tipoAbrangenciaGeografica } from "./case-helpers/enums.model";

export interface BaseCase {
  nome: string;
  area: string;
  dataCriacao: string;
  dataAtualizacao: string;
  grupoCriadorId: number;
  usuarioCriadorId: number;
  aprovado: boolean;
  encaminhadoAprovacao: boolean;
  dadosPessoaisSensiveis: boolean;
  controlador: AgenteTratamento;
  encarregado: AgenteTratamento;
  extensaoEncarregado: AgenteTratamento;
  areaTratamentoDados: AgenteTratamento;
  operador: AgenteTratamento;
  fasesCicloTratamento: FasesCicloTratamento;
  descricaoFluxoTratamento: string;
  abrangenciaGeografica: { value: tipoAbrangenciaGeografica };
  fonteDados: string;
  finalidadeTratamento: FinalidadeTratamento;
  categoriaDadosPessoais: CategoriaDadosPessoais;
  catDadosPessoaisSensiveis: CategoriaDadosPessoaisSensiveis;
  frequenciaTratamento: { value: string };
  qtdeDadosTratados: number;
  qtdeDadosSensiveisTratados: number;
  categoriasTitulares: CategoriaTitulares;
  compartilhamentoDadosPessoais: itemCompartilhamentoDados[];
  medidasSegurancaPrivacidade: itemMedidasSegurancaPrivacidade[];
  transferenciaInternacional: itemTransferenciaInternacional[];
  contratoServicosTITratamentoDados: itemContratoTI[];
  riscosPrivacidade: itemRiscoPrivacidade[];
  observacoesProcesso: itemObservacoesProcesso[];
}

export interface Case extends BaseCase {
  id: number;
}

export const emptyBaseCase = (): BaseCase => ({
  nome: "",
  area: "",
  dataCriacao: new Date().toISOString(),
  dataAtualizacao: new Date().toISOString(),
  grupoCriadorId: 0,
  usuarioCriadorId: 0,
  aprovado: false,
  encaminhadoAprovacao: false,
  dadosPessoaisSensiveis: false,
  controlador: emptyAgenteTratamento(),
  encarregado: emptyAgenteTratamento(),
  extensaoEncarregado: emptyAgenteTratamento(),
  areaTratamentoDados: emptyAgenteTratamento(),
  operador: emptyAgenteTratamento(),
  fasesCicloTratamento: emptyFasesCicloTratamento(),
  descricaoFluxoTratamento: "",
  abrangenciaGeografica: { value: tipoAbrangenciaGeografica.regional },
  fonteDados: "",
  finalidadeTratamento: emptyFinalidadeTratamento(),
  categoriaDadosPessoais: emptyCategoriaDadosPessoais(),
  catDadosPessoaisSensiveis: emptyCategoriaDadosPessoaisSensiveis(),
  frequenciaTratamento: { value: "" },
  qtdeDadosTratados: 0,
  qtdeDadosSensiveisTratados: 0,
  categoriasTitulares: emptyCategoriaTitulares(),
  compartilhamentoDadosPessoais: [],
  medidasSegurancaPrivacidade: [],
  transferenciaInternacional: [],
  contratoServicosTITratamentoDados: [],
  riscosPrivacidade: [],
  observacoesProcesso: [],
});

export const emptyCase = (currentAreaTratamento?: AgenteTratamento): Case => ({
  id: 0,
  nome: "",
  area: "",
  dataCriacao: new Date().toLocaleDateString(),
  dataAtualizacao: new Date().toLocaleDateString(),
  grupoCriadorId: 0,
  usuarioCriadorId: 0,
  aprovado: false,
  encaminhadoAprovacao: false,
  dadosPessoaisSensiveis: false,
  controlador: emptyAgenteTratamento("CPTM"),
  encarregado: emptyAgenteTratamento(
    "Olivia Shibata Nishiyama",
    "Encarregado de Dados (DPO)",
    "+ 55 11 3117 – 7001",
    "encarregado.dados@cptm.sp.gov.br"
  ),
  extensaoEncarregado: emptyAgenteTratamento(),
  areaTratamentoDados: currentAreaTratamento
    ? emptyAgenteTratamento(
        currentAreaTratamento.nome,
        currentAreaTratamento.area,
        currentAreaTratamento.telefone,
        currentAreaTratamento.email
      )
    : emptyAgenteTratamento(),
  operador: emptyAgenteTratamento(),
  fasesCicloTratamento: emptyFasesCicloTratamento(),
  descricaoFluxoTratamento: "",
  abrangenciaGeografica: { value: tipoAbrangenciaGeografica.regional },
  fonteDados: "",
  finalidadeTratamento: emptyFinalidadeTratamento(),
  categoriaDadosPessoais: emptyCategoriaDadosPessoais(),
  catDadosPessoaisSensiveis: emptyCategoriaDadosPessoaisSensiveis(),
  frequenciaTratamento: { value: "" },
  qtdeDadosTratados: 0,
  qtdeDadosSensiveisTratados: 0,
  categoriasTitulares: emptyCategoriaTitulares(),
  compartilhamentoDadosPessoais: [],
  medidasSegurancaPrivacidade: [],
  transferenciaInternacional: [],
  contratoServicosTITratamentoDados: [],
  riscosPrivacidade: [],
  observacoesProcesso: [],
});

import { emptyGroup, Group } from "./access-control/group.model";
import { emptyUser, User } from "./access-control/users.model";
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
  grupoCriador: Group;
  usuarioCriador: User;
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
  categoriaDadosPessoaisSensiveis: CategoriaDadosPessoaisSensiveis;
  frequenciaTratamento: string;
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
  dataCriacao: "",
  dataAtualizacao: "",
  grupoCriador: emptyGroup(),
  usuarioCriador: emptyUser(),
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
  categoriaDadosPessoaisSensiveis: emptyCategoriaDadosPessoaisSensiveis(),
  frequenciaTratamento: "",
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

export const emptyCase = (): Case => ({
  id: 0,
  nome: "",
  area: "",
  dataCriacao: "",
  dataAtualizacao: "",
  grupoCriador: emptyGroup(),
  usuarioCriador: emptyUser(),
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
  categoriaDadosPessoaisSensiveis: emptyCategoriaDadosPessoaisSensiveis(),
  frequenciaTratamento: "",
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

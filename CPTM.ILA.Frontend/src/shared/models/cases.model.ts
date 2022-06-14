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
import {
    tipoAbrangenciaGeografica,
    tipoFrequenciaTratamento,
} from "./case-helpers/enums.model";

export interface BaseCase {
    ref: string;
    nome: string;
    area: string;
    dataCriacao: string;
    dataAtualizacao: string;
    dataEnvio: string;
    dataAprovacao: string;
    dataProxRevisao: string;
    usernameResponsavel: string;
    grupoCriadorId: number;
    aprovado: boolean;
    reprovado: boolean;
    comentarioReprovacao: string;
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
    ref: "",
    nome: "",
    area: "",
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString(),
    dataEnvio: new Date().toISOString(),
    dataAprovacao: new Date().toISOString(),
    dataProxRevisao: new Date().toISOString(),
    usernameResponsavel: "",
    grupoCriadorId: 0,
    aprovado: false,
    reprovado: false,
    comentarioReprovacao: "",
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
    frequenciaTratamento: { value: tipoFrequenciaTratamento.total24por7 },
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

export const emptyCase = (
    currentAreaTratamento?: AgenteTratamento,
    currentDpo?: AgenteTratamento
): Case => ({
    id: 0,
    ref: "",
    nome: "",
    area: "",
    dataCriacao: new Date().toLocaleDateString(),
    dataAtualizacao: new Date().toLocaleDateString(),
    dataEnvio: "",
    dataAprovacao: "",
    dataProxRevisao: "",
    usernameResponsavel: "",
    grupoCriadorId: 0,
    aprovado: false,
    reprovado: false,
    comentarioReprovacao: "",
    encaminhadoAprovacao: false,
    dadosPessoaisSensiveis: false,
    controlador: emptyAgenteTratamento("CPTM"),
    encarregado: currentDpo
        ? emptyAgenteTratamento(
              currentDpo.nome,
              currentDpo.area,
              currentDpo.telefone,
              currentDpo.email
          )
        : emptyAgenteTratamento(),
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
    frequenciaTratamento: { value: tipoFrequenciaTratamento.total24por7 },
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

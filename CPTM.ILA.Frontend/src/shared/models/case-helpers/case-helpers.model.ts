import {
  Associacoes,
  Caracteristicas,
  CaracteristicasPsicologicas,
  ComposicaoFamiliar,
  EducacaoTreinamento,
  emptyAssociacoes,
  emptyCaracteristicas,
  emptyCaracteristicasPsicologicas,
  emptyComposicaoFamiliar,
  emptyEducacaoTreinamento,
  emptyFinanceiros,
  emptyHabitos,
  emptyHabitosConsumo,
  emptyIdentificacao,
  emptyInteressesLazer,
  emptyOutros,
  emptyProcessoJudAdmCrim,
  emptyProfissaoEmprego,
  emptyRegVideoImgVoz,
  emptyResidenciais,
  Financeiros,
  Habitos,
  HabitosConsumo,
  Identificacao,
  InteressesLazer,
  Outros,
  ProcessoJudAdmCrim,
  ProfissaoEmprego,
  RegVideoImgVoz,
  Residenciais,
} from "./categoria-dados-pessoais.model";
import {
  hipotesesTratamento,
  tipoCategoriaTitulares,
  tipoCompartilhamentoDados,
  tipoFinalidadeCompartilhamento,
  tipoFontesRetencao,
  tipoMedidaSegurancaPrivacidade,
  tipoNivelCompartilhamento,
  tipoRiscoPrivacidade,
  tipoTempoRetencao,
} from "./enums.model";

export interface AgenteTratamento {
  nome: string;
  area?: string;
  telefone?: string;
  email?: string;
}

export const emptyAgenteTratamento = (
  nome?: string,
  area?: string,
  telefone?: string,
  email?: string
): AgenteTratamento => ({
  nome: nome || "",
  area: area || "",
  telefone: telefone || "",
  email: email || "",
});

export interface CategoriaDadosPessoaisSensiveis {
  origemRacialEtnica?: itemCategoriaDadosPessoais[];
  conviccaoReligiosa?: itemCategoriaDadosPessoais[];
  opiniaoPolitica?: itemCategoriaDadosPessoais[];
  filiacaoSindicato?: itemCategoriaDadosPessoais[];
  filiacaoOrgReligiosa?: itemCategoriaDadosPessoais[];
  filiacaoCrencaFilosofica?: itemCategoriaDadosPessoais[];
  filiacaoPreferenciaPolitica?: itemCategoriaDadosPessoais[];
  saudeVidaSexual?: itemCategoriaDadosPessoais[];
  geneticos?: itemCategoriaDadosPessoais[];
  biometricos?: itemCategoriaDadosPessoais[];
}

export const emptyCategoriaDadosPessoaisSensiveis =
  (): CategoriaDadosPessoaisSensiveis => ({
    origemRacialEtnica: [],
    conviccaoReligiosa: [],
    opiniaoPolitica: [],
    filiacaoSindicato: [],
    filiacaoOrgReligiosa: [],
    filiacaoCrencaFilosofica: [],
    filiacaoPreferenciaPolitica: [],
    saudeVidaSexual: [],
    geneticos: [],
    biometricos: [],
  });

export interface CategoriaDadosPessoais {
  identificacao: Identificacao;
  financeiros: Financeiros;
  caracteristicas: Caracteristicas;
  habitos: Habitos;
  caracteristicasPsicologicas: CaracteristicasPsicologicas;
  composicaoFamiliar: ComposicaoFamiliar;
  interessesLazer: InteressesLazer;
  associacoes: Associacoes;
  processoJudAdmCrim: ProcessoJudAdmCrim;
  habitosConsumo: HabitosConsumo;
  residenciais: Residenciais;
  educacaoTreinamento: EducacaoTreinamento;
  profissaoEmprego: ProfissaoEmprego;
  regVideoImgVoz: RegVideoImgVoz;
  outros: Outros;
}

export const emptyCategoriaDadosPessoais = (): CategoriaDadosPessoais => ({
  identificacao: emptyIdentificacao(),
  financeiros: emptyFinanceiros(),
  caracteristicas: emptyCaracteristicas(),
  habitos: emptyHabitos(),
  caracteristicasPsicologicas: emptyCaracteristicasPsicologicas(),
  composicaoFamiliar: emptyComposicaoFamiliar(),
  interessesLazer: emptyInteressesLazer(),
  associacoes: emptyAssociacoes(),
  processoJudAdmCrim: emptyProcessoJudAdmCrim(),
  habitosConsumo: emptyHabitosConsumo(),
  residenciais: emptyResidenciais(),
  educacaoTreinamento: emptyEducacaoTreinamento(),
  profissaoEmprego: emptyProfissaoEmprego(),
  regVideoImgVoz: emptyRegVideoImgVoz(),
  outros: emptyOutros(),
});

export interface CategoriaTitulares {
  categorias: itemCategoriaTitulares[];
  criancasAdolescentes: itemCategoriaTitularesExtra;
  outrosGruposVulneraveis: itemCategoriaTitularesExtra;
}

export const emptyCategoriaTitulares = (): CategoriaTitulares => ({
  categorias: [],
  criancasAdolescentes: emptyItemCategoriaTitularesExtra(),
  outrosGruposVulneraveis: emptyItemCategoriaTitularesExtra(),
});

export interface FasesCicloTratamento {
  coleta: boolean;
  retencao: boolean;
  processamento: boolean;
  compartilhamento: boolean;
  eliminacao: boolean;
}

export const emptyFasesCicloTratamento = (): FasesCicloTratamento => ({
  coleta: false,
  retencao: false,
  processamento: false,
  compartilhamento: false,
  eliminacao: false,
});

export interface FinalidadeTratamento {
  hipoteseTratamento: { value: hipotesesTratamento };
  descricaoFinalidade: string;
  previsaoLegal: string;
  resultadosTitular: string;
  beneficiosEsperados: string;
}

export const emptyFinalidadeTratamento = (): FinalidadeTratamento => ({
  hipoteseTratamento: { value: hipotesesTratamento.consentimento },
  descricaoFinalidade:
    "Atendimento de finalidade pública, na persecução do interesse público, com o objetivo de executar as competências legais ou cumprir as atribuições legais do serviço público.",
  previsaoLegal: "",
  resultadosTitular: "",
  beneficiosEsperados: "",
});

export interface itemCategoriaDadosPessoais {
  descricao: string;
  tempoRetencao: { value: tipoTempoRetencao };
  fonteRetencao: { value: tipoFontesRetencao };
  localArmazenamento: string;
}

export const emptyItemCategoriaDadosPessoais =
  (): itemCategoriaDadosPessoais => ({
    descricao: "",
    tempoRetencao: { value: tipoTempoRetencao.ano1 },
    fonteRetencao: { value: tipoFontesRetencao.docPapel },
    localArmazenamento: "",
  });

interface itemCategoriaTitulares {
  tipoCategoria: { value: tipoCategoriaTitulares };
  descricao: string;
}

export const emptyItemCategoriaTitulares = (): itemCategoriaTitulares => ({
  tipoCategoria: { value: tipoCategoriaTitulares.empregados },
  descricao: "",
});

export interface itemCategoriaTitularesExtra {
  trataDados: string;
  descricaoDados: string;
}

export const emptyItemCategoriaTitularesExtra =
  (): itemCategoriaTitularesExtra => ({
    trataDados: "NÃO",
    descricaoDados: "",
  });

export interface itemCompartilhamentoDados {
  nomeInstituicao: string;
  tipoCompDados: { value: tipoCompartilhamentoDados };
  nivelCompartilhamento: { value: tipoNivelCompartilhamento };
  descricaoDadosCompartilhados: string;
  finalidadeComp: { value: tipoFinalidadeCompartilhamento };
  descricaoFinalidadeComp: string;
}

export const emptyItemCompatilhamentoDados = (): itemCompartilhamentoDados => ({
  nomeInstituicao: "",
  tipoCompDados: { value: tipoCompartilhamentoDados.publico },
  nivelCompartilhamento: { value: tipoNivelCompartilhamento.todoOProcesso },
  descricaoDadosCompartilhados: "",
  finalidadeComp: { value: tipoFinalidadeCompartilhamento.consentimento },
  descricaoFinalidadeComp: "",
});

export interface itemContratoTI {
  numeroContrato: string;
  numeroProcessoContratacao: string;
  objetoContrato: string;
  emailGestorContrato: string;
}

export const emptyItemContratoTI = (): itemContratoTI => ({
  numeroContrato: "",
  numeroProcessoContratacao: "",
  objetoContrato: "",
  emailGestorContrato: "",
});

export interface itemMedidasSegurancaPrivacidade {
  tipo: { value: tipoMedidaSegurancaPrivacidade };
  descricao: string;
}

export const emptyItemMedidaSegurancaPrivacidade =
  (): itemMedidasSegurancaPrivacidade => ({
    tipo: { value: tipoMedidaSegurancaPrivacidade.consentimentoEscolha },
    descricao: "",
  });

export interface itemObservacoesProcesso {
  descricaoObs: string;
}

export const emptyItemObservacoesProcesso = (): itemObservacoesProcesso => ({
  descricaoObs: "",
});

export interface itemRiscoPrivacidade {
  tipoRisco: { value: tipoRiscoPrivacidade };
  observacoes: string;
}

export const emptyItemRiscoPrivacidade = (): itemRiscoPrivacidade => ({
  tipoRisco: { value: tipoRiscoPrivacidade.tratamentoSemConsentimento },
  observacoes: "",
});

export interface itemTransferenciaInternacional {
  nomeOrganizacao: string;
  pais: string;
  dadosTransferidos: string;
  tipoGarantia: string;
}

export const emptyItemTransferenciaInternacional =
  (): itemTransferenciaInternacional => ({
    nomeOrganizacao: "",
    pais: "",
    dadosTransferidos: "",
    tipoGarantia: "",
  });

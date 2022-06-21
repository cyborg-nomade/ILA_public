import { itemCategoriaDadosPessoais } from "./case-helpers.model";

export interface Associacoes {
  outrasAssNaoSensiveis?: itemCategoriaDadosPessoais[];
}

export const emptyAssociacoes = (): Associacoes => ({
  outrasAssNaoSensiveis: [],
});

export interface Caracteristicas {
  detalhesPessoais?: itemCategoriaDadosPessoais[];
  detalhesMilitares?: itemCategoriaDadosPessoais[];
  situacaoImigracao?: itemCategoriaDadosPessoais[];
  descricaoFisica?: itemCategoriaDadosPessoais[];
}

export const emptyCaracteristicas = (): Caracteristicas => ({
  detalhesPessoais: [],
  detalhesMilitares: [],
  situacaoImigracao: [],
  descricaoFisica: [],
});

export interface CaracteristicasPsicologicas {
  descricaoPsi?: itemCategoriaDadosPessoais[];
}

export const emptyCaracteristicasPsicologicas =
  (): CaracteristicasPsicologicas => ({
    descricaoPsi: [],
  });

export interface ComposicaoFamiliar {
  casamentoCoabitacao?: itemCategoriaDadosPessoais[];
  historicoConjugal?: itemCategoriaDadosPessoais[];
  membrosFamilia?: itemCategoriaDadosPessoais[];
}

export const emptyComposicaoFamiliar = (): ComposicaoFamiliar => ({
  casamentoCoabitacao: [],
  historicoConjugal: [],
  membrosFamilia: [],
});

export interface EducacaoTreinamento {
  academicosEscolares?: itemCategoriaDadosPessoais[];
  registroFinanceiro?: itemCategoriaDadosPessoais[];
  qualificacaoExperienciaProf?: itemCategoriaDadosPessoais[];
}

export const emptyEducacaoTreinamento = (): EducacaoTreinamento => ({
  academicosEscolares: [],
  registroFinanceiro: [],
  qualificacaoExperienciaProf: [],
});

export interface Financeiros {
  idFin?: itemCategoriaDadosPessoais[];
  recursosFin?: itemCategoriaDadosPessoais[];
  dividasDespesas?: itemCategoriaDadosPessoais[];
  solvencia?: itemCategoriaDadosPessoais[];
  emprestimosHipotecaCredito?: itemCategoriaDadosPessoais[];
  assistenciaFin?: itemCategoriaDadosPessoais[];
  apoliceSeguro?: itemCategoriaDadosPessoais[];
  planoPensao?: itemCategoriaDadosPessoais[];
  transacaoFin?: itemCategoriaDadosPessoais[];
  compensacao?: itemCategoriaDadosPessoais[];
  atividadeProfissional?: itemCategoriaDadosPessoais[];
  acordosAjustes?: itemCategoriaDadosPessoais[];
  autorizacoesConsentimentos?: itemCategoriaDadosPessoais[];
}

export const emptyFinanceiros = (): Financeiros => ({
  idFin: [],
  recursosFin: [],
  dividasDespesas: [],
  solvencia: [],
  emprestimosHipotecaCredito: [],
  assistenciaFin: [],
  apoliceSeguro: [],
  planoPensao: [],
  transacaoFin: [],
  compensacao: [],
  atividadeProfissional: [],
  acordosAjustes: [],
  autorizacoesConsentimentos: [],
});

export interface Habitos {
  habitosPessoais?: itemCategoriaDadosPessoais[];
  estiloVida?: itemCategoriaDadosPessoais[];
  viagensDeslocamento?: itemCategoriaDadosPessoais[];
  contatosSociais?: itemCategoriaDadosPessoais[];
  posses?: itemCategoriaDadosPessoais[];
  denunciasIncAcidentes?: itemCategoriaDadosPessoais[];
  distincoes?: itemCategoriaDadosPessoais[];
  usoMidia?: itemCategoriaDadosPessoais[];
}

export const emptyHabitos = (): Habitos => ({
  habitosPessoais: [],
  estiloVida: [],
  viagensDeslocamento: [],
  contatosSociais: [],
  posses: [],
  denunciasIncAcidentes: [],
  distincoes: [],
  usoMidia: [],
});

export interface HabitosConsumo {
  dadosBensServicos?: itemCategoriaDadosPessoais[];
}

export const emptyHabitosConsumo = (): HabitosConsumo => ({
  dadosBensServicos: [],
});

export interface Identificacao {
  idPessoal?: itemCategoriaDadosPessoais[];
  idGov?: itemCategoriaDadosPessoais[];
  idEletronica?: itemCategoriaDadosPessoais[];
  locEletronica?: itemCategoriaDadosPessoais[];
}

export const emptyIdentificacao = (): Identificacao => ({
  idPessoal: [],
  idGov: [],
  idEletronica: [],
  locEletronica: [],
});

export interface InteressesLazer {
  atividadesInteressesLaz?: itemCategoriaDadosPessoais[];
}

export const emptyInteressesLazer = (): InteressesLazer => ({
  atividadesInteressesLaz: [],
});

export interface Outros {
  outrosItems: itemCategoriaDadosPessoais[];
}

export const emptyOutros = (): Outros => ({
  outrosItems: [],
});

export interface ProcessoJudAdmCrim {
  suspeitas?: itemCategoriaDadosPessoais[];
  condenacoesSentencas?: itemCategoriaDadosPessoais[];
  acoesJud?: itemCategoriaDadosPessoais[];
  penalidadesAdm?: itemCategoriaDadosPessoais[];
}

export const emptyProcessoJudAdmCrim = (): ProcessoJudAdmCrim => ({
  suspeitas: [],
  condenacoesSentencas: [],
  acoesJud: [],
  penalidadesAdm: [],
});

export interface ProfissaoEmprego {
  empregoAtual?: itemCategoriaDadosPessoais[];
  recrutamento?: itemCategoriaDadosPessoais[];
  rescisao?: itemCategoriaDadosPessoais[];
  carreira?: itemCategoriaDadosPessoais[];
  absenteismoDisciplina?: itemCategoriaDadosPessoais[];
  avaliacaoDesempenho?: itemCategoriaDadosPessoais[];
}

export const emptyProfissaoEmprego = (): ProfissaoEmprego => ({
  empregoAtual: [],
  recrutamento: [],
  rescisao: [],
  carreira: [],
  absenteismoDisciplina: [],
  avaliacaoDesempenho: [],
});

export interface RegVideoImgVoz {
  videoImagem?: itemCategoriaDadosPessoais[];
  imagemVigilancia?: itemCategoriaDadosPessoais[];
  voz?: itemCategoriaDadosPessoais[];
}

export const emptyRegVideoImgVoz = (): RegVideoImgVoz => ({
  videoImagem: [],
  imagemVigilancia: [],
  voz: [],
});

export interface Residenciais {
  dadosResidencia?: itemCategoriaDadosPessoais[];
}

export const emptyResidenciais = (): Residenciais => ({
  dadosResidencia: [],
});

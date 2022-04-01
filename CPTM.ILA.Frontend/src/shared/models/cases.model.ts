export interface AgenteTratamento {
  nome: string;
  area?: string;
  telefone?: string;
  email?: string;
}

export interface BaseCaseListItem {
  nome: string;
  area: string;
  dataCriacao: string;
  dataAtualizacao: string;
  hipoteseTratamento: { value: hipotesesTratamento };
  descricaoFinalidade: string;
  dadosPessoaisSensiveis: string;
  grupoCriador: string;
}

export interface CaseListItem extends BaseCaseListItem {
  id: string;
}

export type headersCaseListItem = keyof CaseListItem;

export interface CategoriaDadosPessoais {
  identificacao: {
    idPessoal?: itemCategoriaDadosPessoais;
    idGov?: itemCategoriaDadosPessoais;
    idEletronica?: itemCategoriaDadosPessoais;
    locEletronica?: itemCategoriaDadosPessoais;
  };
  financeiros: {
    idFin?: itemCategoriaDadosPessoais;
    recursosFin?: itemCategoriaDadosPessoais;
    dividasDespesas?: itemCategoriaDadosPessoais;
    solvencia?: itemCategoriaDadosPessoais;
    emprestimosHipotecaCredito?: itemCategoriaDadosPessoais;
    assistenciaFin?: itemCategoriaDadosPessoais;
    apoliceSeguro?: itemCategoriaDadosPessoais;
    planoPensao?: itemCategoriaDadosPessoais;
    transacaoFin?: itemCategoriaDadosPessoais;
    compensacao?: itemCategoriaDadosPessoais;
    atividadeProfissional?: itemCategoriaDadosPessoais;
    acordosAjustes?: itemCategoriaDadosPessoais;
    autorizacoesConsentimentos?: itemCategoriaDadosPessoais;
  };
  caracteristicas: {
    detalhesPessoais?: itemCategoriaDadosPessoais;
    detalhesMilitares?: itemCategoriaDadosPessoais;
    situacaoImigracao?: itemCategoriaDadosPessoais;
    descricaoFisica?: itemCategoriaDadosPessoais;
  };
  habitos: {
    habitos?: itemCategoriaDadosPessoais;
    estiloVida?: itemCategoriaDadosPessoais;
    viagensDeslocamento?: itemCategoriaDadosPessoais;
    contatosSociais?: itemCategoriaDadosPessoais;
    posses?: itemCategoriaDadosPessoais;
    denunciasIncidentesAcidentes?: itemCategoriaDadosPessoais;
    distincoes?: itemCategoriaDadosPessoais;
    usoMidia?: itemCategoriaDadosPessoais;
  };
  caracteristicasPsicologicas: {
    descricaoPsi?: itemCategoriaDadosPessoais;
  };
  composicaoFamiliar: {
    casamentoCoabitacao?: itemCategoriaDadosPessoais;
    historicoConjugal?: itemCategoriaDadosPessoais;
    membrosFamilia?: itemCategoriaDadosPessoais;
  };
  interessesLazer: {
    atividadesInteressesLaz?: itemCategoriaDadosPessoais;
  };
  associacoes: {
    outrasAssociacoesNaoSensiveis?: itemCategoriaDadosPessoais;
  };
  processoJudAdmCrim: {
    suspeitas?: itemCategoriaDadosPessoais;
    condenacoesSentencas?: itemCategoriaDadosPessoais;
    acoesJud?: itemCategoriaDadosPessoais;
    penalidadesAdm?: itemCategoriaDadosPessoais;
  };
  habitosConsumo: {
    dadosBensServicos?: itemCategoriaDadosPessoais;
  };
  residenciais: {
    dadosResidencia?: itemCategoriaDadosPessoais;
  };
  educacaoTreinamento: {
    academicosEscolares?: itemCategoriaDadosPessoais;
    registroFinanceiro?: itemCategoriaDadosPessoais;
    qualificacaoExperienciaProf?: itemCategoriaDadosPessoais;
  };
  profissaoEmprego: {
    empregoAtual?: itemCategoriaDadosPessoais;
    recrutamento?: itemCategoriaDadosPessoais;
    rescisao?: itemCategoriaDadosPessoais;
    carreira?: itemCategoriaDadosPessoais;
    absenteismoDisciplina?: itemCategoriaDadosPessoais;
    avaliacaoDesempenho?: itemCategoriaDadosPessoais;
  };
  regVideoImgVoz: {
    videoImagem?: itemCategoriaDadosPessoais;
    imagemVigilancia?: itemCategoriaDadosPessoais;
    voz?: itemCategoriaDadosPessoais;
  };
  outros: {
    outros?: itemCategoriaDadosPessoais[];
  };
}

export interface CategoriaDadosPessoaisSensiveis {
  origemRacialEtnica?: itemCategoriaDadosPessoais;
  conviccaoReligiosa?: itemCategoriaDadosPessoais;
  opiniaoPolitica?: itemCategoriaDadosPessoais;
  filiacaoSindicato?: itemCategoriaDadosPessoais;
  filiacaoOrgReligiosa?: itemCategoriaDadosPessoais;
  filiacaoCrencaFilosofica?: itemCategoriaDadosPessoais;
  filiacaoPreferenciaPolitica?: itemCategoriaDadosPessoais;
  saudeVidaSexual?: itemCategoriaDadosPessoais;
  geneticos?: itemCategoriaDadosPessoais;
  biometricos?: itemCategoriaDadosPessoais;
}

export interface CategoriaTitulares {
  categorias: itemCategoriaTitulares[];
  criancasAdolescentes: itemCategoriaTitulares[];
  outrosGruposVulneraveis: itemCategoriaTitulares[];
}

export interface FasesCicloTratamento {
  coleta: boolean;
  retencao: boolean;
  processamento: boolean;
  compartilhamento: boolean;
  eliminacao: boolean;
}

export interface FinalidadeTratamento {
  hipoteseTratamento: { value: hipotesesTratamento };
  descricaoFinalidade: string;
  previsaoLegal: string;
  resultadosTitular: string;
  beneficiosEsperados: string;
}

export enum fontesRetencao {
  na = "Não se aplica",
  docPapel = "Documento em Papel",
  midiaEletronica = "Mídias Eletrônicas",
  docPapelMidiasEletronica = "Documento em Papel e Mídias Eletrônicas",
}

export enum hipotesesTratamento {
  consentimento = "Consentimento do titular",
  obrigacaoLegal = "Cumprimento de obrigação legal ou regulatória pelo controlador",
  politicasPublicas = "Execução de políticas públicas",
  estudoPesquisa = "Alguma espécie de estudo realizado por órgão de pesquisa",
  execucaoContratoTitular = "Execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados",
  exercicioDireitos = "Exercício regular de direitos em processo judicial, administrativo ou arbitral",
  protecaoVidaTitular = "Proteção da vida ou da incolumidade física do titular ou de terceiro",
  tutelaSaude = "Tutela da saúde",
  interessesLegitimosControlador = "Atender aos interesses legítimos do controlador ou de terceiro",
  protecaoCredito = "Proteção do crédito",
  prevencaoFraude = "Garantia da prevenção à fraude e à segurança do titular",
}

export interface itemCategoriaDadosPessoais {
  descricao: string;
  tempoRetencao: string;
  fonteRetencao: { value: fontesRetencao };
  caminhoRedeSistema: string;
}

interface itemCategoriaTitulares {
  tipoCategoria: { value: tipoCategoriaTitulares };
  descricao: string;
}

interface itemCompartilhamentoDados {
  nomeInstituicao: string;
  dadosCompartilhados: string;
  finalidadeCompartilhamento: string;
}

interface itemContratoTI {
  numeroContrato: string;
  numeroProcessoContratacao: string;
  objetoContrato: string;
  emailGestorContrato: string;
}

interface itemMedidasSegurancaPrivacidade {
  tipo: { value: tipoMedidaSegurancaPrivacidade };
  descricaoControles: string;
}

interface itemObservacoesProcesso {
  descricaoObs: string;
}

interface itemRiscoPrivacidade {
  tipoRisco: { value: tipoRiscoPrivacidade };
  observacoes: string;
}

interface itemTransferenciaInternacional {
  nomeOrganizacao: string;
  pais: string;
  dadosTransferidos: string;
  tipoGarantia: { value: tipoGarantiaTranferenciaInternacional };
}

export enum tipoCategoriaTitulares {
  beneficiarios = "Beneficiários",
  clientes = "Clientes",
  contribuintes = "Contribuintes",
  dependentes = "Dependentes",
  eleitores = "Eleitores",
  empregados = "Empregados",
  estudantes = "Estudantes",
  motoristas = "Motoristas",
  pacientes = "Pacientes",
  pessoas = "Pessoas",
  servidores = "Servidores",
  outros = "Outros (Especificar)",
}

export enum tipoGarantiaTranferenciaInternacional {
  acordoCooperacaoInt = "Acordo de cooperação internacional",
  certificacao = "Certificação regularmente emitida",
  clausulasContratuaisEspecificas = "Cláusulas contratuais específicas para determinada transferência",
  clausulasContratuaisPadrao = "Cláusulas-padrão contratuais",
  codigoConduta = "Código de conduta regularmente emitido",
  cooperacaoJuridicaInt = "Cooperação jurídica internacional entre órgãos públicos de inteligência, de investigação e de persecução, de acordo com os instrumentos de direito internacional",
  cumprimentObrigacaoLegalRegulatorioa = "Cumprimento de obrigação legal ou regulatória pelo controlador",
  execucaoContratoTitular = "Execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular",
  execucaoPoliticaPublica = "Execução de política pública ou atribuição legal do serviço público",
  exercicioDireitos = "Exercício regular de direitos em processo judicial, administrativo ou arbitral",
  consentimentoEspecificoTitular = "Fornecimento de consentimento específico pelo titular dos dados pessoais",
  normasCorporativasGlobais = "Normas corporativas globais",
  nivelAdequadoProtecaoPais = "País que fornece um nível adequado de proteção",
  protecaoVidaTitular = "Proteção da vida ou da incolumidade física do titular ou de terceiro",
  selo = "Selo regularmente emitido",
  autorizadaANPD = "Transferência autorizada pela ANPD",
}

export enum tipoMedidaSegurancaPrivacidade {
  aberturaTransparenciaNotificacao = "Abertura, Transparência e Notificação",
  compliance = "Compliance com a Privacidade",
  consentimentoEscolha = "Consentimento e Escolha",
  continuidadeNegocio = "Continuidade de Negócio",
  controleCriptografico = "Controles Criptográficos",
  controlesAcessoLógico = "Controles de Acesso Lógico",
  controleAcessoPrivacidade = "Controle de Acesso e Privacidade",
  controlesSeguranceRedeFisicaAmbiente = "Controles de Segurança em Redes, Proteção Física e do Ambiente",
  copiaSeguranca = "Cópia de Segurança",
  desenvolvimentoSeguro = "Desenvolvimento Seguro",
  gestaoCapacidadeRedundancia = "Gestão de Capacidade e Redundância",
  gestaoMudancas = "Gestão de Mudanças",
  gestaoRiscos = "Gestão de Riscos",
  legitimidadeEspecificacaoProposito = "Legitimidade e Especificação de Propósito",
  limitacaoColeta = "Limitação de Coleta",
  minimizacaoDados = "Minimização de Dados",
  participacaoIndividualAcesso = "Participação Individual e Acesso",
  precisaoQualidade = "Precisão e qualidade",
  registroEventosRastreabilidadeLogs = "Registro de Eventos, Rastreabilidade e Salvaguarda de Logs",
  responsabilizacao = "Responsabilização",
  segurancaWeb = "Segurança Web",
  usoRetencaoLimitacaoDivulgacao = "Uso, Retenção e Limitação de Divulgação",
  respostaIncidente = "Resposta a Incidente",
}

export enum tipoRiscoPrivacidade {
  acessoNaoAutorizado = "Acesso não autorizado",
  modificacaoNaoAutorizada = "Modificação não autorizada",
  perda = "Perda",
  roubo = "Roubo",
  remocaoNaoAutorizada = "Remoção não autorizada",
  colecaoExcessiva = "Coleção excessiva",
  informacaoInsuficienteFinalidadeTratamento = "Informação insuficiente sobre a finalidade do tratamento",
  tratamentoSemConsentimento = "Tratamento sem consentimento do titular dos dados pessoais (Caso o tratamento não esteja previsto em legislação ou regulação pertinente)",
  falhaConsiderarDireitos = "Falha em considerar os direitos do titular dos dados pessoais (Ex.: perda do direito de acesso)",
  compartilharDistribuirSemConsentimento = "Compartilhar ou distribuir dados pessoais com terceiros fora da administração pública federal sem o consentimento do titular dos dados pessoais",
  retencaoProlongadaSemNecessidade = "Retenção prolongada de dados pessoais sem necessidade",
  vinculacaoAssociacaoIndevida = "Vinculação ou associação indevida, direta ou indireta, dos dados pessoais ao titular",
  falhaErroProcessamento = "Falha ou erro de processamento (Ex.: execução de script de banco de dados que atualiza dado pessoal com informação equivocada, ausência de validação dos dados de entrada, etc.)",
  reidentificacaoPsudonimizados = "Reidentificação de dados pseudonimizados",
}

export interface BaseCase {
  nome: string;
  area: string;
  dataCriacao: string;
  dataAtualizacao: string;
  grupoCriador: string;
  usuarioCriador: string;
  aprovado: boolean;
  dadosPessoaisSensiveis: boolean;
  controlador: AgenteTratamento;
  encarregado: AgenteTratamento;
  extensaoEncarregado: AgenteTratamento;
  areaTratamentoDados: AgenteTratamento;
  operador: AgenteTratamento;
  fasesCicloTratamento: FasesCicloTratamento;
  descricaoFluxoTratamento: string;
  abrangenciaGeografica: string;
  fonteDados: string;
  finalidadeTratamento: FinalidadeTratamento;
  categoriaDadosPessoais: CategoriaDadosPessoais;
  categoriaDadosPessoaisSensiveis: CategoriaDadosPessoaisSensiveis;
  frequenciaTratamento: string;
  quantidadeDadosTratados: string;
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

export const emptyAgenteTratamento = (): AgenteTratamento => ({
  nome: "",
  area: "",
  telefone: "",
  email: "",
});

export const emptyItemCategoriaDadosPessoais =
  (): itemCategoriaDadosPessoais => ({
    descricao: "Não se aplica",
    tempoRetencao: "",
    fonteRetencao: { value: fontesRetencao.na },
    caminhoRedeSistema: "",
  });

export const emptyItemCategoriaTitulares = (): itemCategoriaTitulares => ({
  tipoCategoria: { value: tipoCategoriaTitulares.pessoas },
  descricao: "",
});

export const emptyItemCompatilhamentoDados = (): itemCompartilhamentoDados => ({
  nomeInstituicao: "",
  dadosCompartilhados: "",
  finalidadeCompartilhamento: "",
});

export const emptyItemMedidaSegurancaPrivacidade =
  (): itemMedidasSegurancaPrivacidade => ({
    tipo: { value: tipoMedidaSegurancaPrivacidade.consentimentoEscolha },
    descricaoControles: "",
  });

export const emptyItemTransferenciaInternacional =
  (): itemTransferenciaInternacional => ({
    nomeOrganizacao: "",
    pais: "",
    dadosTransferidos: "",
    tipoGarantia: {
      value:
        tipoGarantiaTranferenciaInternacional.consentimentoEspecificoTitular,
    },
  });

export const emptyItemContratoTI = (): itemContratoTI => ({
  numeroContrato: "",
  numeroProcessoContratacao: "",
  objetoContrato: "",
  emailGestorContrato: "",
});

export const emptyItemRiscoPrivacidade = (): itemRiscoPrivacidade => ({
  tipoRisco: { value: tipoRiscoPrivacidade.tratamentoSemConsentimento },
  observacoes: "",
});

export const emptyItemObservacoesProcesso = (): itemObservacoesProcesso => ({
  descricaoObs: "",
});

export const emptyCase = (): Case => ({
  id: 0,
  nome: "",
  area: "",
  aprovado: false,
  grupoCriador: "",
  usuarioCriador: "",
  dataCriacao: new Date().toDateString(),
  dataAtualizacao: new Date().toDateString(),
  controlador: emptyAgenteTratamento(),
  encarregado: emptyAgenteTratamento(),
  extensaoEncarregado: emptyAgenteTratamento(),
  areaTratamentoDados: emptyAgenteTratamento(),
  operador: emptyAgenteTratamento(),
  fasesCicloTratamento: {
    coleta: false,
    retencao: false,
    processamento: false,
    compartilhamento: false,
    eliminacao: false,
  },
  descricaoFluxoTratamento: "",
  abrangenciaGeografica: "",
  fonteDados: "",
  finalidadeTratamento: {
    hipoteseTratamento: { value: hipotesesTratamento.consentimento },
    descricaoFinalidade: "",
    previsaoLegal: "",
    resultadosTitular: "",
    beneficiosEsperados: "",
  },
  categoriaDadosPessoais: {
    identificacao: {
      idPessoal: emptyItemCategoriaDadosPessoais(),
      idGov: emptyItemCategoriaDadosPessoais(),
      idEletronica: emptyItemCategoriaDadosPessoais(),
      locEletronica: emptyItemCategoriaDadosPessoais(),
    },
    financeiros: {
      idFin: emptyItemCategoriaDadosPessoais(),
      recursosFin: emptyItemCategoriaDadosPessoais(),
      dividasDespesas: emptyItemCategoriaDadosPessoais(),
      solvencia: emptyItemCategoriaDadosPessoais(),
      emprestimosHipotecaCredito: emptyItemCategoriaDadosPessoais(),
      assistenciaFin: emptyItemCategoriaDadosPessoais(),
      apoliceSeguro: emptyItemCategoriaDadosPessoais(),
      planoPensao: emptyItemCategoriaDadosPessoais(),
      transacaoFin: emptyItemCategoriaDadosPessoais(),
      compensacao: emptyItemCategoriaDadosPessoais(),
      atividadeProfissional: emptyItemCategoriaDadosPessoais(),
      acordosAjustes: emptyItemCategoriaDadosPessoais(),
      autorizacoesConsentimentos: emptyItemCategoriaDadosPessoais(),
    },
    caracteristicas: {
      detalhesPessoais: emptyItemCategoriaDadosPessoais(),
      detalhesMilitares: emptyItemCategoriaDadosPessoais(),
      situacaoImigracao: emptyItemCategoriaDadosPessoais(),
      descricaoFisica: emptyItemCategoriaDadosPessoais(),
    },
    habitos: {
      habitos: emptyItemCategoriaDadosPessoais(),
      estiloVida: emptyItemCategoriaDadosPessoais(),
      viagensDeslocamento: emptyItemCategoriaDadosPessoais(),
      contatosSociais: emptyItemCategoriaDadosPessoais(),
      posses: emptyItemCategoriaDadosPessoais(),
      denunciasIncidentesAcidentes: emptyItemCategoriaDadosPessoais(),
      distincoes: emptyItemCategoriaDadosPessoais(),
      usoMidia: emptyItemCategoriaDadosPessoais(),
    },
    caracteristicasPsicologicas: {
      descricaoPsi: emptyItemCategoriaDadosPessoais(),
    },
    composicaoFamiliar: {
      casamentoCoabitacao: emptyItemCategoriaDadosPessoais(),
      historicoConjugal: emptyItemCategoriaDadosPessoais(),
      membrosFamilia: emptyItemCategoriaDadosPessoais(),
    },
    interessesLazer: {
      atividadesInteressesLaz: emptyItemCategoriaDadosPessoais(),
    },
    associacoes: {
      outrasAssociacoesNaoSensiveis: emptyItemCategoriaDadosPessoais(),
    },
    processoJudAdmCrim: {
      suspeitas: emptyItemCategoriaDadosPessoais(),
      condenacoesSentencas: emptyItemCategoriaDadosPessoais(),
      acoesJud: emptyItemCategoriaDadosPessoais(),
      penalidadesAdm: emptyItemCategoriaDadosPessoais(),
    },
    habitosConsumo: {
      dadosBensServicos: emptyItemCategoriaDadosPessoais(),
    },
    residenciais: {
      dadosResidencia: emptyItemCategoriaDadosPessoais(),
    },
    educacaoTreinamento: {
      academicosEscolares: emptyItemCategoriaDadosPessoais(),
      registroFinanceiro: emptyItemCategoriaDadosPessoais(),
      qualificacaoExperienciaProf: emptyItemCategoriaDadosPessoais(),
    },
    profissaoEmprego: {
      empregoAtual: emptyItemCategoriaDadosPessoais(),
      recrutamento: emptyItemCategoriaDadosPessoais(),
      rescisao: emptyItemCategoriaDadosPessoais(),
      carreira: emptyItemCategoriaDadosPessoais(),
      absenteismoDisciplina: emptyItemCategoriaDadosPessoais(),
      avaliacaoDesempenho: emptyItemCategoriaDadosPessoais(),
    },
    regVideoImgVoz: {
      videoImagem: emptyItemCategoriaDadosPessoais(),
      imagemVigilancia: emptyItemCategoriaDadosPessoais(),
      voz: emptyItemCategoriaDadosPessoais(),
    },
    outros: {
      outros: [],
    },
  },
  dadosPessoaisSensiveis: false,
  categoriaDadosPessoaisSensiveis: {
    origemRacialEtnica: emptyItemCategoriaDadosPessoais(),
    conviccaoReligiosa: emptyItemCategoriaDadosPessoais(),
    opiniaoPolitica: emptyItemCategoriaDadosPessoais(),
    filiacaoSindicato: emptyItemCategoriaDadosPessoais(),
    filiacaoOrgReligiosa: emptyItemCategoriaDadosPessoais(),
    filiacaoCrencaFilosofica: emptyItemCategoriaDadosPessoais(),
    filiacaoPreferenciaPolitica: emptyItemCategoriaDadosPessoais(),
    saudeVidaSexual: emptyItemCategoriaDadosPessoais(),
    geneticos: emptyItemCategoriaDadosPessoais(),
    biometricos: emptyItemCategoriaDadosPessoais(),
  },
  frequenciaTratamento: "",
  quantidadeDadosTratados: "",
  categoriasTitulares: {
    categorias: [emptyItemCategoriaTitulares()],
    criancasAdolescentes: [],
    outrosGruposVulneraveis: [],
  },
  compartilhamentoDadosPessoais: [],
  medidasSegurancaPrivacidade: [],
  transferenciaInternacional: [],
  contratoServicosTITratamentoDados: [],
  riscosPrivacidade: [],
  observacoesProcesso: [],
});

export const emptyBaseCase = (): BaseCase => ({
  nome: "",
  area: "",
  aprovado: false,
  grupoCriador: "",
  usuarioCriador: "",
  dataCriacao: new Date().toDateString(),
  dataAtualizacao: new Date().toDateString(),
  controlador: emptyAgenteTratamento(),
  encarregado: emptyAgenteTratamento(),
  extensaoEncarregado: emptyAgenteTratamento(),
  areaTratamentoDados: emptyAgenteTratamento(),
  operador: emptyAgenteTratamento(),
  fasesCicloTratamento: {
    coleta: false,
    retencao: false,
    processamento: false,
    compartilhamento: false,
    eliminacao: false,
  },
  descricaoFluxoTratamento: "",
  abrangenciaGeografica: "",
  fonteDados: "",
  finalidadeTratamento: {
    hipoteseTratamento: { value: hipotesesTratamento.consentimento },
    descricaoFinalidade: "",
    previsaoLegal: "",
    resultadosTitular: "",
    beneficiosEsperados: "",
  },
  categoriaDadosPessoais: {
    identificacao: {
      idPessoal: emptyItemCategoriaDadosPessoais(),
      idGov: emptyItemCategoriaDadosPessoais(),
      idEletronica: emptyItemCategoriaDadosPessoais(),
      locEletronica: emptyItemCategoriaDadosPessoais(),
    },
    financeiros: {
      idFin: emptyItemCategoriaDadosPessoais(),
      recursosFin: emptyItemCategoriaDadosPessoais(),
      dividasDespesas: emptyItemCategoriaDadosPessoais(),
      solvencia: emptyItemCategoriaDadosPessoais(),
      emprestimosHipotecaCredito: emptyItemCategoriaDadosPessoais(),
      assistenciaFin: emptyItemCategoriaDadosPessoais(),
      apoliceSeguro: emptyItemCategoriaDadosPessoais(),
      planoPensao: emptyItemCategoriaDadosPessoais(),
      transacaoFin: emptyItemCategoriaDadosPessoais(),
      compensacao: emptyItemCategoriaDadosPessoais(),
      atividadeProfissional: emptyItemCategoriaDadosPessoais(),
      acordosAjustes: emptyItemCategoriaDadosPessoais(),
      autorizacoesConsentimentos: emptyItemCategoriaDadosPessoais(),
    },
    caracteristicas: {
      detalhesPessoais: emptyItemCategoriaDadosPessoais(),
      detalhesMilitares: emptyItemCategoriaDadosPessoais(),
      situacaoImigracao: emptyItemCategoriaDadosPessoais(),
      descricaoFisica: emptyItemCategoriaDadosPessoais(),
    },
    habitos: {
      habitos: emptyItemCategoriaDadosPessoais(),
      estiloVida: emptyItemCategoriaDadosPessoais(),
      viagensDeslocamento: emptyItemCategoriaDadosPessoais(),
      contatosSociais: emptyItemCategoriaDadosPessoais(),
      posses: emptyItemCategoriaDadosPessoais(),
      denunciasIncidentesAcidentes: emptyItemCategoriaDadosPessoais(),
      distincoes: emptyItemCategoriaDadosPessoais(),
      usoMidia: emptyItemCategoriaDadosPessoais(),
    },
    caracteristicasPsicologicas: {
      descricaoPsi: emptyItemCategoriaDadosPessoais(),
    },
    composicaoFamiliar: {
      casamentoCoabitacao: emptyItemCategoriaDadosPessoais(),
      historicoConjugal: emptyItemCategoriaDadosPessoais(),
      membrosFamilia: emptyItemCategoriaDadosPessoais(),
    },
    interessesLazer: {
      atividadesInteressesLaz: emptyItemCategoriaDadosPessoais(),
    },
    associacoes: {
      outrasAssociacoesNaoSensiveis: emptyItemCategoriaDadosPessoais(),
    },
    processoJudAdmCrim: {
      suspeitas: emptyItemCategoriaDadosPessoais(),
      condenacoesSentencas: emptyItemCategoriaDadosPessoais(),
      acoesJud: emptyItemCategoriaDadosPessoais(),
      penalidadesAdm: emptyItemCategoriaDadosPessoais(),
    },
    habitosConsumo: {
      dadosBensServicos: emptyItemCategoriaDadosPessoais(),
    },
    residenciais: {
      dadosResidencia: emptyItemCategoriaDadosPessoais(),
    },
    educacaoTreinamento: {
      academicosEscolares: emptyItemCategoriaDadosPessoais(),
      registroFinanceiro: emptyItemCategoriaDadosPessoais(),
      qualificacaoExperienciaProf: emptyItemCategoriaDadosPessoais(),
    },
    profissaoEmprego: {
      empregoAtual: emptyItemCategoriaDadosPessoais(),
      recrutamento: emptyItemCategoriaDadosPessoais(),
      rescisao: emptyItemCategoriaDadosPessoais(),
      carreira: emptyItemCategoriaDadosPessoais(),
      absenteismoDisciplina: emptyItemCategoriaDadosPessoais(),
      avaliacaoDesempenho: emptyItemCategoriaDadosPessoais(),
    },
    regVideoImgVoz: {
      videoImagem: emptyItemCategoriaDadosPessoais(),
      imagemVigilancia: emptyItemCategoriaDadosPessoais(),
      voz: emptyItemCategoriaDadosPessoais(),
    },
    outros: {
      outros: [],
    },
  },
  dadosPessoaisSensiveis: false,
  categoriaDadosPessoaisSensiveis: {
    origemRacialEtnica: emptyItemCategoriaDadosPessoais(),
    conviccaoReligiosa: emptyItemCategoriaDadosPessoais(),
    opiniaoPolitica: emptyItemCategoriaDadosPessoais(),
    filiacaoSindicato: emptyItemCategoriaDadosPessoais(),
    filiacaoOrgReligiosa: emptyItemCategoriaDadosPessoais(),
    filiacaoCrencaFilosofica: emptyItemCategoriaDadosPessoais(),
    filiacaoPreferenciaPolitica: emptyItemCategoriaDadosPessoais(),
    saudeVidaSexual: emptyItemCategoriaDadosPessoais(),
    geneticos: emptyItemCategoriaDadosPessoais(),
    biometricos: emptyItemCategoriaDadosPessoais(),
  },
  frequenciaTratamento: "",
  quantidadeDadosTratados: "",
  categoriasTitulares: {
    categorias: [emptyItemCategoriaTitulares()],
    criancasAdolescentes: [],
    outrosGruposVulneraveis: [],
  },
  compartilhamentoDadosPessoais: [],
  medidasSegurancaPrivacidade: [],
  transferenciaInternacional: [],
  contratoServicosTITratamentoDados: [],
  riscosPrivacidade: [],
  observacoesProcesso: [],
});

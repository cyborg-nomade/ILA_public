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

export enum tipoAbrangenciaGeografica {
  nacional = "Nacional",
  estadual = "Estadual",
  municipal = "Municipal",
  regional = "Regional",
}

export enum tipoCategoriaTitulares {
  colaboradores = "Colaboradores",
  dependentes = "Dependentes",
  empregados = "Empregados Terceirizados",
  clientes = "Clientes",
  outros = "Outros",
}

export enum tipoCompartilhamentoDados {
  publico = "Público",
  privado = "Privado",
}

export enum tipoFinalidadeCompartilhamento {
  execuçãoDescentralizadaAtividadePublica = "I. execução descentralizada de atividade pública, exclusivamente para esse fim específico e determinado",
  dadosAcessiveisPublicamente = "II. dados acessíveis publicamente",
  previsãoLegal = "III. previsão legal",
  transferênciaRespaldadaContratos = "IV. transferência respaldada em contratos, convênios ou instrumentos congêneres comunicados previamente à ANPD, nos termos do artigo 26, § 2º da LGPD",
  prevençãoFraudesIrregularidades = "V. prevenção de fraudes e irregularidades",
  proteçãoSegurancaIntegridadeTitular = "VI. proteção à segurança e à integridade do Titular de Dados Pessoais",
  consentimento = "VII. com o consentimento do Titular de Dados Pessoais",
}

export enum tipoFontesRetencao {
  docPapel = "Documento em Papel",
  docEletronico = "Documento Eletrônico",
  sistema = "Sistema",
}

export enum tipoFrequenciaTratamento {
  total24por7 = "24/7",
  horarioOperacional = "Horário Operacional",
  horarioComercial = "Horário Comercial",
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

export enum tipoNivelCompartilhamento {
  todoOProcesso = "Todo o processo",
  parcial = "Parcial",
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

export enum tipoTempoRetencao {
  ano1 = "1 ano",
  ano5 = "5 anos",
  ano10 = "10 anos",
  ano15 = "15 anos",
  ano20 = "20 anos",
}

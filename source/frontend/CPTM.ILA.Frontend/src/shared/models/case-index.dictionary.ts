export const CaseIndexDictionary = {
    nome: { number: "1.1", title: "Nome" },
    id: { number: "1.2", title: "ID" },
    ref: { number: "1.2", title: "Ref" },
    dataCriacao: { number: "1.3", title: "Data de Criação do Inventário" },
    dataAtualizacao: { number: "1.4", title: "Data Atualização do Inventário" },
    controlador: { number: "2.1", title: "Controlador" },
    encarregado: { number: "2.2.1", title: "Encarregado" },
    extensaoEncarregado: { number: "2.2.2", title: "Extensão Encarregado" },
    areaTratamentoDados: { number: "2.3", title: "Área Tratamento Dados" },
    operador: { number: "2.4", title: "Operador" },
    fasesCicloTratamento: {
        number: "3.1",
        title: "Em qual fase do ciclo de vida o Operador atua?",
    },
    descricaoFluxoTratamento: { number: "4.1", title: "Descrição do Fluxo" },
    abrangenciaGeografica: {
        number: "5.1",
        title: "Abrangência da área geográfica do tratamento",
    },
    fonteDados: {
        number: "5.2",
        title: "Fonte de dados utilizada para obtenção dos dados pessoais",
    },
    finalidadeTratamento: {
        hipoteseTratamento: { number: "6.1", title: "Hipótese de Tratamento" },
        descricaoFinalidade: { number: "6.2", title: "Finalidade" },
        previsaoLegal: { number: "6.3", title: "Previsão legal" },
        resultadosTitular: {
            number: "6.4",
            title: "Resultados pretendidos para o titular de dados",
        },
        beneficiosEsperados: {
            number: "6.5",
            title:
                "Benefícios esperados para o órgão, entidade ou para a\n" +
                "                    sociedade como um todo",
        },
    },
    categoriaDadosPessoais: {
        identificacao: {
            idPessoal: {
                number: "7.1.1",
                title: "Informações de identificação pessoal",
            },
            idGov: {
                number: "7.1.2",
                title:
                    "Informações de identificação atribuídas por\n" +
                    "                            instituições governamentais",
            },
            idEletronica: {
                number: "7.1.3",
                title: "Dados de identificação eletrônica",
            },
            locEletronica: {
                number: "7.1.4",
                title: "Dados de localização eletrônica",
            },
        },
        financeiros: {
            idFin: {
                number: "7.2.1",
                title: "Dados de identificação financeira",
            },
            recursosFin: { number: "7.2.2", title: "Recursos financeiros" },
            dividasDespesas: { number: "7.2.3", title: "Dívidas e despesas" },
            solvencia: {
                number: "7.2.4",
                title: "Situação financeira (Solvência)",
            },
            emprestimosHipotecaCredito: {
                number: "7.2.5",
                title: "Empréstimos, hipotecas, linhas de crédito",
            },
            assistenciaFin: {
                number: "7.2.6",
                title: "Assistência financeira",
            },
            apoliceSeguro: {
                number: "7.2.7",
                title: "Detalhes da apólice de seguro",
            },
            planoPensao: {
                number: "7.2.8",
                title: "Detalhes do plano de pensão",
            },
            transacaoFin: { number: "7.2.9", title: "Transações financeiras" },
            compensacao: { number: "7.2.10", title: "Compensação" },
            atividadeProfissional: {
                number: "7.2.11",
                title: "Atividades profissionais",
            },
            acordosAjustes: { number: "7.2.12", title: "Acordos e ajustes" },
            autorizacoesConsentimentos: {
                number: "7.2.13",
                title: "Autorizações ou consentimentos",
            },
        },
        caracteristicas: {
            detalhesPessoais: { number: "7.3.1", title: "Detalhes pessoais" },
            detalhesMilitares: { number: "7.3.2", title: "Detalhes militares" },
            situacaoImigracao: {
                number: "7.3.3",
                title: "Situação de Imigração",
            },
            descricaoFisica: { number: "7.3.4", title: "Descrição Física" },
        },
        habitos: {
            habitosPessoais: { number: "7.4.1", title: "Hábitos" },
            estiloVida: { number: "7.4.2", title: "Estilo de vida" },
            viagensDeslocamento: {
                number: "7.4.3",
                title: "Viagens e deslocamentos",
            },
            contatosSociais: { number: "7.4.4", title: "Contatos sociais" },
            posses: { number: "7.4.5", title: "Posses" },
            denunciasIncAcidentes: {
                number: "7.4.6",
                title: "Denúncias, incidentes ou acidentes",
            },
            distincoes: { number: "7.4.7", title: "Distinções" },
            usoMidia: { number: "7.4.8", title: "Uso de mídia" },
        },
        caracteristicasPsicologicas: {
            descricaoPsi: { number: "7.5.1", title: "Descrição Psicológica" },
        },
        composicaoFamiliar: {
            casamentoCoabitacao: {
                number: "7.6.1",
                title: "Casamento ou forma atual de coabitação",
            },
            historicoConjugal: { number: "7.6.2", title: "Histórico conjugal" },
            membrosFamilia: {
                number: "7.6.3",
                title: "Familiares ou membros da família",
            },
        },
        interessesLazer: {
            atividadesInteressesLaz: {
                number: "7.7.1",
                title: "Atividades e interesses de lazer",
            },
        },
        associacoes: {
            outrasAssNaoSensiveis: {
                number: "7.8.1",
                title: "Associações (exceto profissionais, políticas, em sindicatos ou qualquer outra associação que se enquadre em dados pessoais sensíveis)",
            },
        },
        processoJudAdmCrim: {
            suspeitas: { number: "7.9.1", title: "Suspeitas" },
            condenacoesSentencas: {
                number: "7.9.2",
                title: "Condenações e sentenças",
            },
            acoesJud: { number: "7.9.3", title: "Ações judiciais" },
            penalidadesAdm: {
                number: "7.9.4",
                title: "Penalidades Administrativas",
            },
        },
        habitosConsumo: {
            dadosBensServicos: {
                number: "7.10.1",
                title: "Dados de bens e serviços",
            },
        },
        residenciais: {
            dadosResidencia: { number: "7.11.1", title: "Residência" },
        },
        educacaoTreinamento: {
            academicosEscolares: {
                number: "7.12.1",
                title: "Dados acadêmicos/escolares",
            },
            registroFinanceiro: {
                number: "7.12.2",
                title: "Registros financeiros do curso/treinamento",
            },
            qualificacaoExperienciaProf: {
                number: "7.12.3",
                title: "Qualificação e experiência profissional",
            },
        },
        profissaoEmprego: {
            empregoAtual: { number: "7.13.1", title: "Emprego atual" },
            recrutamento: { number: "7.13.2", title: "Recrutamento" },
            rescisao: { number: "7.13.3", title: "Rescisão de trabalho" },
            carreira: { number: "7.13.4", title: "Carreira" },
            absenteismoDisciplina: {
                number: "7.13.5",
                title: "Absentismo e disciplina",
            },
            avaliacaoDesempenho: {
                number: "7.13.6",
                title: "Avaliação de Desempenho",
            },
        },
        regVideoImgVoz: {
            videoImagem: { number: "7.14.1", title: "Vídeo e imagem" },
            imagemVigilancia: {
                number: "7.14.2",
                title: "Imagem de Vigilância",
            },
            voz: { number: "7.14.3", title: "Voz" },
        },
        outros: {
            outrosItems: { number: "7.15.1", title: "Outros (Especificar)" },
        },
    },
    catDadosPessoaisSensiveis: {
        origemRacialEtnica: {
            number: "8.1",
            title: "Dados que revelam origem racial ou étnica",
        },
        conviccaoReligiosa: {
            number: "8.2",
            title: "Dados que revelam convicção religiosa",
        },
        opiniaoPolitica: {
            number: "8.3",
            title: "Dados que revelam opinião política",
        },
        filiacaoSindicato: {
            number: "8.4",
            title: "Dados que revelam filiação a sindicato",
        },
        filiacaoOrgReligiosa: {
            number: "8.5",
            title: "Dados que revelam filiação a organização de caráter religioso",
        },
        filiacaoCrencaFilosofica: {
            number: "8.6",
            title: "Dados que revelam filiação ou crença filosófica",
        },
        filiacaoPreferenciaPolitica: {
            number: "8.7",
            title: "Dados que revelam filiação ou preferências política",
        },
        saudeVidaSexual: {
            number: "8.8",
            title: "Dados referentes à saúde ou à vida sexual",
        },
        geneticos: { number: "8.9", title: "Dados genéticos" },
        biometricos: { number: "8.10", title: "Dados biométricos" },
    },
    frequenciaTratamento: {
        number: "9.1",
        title: "Frequência de tratamento dos dados pessoais",
    },
    qtdeDadosTratados: {
        number: "9.2",
        title: "Quantidade de dados pessoais totais tratados",
    },
    qtdeDadosSensiveisTratados: {
        number: "9.2",
        title: "Quantidade de dados pessoais sensíveis tratados",
    },
    categoriasTitulares: {
        categorias: { number: "10.1", title: "Categorias gerais" },
        criancasAdolescentes: {
            number: "10.2",
            title: "Categorias que envolvam crianças e adolescentes",
        },
        outrosGruposVulneraveis: {
            number: "10.3",
            title: "Categorias que envolvam outros grupos vulneráveis",
        },
    },
    compartilhamentoDadosPessoais: {
        number: "11",
        title: "Compartilhamento de Dados Pessoais",
    },
    medidasSegurancaPrivacidade: {
        number: "12",
        title: "Medidas de Segurança/Privacidade",
    },
    transferenciaInternacional: {
        number: "13",
        title: "Transferência Internacional de Dados Pessoais",
    },
    contratoServicosTITratamentoDados: {
        number: "14",
        title:
            "Contrato(s) de serviços e/ou soluções de TI que trata(m)\n" +
            "              dados pessoais do serviço/processo de negócio",
    },
    riscosPrivacidade: { number: "15", title: "Risco de Privacidade" },
    observacoesProcesso: {
        number: "16",
        title: "Observações sobre o Processo",
    },
};

export interface CaseListItem {
    id: string;
    ref: string;
    nome: string;
    area: string;
    dataEnvio: string;
    dataAprovacao: string;
    dataProxRevisao: string;
    usuarioResp: string;
    dadosPessoaisSensiveis: string;
    grupoCriadorId: number;
    aprovado: boolean;
    reprovado: boolean;
    encaminhadoAprovacao: boolean;
    comiteMemberResp: string;
}

export type headersCaseListItem = keyof CaseListItem;

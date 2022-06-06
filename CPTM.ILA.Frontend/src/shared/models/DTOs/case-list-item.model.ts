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
}

export type headersCaseListItem = keyof CaseListItem;

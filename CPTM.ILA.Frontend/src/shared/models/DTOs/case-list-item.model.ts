import { hipotesesTratamento } from "../case-helpers/enums.model";

export interface CaseListItem {
  id: string;
  nome: string;
  area: string;
  dataCriacao: string;
  dataAtualizacao: string;
  hipotesesTratamento: string;
  descricaoFinalidade: string;
  dadosPessoaisSensiveis: string;
  grupoCriador: string;
}

export type headersCaseListItem = keyof CaseListItem;

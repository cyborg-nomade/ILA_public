import { hipotesesTratamento } from "../case-helpers/enums.model";

export interface CaseListItem {
  id: string;
  nome: string;
  area: string;
  dataCriacao: string;
  dataAtualizacao: string;
  hipoteseTratamento: { value: hipotesesTratamento };
  descricaoFinalidade: string;
  dadosPessoaisSensiveis: string;
  grupoCriador: string;
}

export type headersCaseListItem = keyof CaseListItem;

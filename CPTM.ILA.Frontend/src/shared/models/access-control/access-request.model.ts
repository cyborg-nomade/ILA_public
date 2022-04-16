import { AccessRequestDTO } from "../DTOs/access-request-dto.model";
import { Group } from "./group.model";

export enum tipoSolicitacaoAcesso {
  AcessoAoSistema,
  AcessoAGrupos,
  AcessoComite,
}

export interface BaseAccessRequest {
  usernameSolicitante: string;
  usernameSuperior: string;
  justificativa: string;
  groups: Group[];
  tipoSolicitacaoAcesso: tipoSolicitacaoAcesso;
}

export interface AccessRequest extends BaseAccessRequest {
  id: number;
  emailSuperiorPath: string;
}

export type headersAccessRequestsList = keyof AccessRequestDTO;

export const emptyAccessRequest = (): BaseAccessRequest | AccessRequest => {
  return {
    usernameSolicitante: "",
    usernameSuperior: "",
    justificativa: "",
    tipoSolicitacaoAcesso: tipoSolicitacaoAcesso.AcessoAoSistema,
    groups: [],
  };
};

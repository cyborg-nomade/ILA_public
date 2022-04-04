export enum tipoSolicitacaoAcesso {
  AcessoAoSistema,
  AcessoAGrupos,
  AcessoComite,
}

export interface BaseAccessRequest {
  usernameSolicitante: string;
  justificativa: string;
  usernameSuperior: string;
  tipoSolicitacaoAcesso: tipoSolicitacaoAcesso;
  groups: string[];
}

export interface AccessRequest extends BaseAccessRequest {
  id: number;
  emailSuperiorPath: string;
}

export type headersAccessRequestsList = keyof AccessRequest;

export const emptyAccessRequest = (): BaseAccessRequest | AccessRequest => {
  return {
    usernameSolicitante: "",
    usernameSuperior: "",
    justificativa: "",
    tipoSolicitacaoAcesso: tipoSolicitacaoAcesso.AcessoAoSistema,
    groups: [],
  };
};

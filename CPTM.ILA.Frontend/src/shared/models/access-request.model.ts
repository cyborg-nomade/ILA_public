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
}

export interface AccessRequest extends BaseAccessRequest {
  id: number;
}

export type headersAccessRequestsList = keyof AccessRequest;

export const emptyAccessRequest = (): BaseAccessRequest | AccessRequest => {
  return {
    usernameSolicitante: "",
    usernameSuperior: "",
    justificativa: "",
    tipoSolicitacaoAcesso: tipoSolicitacaoAcesso.AcessoAoSistema,
  };
};

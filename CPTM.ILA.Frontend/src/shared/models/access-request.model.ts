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

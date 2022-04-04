import { tipoSolicitacaoAcesso } from "../access-control/access-request.model";

export interface AccessRequestDTO {
  usernameSolicitante: string;
  usernameSuperior: string;
  justificativa: string;
  groupNames: string[];
  tipoSolicitacaoAcesso: tipoSolicitacaoAcesso;
}

export const emptyAccessRequestDTO = (): AccessRequestDTO => {
  return {
    usernameSolicitante: "",
    usernameSuperior: "",
    justificativa: "",
    tipoSolicitacaoAcesso: tipoSolicitacaoAcesso.AcessoAoSistema,
    groupNames: [],
  };
};

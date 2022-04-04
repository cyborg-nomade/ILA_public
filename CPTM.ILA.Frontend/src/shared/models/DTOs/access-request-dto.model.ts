import { tipoSolicitacaoAcesso } from "../access-control/access-request.model";

export interface AccessRequestDTO {
  usernameSolicitante: string;
  usernameSuperior: string;
  justificativa: string;
  groupNames: string[];
  emailFile: any;
  tipoSolicitacaoAcesso: tipoSolicitacaoAcesso;
}

export const emptyAccessRequestDTO = (): AccessRequestDTO => {
  return {
    usernameSolicitante: "",
    usernameSuperior: "",
    justificativa: "",
    groupNames: [],
    emailFile: null,
    tipoSolicitacaoAcesso: tipoSolicitacaoAcesso.AcessoAoSistema,
  };
};

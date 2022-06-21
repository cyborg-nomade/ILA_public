import { tipoSolicitacaoAcesso } from "../access-control/access-request.model";

export interface AccessRequestDTO {
  id: number;
  usernameSolicitante: string;
  usernameSuperior: string;
  justificativa: string;
  groupNames: string[];
  emailFile: File;
  tipoSolicitacaoAcesso: tipoSolicitacaoAcesso;
}

export const emptyAccessRequestDTO = (): AccessRequestDTO => {
  return {
    id: 0,
    usernameSolicitante: "",
    usernameSuperior: "",
    justificativa: "",
    groupNames: [],
    emailFile: new File([""], "emptyFile.txt"),
    tipoSolicitacaoAcesso: tipoSolicitacaoAcesso.AcessoAoSistema,
  };
};

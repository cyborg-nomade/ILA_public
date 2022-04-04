import { createContext } from "react";
import {
  AgenteTratamento,
  emptyAgenteTratamento,
} from "../models/case-helpers/case-helpers.model";

export const AuthContext = createContext({
  userId: "",
  username: "",
  isComite: false,
  isDpo: false,
  isDeveloper: false,
  token: "",
  currentGroup: "",
  areaTratamentoDados: emptyAgenteTratamento(),
  isLoggedIn: false,
  login: (
    uid: string,
    username: string,
    isComite: boolean,
    isDpo: boolean,
    isDeveloper: boolean,
    token: string,
    currentGroup: string,
    areaTratamentoDados: AgenteTratamento
  ) => {},
  logout: () => {},
  changeGroup: (g: string) => {},
});

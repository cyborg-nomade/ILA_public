import { createContext } from "react";
import { Group } from "../models/access-control/group.model";
import { emptyGroup } from "./../models/access-control/group.model";
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
  currentGroup: emptyGroup(),
  userGroups: [] as Group[],
  areaTratamentoDados: emptyAgenteTratamento(),
  isLoggedIn: false,
  login: (
    uid: string,
    username: string,
    isComite: boolean,
    isDpo: boolean,
    isDeveloper: boolean,
    token: string,
    currentGroup: Group,
    userGroups: Group[],
    areaTratamentoDados: AgenteTratamento
  ) => {},
  logout: () => {},
  changeGroup: (g: Group) => {},
});

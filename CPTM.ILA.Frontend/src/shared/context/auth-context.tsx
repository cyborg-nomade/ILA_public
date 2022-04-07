import { createContext } from "react";
import { Group } from "../models/access-control/group.model";
import { emptyGroup } from "./../models/access-control/group.model";
import {
  AgenteTratamento,
  emptyAgenteTratamento,
} from "../models/case-helpers/case-helpers.model";
import { emptyUser, User } from "../models/access-control/users.model";
import { boolean } from "yup/lib/locale";

export const AuthContext = createContext({
  user: emptyUser(),
  isDeveloper: false,
  token: "",
  currentGroup: emptyGroup(),
  areaTratamentoDados: emptyAgenteTratamento(),
  isLoggedIn: false,
  login: (
    user: User,
    isDeveloper: boolean,
    token: string,
    currentGroup: Group,
    areaTratamentoDados: AgenteTratamento
  ) => {},
  logout: () => {},
  changeGroup: (g: Group) => {},
});

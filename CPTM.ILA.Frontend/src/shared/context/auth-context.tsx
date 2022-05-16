import { createContext } from "react";

import { emptyGroup, Group } from "../models/access-control/group.model";
import {
  AgenteTratamento,
  emptyAgenteTratamento,
} from "../models/case-helpers/case-helpers.model";
import { emptyUser, User } from "../models/access-control/users.model";
import { ComiteMember, emptyComiteMember } from "../models/DTOs/comite-member";

export const AuthContext = createContext({
  user: emptyUser(),
  isDeveloper: false,
  token: "",
  currentGroup: emptyGroup(),
  currentComiteMember: emptyComiteMember(),
  areaTratamentoDados: emptyAgenteTratamento(),
  isLoggedIn: false,
  tokenExpirationDate: new Date(),
  login: (
    user: User,
    isDeveloper: boolean,
    token: string,
    currentGroup: Group,
    areaTratamentoDados: AgenteTratamento
  ) => {},
  logout: () => {},
  changeGroup: (g: Group) => {},
  changeComiteMember: (cm: ComiteMember) => {},
});

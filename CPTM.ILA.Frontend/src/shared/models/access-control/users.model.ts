import { Case } from "../cases.model";
import { AuthUser } from "../DTOs/auth-user";
import { emptyGroup, Group } from "./group.model";

export interface User extends AuthUser {
  id: number;
  isComite: boolean;
  isDpo: boolean;
  isSystem: boolean;
  isDeveloper: boolean;
  cases: Case[];
  originGroup: Group;
  groups: Group[];
  groupAccessExpirationDate: Date;
}

export const emptyUser = (): User => {
  return {
    id: 0,
    username: "",
    password: "",
    isComite: false,
    isDpo: false,
    isSystem: false,
    isDeveloper: false,
    cases: [],
    originGroup: emptyGroup(),
    groups: [],
    groupAccessExpirationDate: new Date(),
  };
};

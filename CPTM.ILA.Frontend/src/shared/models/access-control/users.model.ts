import { AuthUser } from "../DTOs/auth-user.model";
import { emptyGroup, Group } from "./group.model";

export interface User extends AuthUser {
  id: number;
  isComite: boolean;
  isDPO: boolean;
  isSystem: boolean;
  isDeveloper: boolean;
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
    isDPO: false,
    isSystem: false,
    isDeveloper: false,
    originGroup: emptyGroup(),
    groups: [],
    groupAccessExpirationDate: new Date(),
  };
};

import { Case } from "../cases.model";
import { Group } from "./group.model";

export interface BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseUser {
  id: string;
  isComite: boolean;
  isDpo: boolean;
  isSystem: boolean;
  isDeveloper: boolean;
  cases: Case[];
  originGroup: string;
  groups: Group[];
  groupAccessExpirationDate: Date;
}

import { Case } from "../cases.model";
import { AuthUser } from "../DTOs/auth-user";
import { Group } from "./group.model";

export interface User extends AuthUser {
  id: string;
  isComite: boolean;
  isDpo: boolean;
  isSystem: boolean;
  isDeveloper: boolean;
  cases: Case[];
  originGroup: Group;
  groups: Group[];
  groupAccessExpirationDate: Date;
}

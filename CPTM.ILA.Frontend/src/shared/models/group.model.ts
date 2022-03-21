import { User } from "./users.model";
import { Case } from "./cases.model";

export interface BaseGroup {
  nome: string;
  users: User[];
  cases: Case[];
}

export interface Group extends BaseGroup {
  id: number;
}

export const emptyGroup = (): Group => {
  return {
    nome: "",
    cases: [],
    users: [],
    id: 0,
  };
};

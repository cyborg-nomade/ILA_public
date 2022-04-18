import { User } from "./users.model";

export interface BaseGroup {
  nome: string;
  users: User[];
}

export interface Group extends BaseGroup {
  id: number;
}

export const emptyGroup = (): Group => {
  return {
    nome: "",
    users: [],
    id: 0,
  };
};

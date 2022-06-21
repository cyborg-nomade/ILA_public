export interface ComiteMember {
  id: number;
  nome: string;
}

export const emptyComiteMember = (): ComiteMember => ({ id: 0, nome: "" });

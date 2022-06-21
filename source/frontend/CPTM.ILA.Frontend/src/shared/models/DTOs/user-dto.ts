import { Group } from "../access-control/group.model";

export interface UserDto {
    id: number;
    username: string;
    isComite: boolean;
    isDPO: boolean;
    isSystem: boolean;
    originGroup: Group;
    groups: Group[];
    groupAccessExpirationDate: Date;
    nome: string;
}

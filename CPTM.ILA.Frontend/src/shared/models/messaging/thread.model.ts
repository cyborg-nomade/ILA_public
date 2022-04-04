import { Group } from "../access-control/group.model";
import { Comment } from "./comments.model";

export interface Thread {
  id: number;
  comments: Comment[];
  authorGroup: Group;
  authorStatus: ThreadStatus;
  comiteStatus: ThreadStatus;
}

export enum ThreadStatus {
  Respondido,
  Pendente,
  Novo,
}

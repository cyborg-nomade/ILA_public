import { User } from "../access-control/users.model";
import { ItemIdentity } from "./item-identity.model";
import { Thread } from "./thread.model";

export interface BaseComment {
  text: string;
  author: User;
  dataCriacao: Date;
  refItem: ItemIdentity;
}

export interface Comment extends BaseComment {
  id: number;
  thread: Thread;
}

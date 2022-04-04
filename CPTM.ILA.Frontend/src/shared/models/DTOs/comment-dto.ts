import { User } from "../access-control/users.model";
import { ItemIdentity } from "../messaging/item-identity.model";

export interface CommentDTO {
  text: string;
  author: User;
  dataCriacao: Date;
  refItem: ItemIdentity;
}

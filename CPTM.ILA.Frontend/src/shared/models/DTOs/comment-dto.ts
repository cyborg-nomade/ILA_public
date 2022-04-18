import { User } from "../access-control/users.model";
import { Thread } from "./../messaging/thread.model";

export interface CommentDTO {
  text: string;
  author: User;
  thread?: Thread;
  refItem: string;
  groupId: number;
}

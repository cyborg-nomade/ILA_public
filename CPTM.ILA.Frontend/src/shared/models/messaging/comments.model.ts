import { CommentDTO } from "../DTOs/comment-dto";
import { Thread } from "./thread.model";

export interface Comment extends CommentDTO {
  id: number;
  thread: Thread;
}

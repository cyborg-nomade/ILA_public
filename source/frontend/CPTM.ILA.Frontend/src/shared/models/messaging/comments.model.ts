import { CommentDTO } from "../DTOs/comment-dto";

export interface Comment extends CommentDTO {
  id: number;
  dataCriacao: Date;
}

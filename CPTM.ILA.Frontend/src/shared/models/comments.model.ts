import { User } from "./users.model";

export interface Thread {
  id: number;
  comments: Comment[];
}

export interface BaseComment {
  text: string;
  author: User;
}

export interface Comment extends BaseComment {
  id: number;
  thread: Thread;
}

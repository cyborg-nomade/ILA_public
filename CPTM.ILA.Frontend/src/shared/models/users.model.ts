export interface BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseUser {
  isComite: boolean;
  id: string;
  originGroup: string;
}

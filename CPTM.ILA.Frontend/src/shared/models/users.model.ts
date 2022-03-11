export interface BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseUser {
  userCode: string;
  isComite: boolean;
  id: string;
}

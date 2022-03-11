import { createContext } from "react";

export const AuthContext = createContext({
  isComite: false,
  userId: "",
  isLoggedIn: false,
  token: "",
  username: "",
  login: (
    uid: string,
    username: string,
    isComite: boolean,
    token: string
  ) => {},
  logout: () => {},
});

import { createContext } from "react";

export const AuthContext = createContext({
  isComite: false,
  userId: "",
  isLoggedIn: false,
  token: "",
  username: "",
  currentGroup: "",
  login: (
    uid: string,
    username: string,
    isComite: boolean,
    token: string,
    currentGroup: string
  ) => {},
  logout: () => {},
  changeGroup: (g: string) => {},
});

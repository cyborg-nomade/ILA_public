import { useCallback, useEffect, useState } from "react";
import {
  AgenteTratamento,
  emptyAgenteTratamento,
} from "../models/case-helpers/case-helpers.model";

let logoutTimer: NodeJS.Timeout;

interface storageObject {
  uid: string;
  username: string;
  isComite: boolean;
  isDpo: boolean;
  isDeveloper: boolean;
  token: string;
  tokenExpirationDate: string;
  currentGroup: string;
  areaTratamentoDados: AgenteTratamento;
}

export const useAuth = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [isComite, setIsComite] = useState(false);
  const [isDpo, setIsDpo] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [token, setToken] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();
  const [currentGroup, setCurrentGroup] = useState("");
  const [areaTratamentoDados, setAreaTratamentoDados] =
    useState<AgenteTratamento>(emptyAgenteTratamento());

  const login = useCallback(
    (
      uid: string,
      username: string,
      isComite: boolean,
      isDpo: boolean,
      isDeveloper: boolean,
      token: string,
      currentGroup: string,
      areaTratamentoDados: AgenteTratamento,
      tokenExpirationDate?: Date
    ) => {
      setUserId(uid);
      setUsername(username);
      setToken(token);
      setIsComite(isComite);
      setIsDpo(isDpo);
      setIsDeveloper(isDeveloper);
      setCurrentGroup(currentGroup);
      setAreaTratamentoDados(areaTratamentoDados);
      const expDate =
        tokenExpirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(expDate);

      const userToStore: storageObject = {
        uid,
        username,
        isComite,
        isDpo,
        isDeveloper,
        currentGroup,
        areaTratamentoDados,
        token,
        tokenExpirationDate: expDate.toISOString(),
      };

      localStorage.setItem("userData", JSON.stringify(userToStore));
    },
    []
  );

  const logout = useCallback(() => {
    setToken("");
    setUserId("");
    setUsername("");
    setIsComite(false);
    setIsDpo(false);
    setIsDeveloper(false);
    setCurrentGroup("");
    setAreaTratamentoDados(emptyAgenteTratamento());
    localStorage.removeItem("userData");
  }, []);

  const changeGroup = (g: string) => {
    setCurrentGroup(g);
  };

  //handle token expiration & auto-logout
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
    return () => {};
  }, [token, logout, tokenExpirationDate]);

  // auto-login
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const userDataObject: storageObject = userData
      ? JSON.parse(userData)
      : null;
    const storedExpirationDate = userDataObject
      ? new Date(userDataObject.tokenExpirationDate)
      : undefined;
    if (
      userDataObject &&
      userDataObject.token &&
      storedExpirationDate &&
      storedExpirationDate > new Date()
    ) {
      login(
        userDataObject.uid,
        userDataObject.username,
        userDataObject.isComite,
        userDataObject.isDpo,
        userDataObject.isDeveloper,
        userDataObject.token,
        userDataObject.currentGroup,
        userDataObject.areaTratamentoDados,
        storedExpirationDate
      );
    }
  }, [login]);

  return {
    userId,
    username,
    isComite,
    isDpo,
    isDeveloper,
    token,
    currentGroup,
    areaTratamentoDados,
    login,
    logout,
    changeGroup,
  };
};

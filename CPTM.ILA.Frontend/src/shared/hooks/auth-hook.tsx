import { useCallback, useEffect, useState } from "react";
import { Group } from "../models/access-control/group.model";
import { emptyGroup } from "./../models/access-control/group.model";
import {
  AgenteTratamento,
  emptyAgenteTratamento,
} from "../models/case-helpers/case-helpers.model";
import { emptyUser, User } from "../models/access-control/users.model";
import { ComiteMember, emptyComiteMember } from "../models/DTOs/comite-member";

let logoutTimer: NodeJS.Timeout;

interface storageObject {
  user: User;
  isDeveloper: boolean;
  token: string;
  tokenExpirationDate: string;
  currentGroup: Group;
  areaTratamentoDados: AgenteTratamento;
}

export const useAuth = () => {
  const [user, setUser] = useState<User>(emptyUser());
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [token, setToken] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();
  const [currentGroup, setCurrentGroup] = useState<Group>(emptyGroup());
  const [currentComiteMember, setCurrentComiteMember] = useState<ComiteMember>(
    emptyComiteMember()
  );
  const [areaTratamentoDados, setAreaTratamentoDados] =
    useState<AgenteTratamento>(emptyAgenteTratamento());

  const login = useCallback(
    (
      user: User,
      isDeveloper: boolean,
      token: string,
      currentGroup: Group,
      areaTratamentoDados: AgenteTratamento,
      tokenExpirationDate?: Date
    ) => {
      setUser(user);
      setIsDeveloper(isDeveloper);
      setToken(token);
      setCurrentGroup(currentGroup);
      setAreaTratamentoDados(areaTratamentoDados);
      const expDate =
        tokenExpirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(expDate);

      const userToStore: storageObject = {
        user,
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
    setIsDeveloper(false);
    setUser(emptyUser());
    setCurrentGroup(emptyGroup());
    setCurrentComiteMember(emptyComiteMember());
    setAreaTratamentoDados(emptyAgenteTratamento());
    localStorage.removeItem("userData");
  }, []);

  const changeGroup = (g: Group) => {
    setCurrentGroup(g);
  };

  const changeComiteMember = (cm: ComiteMember) => {
    setCurrentComiteMember(cm);
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
    return () => {
      clearTimeout(logoutTimer);
    };
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
        userDataObject.user,
        userDataObject.isDeveloper,
        userDataObject.token,
        userDataObject.currentGroup,
        userDataObject.areaTratamentoDados,
        storedExpirationDate
      );
    }
  }, [login]);

  return {
    user,
    isDeveloper,
    token,
    currentGroup,
    currentComiteMember,
    areaTratamentoDados,
    login,
    logout,
    changeGroup,
    changeComiteMember,
  };
};

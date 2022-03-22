import { useCallback, useEffect, useState } from "react";

let logoutTimer: NodeJS.Timeout;

interface storageObject {
  token: string;
  uid: string;
  username: string;
  isComite: boolean;
  currentGroup: string;
  expirationDate: string;
}

export const useAuth = () => {
  const [token, setToken] = useState("");
  const [isComite, setIsComite] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();
  const [currentGroup, setCurrentGroup] = useState("");

  const login = useCallback(
    (
      uid: string,
      username: string,
      ic: boolean,
      token: string,
      currentGroup: string,
      expirationDate?: Date
    ) => {
      setToken(token);
      setUserId(uid);
      setIsComite(ic);
      setUsername(username);
      setCurrentGroup(currentGroup);
      const expDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(expDate);

      const userToStore: storageObject = {
        token,
        uid,
        username,
        isComite: ic,
        currentGroup,
        expirationDate: expDate.toISOString(),
      };

      localStorage.setItem("userData", JSON.stringify(userToStore));
    },
    []
  );

  const logout = useCallback(() => {
    setToken("");
    setIsComite(false);
    setUserId("");
    setUsername("");
    setCurrentGroup("");
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
      ? new Date(userDataObject.expirationDate)
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
        userDataObject.token,
        userDataObject.currentGroup,
        storedExpirationDate
      );
    }
  }, [login]);

  return {
    token,
    login,
    logout,
    userId,
    username,
    isComite,
    currentGroup,
    changeGroup,
  };
};

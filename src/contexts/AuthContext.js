import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userInfo = sessionStorage.getItem("userInfo");
  const expiresAt = sessionStorage.getItem("expiresAt");
  const [authState, setAuthState] = useState({
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });
  const [isLoggedIn, setIsLoggedIn ] = useState(false)
  const setAuthInfo = ({ expiresAt, userInfo }) => {
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    sessionStorage.setItem("expiresAt", expiresAt);
    setAuthState({
      expiresAt,
      userInfo,
    });
  };
  const isAuthenticated = () => {
    if (!authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };
  const refreshCsrfToken = (func) => {
    axios.get('/user/csrf-token').then(res =>{
      axios.defaults.headers['csrf-token'] = res.data.csrfToken
      func();
    });
  };
  //eslint-disable-next-line
  useEffect(()=>setIsLoggedIn(isAuthenticated()), []);
  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("expiresAt");
  }
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthInfo: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        refreshCsrfToken: (func) => refreshCsrfToken(() => func()),
        isLoggedIn,
        setIsLoggedIn,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

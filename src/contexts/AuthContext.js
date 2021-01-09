import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userInfo = sessionStorage.getItem("userInfo");
  const expiresAt = sessionStorage.getItem("expiresAt");
  const [authState, setAuthState] = useState({
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });
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
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthInfo: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

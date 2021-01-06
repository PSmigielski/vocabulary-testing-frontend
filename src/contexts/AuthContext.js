import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState({
    expiresAt: null,
    userInfo: {},
  });
  const setAuthInfo = ({ expiresAt, userInfo }) => {
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    sessionStorage.setItem("expiresAt", expiresAt);
    setAuthState({
      expiresAt,
      userInfo,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthInfo: (authInfo) => setAuthInfo(authInfo),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [data, setData] = useState({
    login: "",
    email: "",
    JWT: "",
  });
  return (
    <UserContext.Provider value={[data, setData]}>
      {props.children}
    </UserContext.Provider>
  );
};

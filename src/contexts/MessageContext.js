import React, { createContext } from "react";
import useMessage from "../hooks/useMessage";

export const MessageContext = createContext();

export const MessageProvider = (props) => {
  const [error, notification, setError, setNotification, reset] = useMessage(
    ""
  );
  return (
    <MessageContext.Provider
      value={[error, notification, setError, setNotification, reset]}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

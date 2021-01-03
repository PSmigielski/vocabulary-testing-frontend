import { useState } from "react";

const useMessage = (initValue) => {
  const [error, setError] = useState(initValue);
  const [notification, setNotification] = useState(initValue);
  const reset = () => {
    setError(initValue);
    setNotification(initValue);
  };
  return [error, notification, setError, setNotification, reset];
};

export default useMessage;

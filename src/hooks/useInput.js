import { useState } from "react";

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);
  const reset = () => {
    setValue(initValue);
  };
  const bind = {
    value,
    onChange: (e) => setValue(e.target.value),
  };
  return [value, bind, reset];
};

export default useInput;

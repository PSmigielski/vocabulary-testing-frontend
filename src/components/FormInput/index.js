import React from "react";
import "./index.scss";

const FromInput = ({ data, value, onChange }) => {
  return (
    <input
      type={data.type}
      className="form__input"
      name={data.name}
      value={value}
      onInput={onChange}
      placeholder={data.placeholder}
      required={data.required ? true : false}
    />
  );
};
export default FromInput;

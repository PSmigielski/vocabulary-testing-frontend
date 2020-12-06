import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

const Form = ({
  wrapperHeight,
  formHeight,
  label,
  messages,
  children,
  handleSubmit,
}) => {
  let notification = "";
  let errorMessage = "";
  return (
    <div className="formContainer" style={{ height: wrapperHeight }}>
      <p className="formContainer__header">{label}</p>
      <form
        className="form"
        style={{ height: formHeight }}
        onSubmit={handleSubmit}
      >
        {children}
        <p className="error">{errorMessage}</p>
        <p className="notification">{notification}</p>
        <button type="submit" className="form__submit">
          {label}
        </button>
      </form>
      <div className="message">
        {messages === "Login" && (
          <p className="formContainer__paragraph">
            Zapomniałeś hasło?<Link to="/forgot"> Kliknij tutaj</Link>{" "}
          </p>
        )}
        {messages === "Login" && (
          <p className="formContainer__paragraph">
            Nie masz konta?<Link to="/register"> Zarejestruj się</Link>
          </p>
        )}
        {messages === "Register" && (
          <p className="formContainer__paragraph">
            Masz już konto?<Link to="/login">Zaloguj się</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;

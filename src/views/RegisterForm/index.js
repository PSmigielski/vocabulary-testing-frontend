import React, { useContext, useEffect } from "react";
import "./index.scss";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import Arrow from "../../components/Arrow";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import useInput from "../../hooks/useInput.js";

import { MessageContext } from "../../contexts/MessageContext";
import axios from "axios";

const RegisterForm = ({ history }) => {
  const [error, notification, setError, setNotification, reset] = useContext(
    MessageContext
  );
  const [email, bindEmail] = useInput("");
  const [login, bindLogin] = useInput("");
  const [password1, bindPassword1] = useInput("");
  const [password2, bindPassword2] = useInput("");
  // eslint-disable-next-line
  useEffect(() => reset(), []);
  /* eslint-disable */
  const validatepass = (TestPassword) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\-\=])(?=.*[A-Z])(?!.*\s).{8,}$/;
    return re.test(TestPassword);
  };
  const validateEmail = (TestEmail) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(TestEmail);
  };
  const validateLogin = (TestLogin) => {
    const re = /^[a-zA-Z0-9\._-]+$/;
    return re.test(TestLogin);
  };
  /* eslint-enable */

  const registerUser = () => {
    axios
      .post("/user/register", {
        username: login,
        email: email,
        password: password1,
      })
      .then((response) => {
        setNotification("email weryfikacyjny został wysłany");
        history.push("/login");
      })
      .catch((error) => {
        if (
          error.response.data.message === "Account with that email just exist."
        )
          setError("Ten email jest zajęty");

        if (
          error.response.data.message ===
          "Account with that username just exist."
        )
          setError("Ten login jest zajęty");
        if (
          error.response.data.message ===
          "Some error occurred while creating the User."
        )
          setError("Nastąpił niespodziewany błąd spróbuj ponownie później");
        // console.log(error);
      });
  };
  const verify = (login, email, password1, password2) => {
    if (!validateLogin(login)) {
      setError("Wpisz poprawny login");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Wpisz poprawny Email");
      return false;
    }
    if (password1 !== password2) {
      setError("Hasła nie są takie same");
      return false;
    }
    if (!validatepass(password2)) {
      setError(
        "wpisz poprawne hasło minimum 8 znaków w tym minimum jeden znak zpecjalny, cyfrę i dużą literę"
      );
      return false;
    }
    registerUser();
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    verify(login, email, password1, password2);
  };
  return (
    <div className="registerWrapper">
      <Nav />
      <div className="container">
        <Link to="/">
          <Arrow absolute="true" />
        </Link>
        <Form
          wrapperHeight={"70%"}
          formHeight={"60%"}
          label="Zarejestruj się"
          messages="Register"
          handleSubmit={handleSubmit}
          error={error}
          notification={notification}
        >
          <FormInput
            data={{
              type: "text",
              name: "login",
              placeholder: "login",
              required: true,
            }}
            {...bindLogin}
          />
          <FormInput
            data={{
              type: "email",
              name: "email",
              placeholder: "email",
              required: true,
            }}
            {...bindEmail}
          />
          <FormInput
            data={{
              type: "password",
              name: "password1",
              placeholder: "Hasło",
              required: true,
            }}
            {...bindPassword1}
          />
          <FormInput
            data={{
              type: "password",
              name: "password2",
              placeholder: "Powtórz hasło",
              required: true,
            }}
            {...bindPassword2}
          />
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;

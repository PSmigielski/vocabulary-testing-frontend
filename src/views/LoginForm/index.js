import React, { useContext, useState } from "react";
import "./index.scss";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import Arrow from "../../components/Arrow";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import useInput from "../../hooks/useInput.js";
import { UserContext } from "../../contexts/UserContext";

import axios from "axios";

const LoginForm = ({ history }) => {
  const [email, bindEmail] = useInput("");
  const [password, bindPassword] = useInput("");
  const [data, setData] = useContext(UserContext);
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/user/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.verified === 0) {
          setError("Zweryfikuj email by się zalogować");
        } else {
          setError("");
          history.push("/dashboard");
          setData((prevState) => ({
            ...prevState,
            id: response.data.id,
            login: response.data.login,
            email: response.data.email,
            JWT: response.data.token,
          }));
        }
      })
      .catch((err) => {
        if (err.response.data.message === "credentials don't match")
          setError("Podano złe dane logowania");
      });
  };
  return (
    <div className="loginWrapper">
      <Nav />
      <div className="container">
        <Link to="/">
          <Arrow absolute="true" />
        </Link>
        <Form
          wrapperHeight={"60%"}
          formHeight={"46%"}
          label="Zaloguj się"
          messages="Login"
          handleSubmit={handleSubmit}
          error={error}
        >
          <FormInput
            data={{
              type: "text",
              name: "email",
              placeholder: "email",
              required: true,
            }}
            {...bindEmail}
          />
          <FormInput
            data={{
              type: "password",
              name: "password",
              placeholder: "password",
              required: true,
            }}
            {...bindPassword}
          />
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useContext, useEffect } from "react";
import "./index.scss";
import Nav from "../../components/Nav";
import { Link, useHistory } from "react-router-dom";
import Arrow from "../../components/Arrow";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import useInput from "../../hooks/useInput.js";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import axios from "axios";

const LoginForm = () => {
  const [email, bindEmail] = useInput("");
  const [password, bindPassword] = useInput("");
  const authContext = useContext(AuthContext);
  const history = useHistory();
  //eslint-disable-next-line
  const [error, , setError,, reset] = useContext(
    MessageContext
  );
  // eslint-disable-next-line
  useEffect(() => reset(), []);
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
          authContext.setIsLoggedIn(true);
          authContext.setAuthInfo(response.data);
          history.push("/dashboard");
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

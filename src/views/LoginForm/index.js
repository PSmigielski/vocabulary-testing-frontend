import React, { useContext } from "react";
import "./index.scss";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import Arrow from "../../components/Arrow";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import useInput from "../../hooks/useInput.js";
import { UserContext } from "../../contexts/UserContext";

const LoginForm = () => {
  const [email, bindEmail] = useInput("");
  const [password, bindPassword] = useInput("");
  const [data, setData] = useContext(UserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
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

import React from "react";
import "./index.scss";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import Arrow from "../../components/Arrow";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import useInput from "../../hooks/useInput.js";

const RegisterForm = () => {
  const [email, bindEmail] = useInput("");
  const [login, bindLogin] = useInput("");
  const [password1, bindPassword1] = useInput("");
  const [password2, bindPassword2] = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("login:", email);
    console.log("email:", login);
    console.log("password1:", password1);
    console.log("password2:", password2);
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

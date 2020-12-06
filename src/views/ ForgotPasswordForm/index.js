import React from "react";
import "./index.scss";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import Arrow from "../../components/Arrow";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import useInput from "../../hooks/useInput.js";

const ForgotPasswordForm = () => {
  const [email, bindEmail] = useInput("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("email:", email);
  };
  return (
    <div className="forgotPasswordWrapper">
      <Nav />
      <div className="container">
        <Link to="/">
          <Arrow absolute="true" />
        </Link>
        <Form
          wrapperHeight={"40%"}
          formHeight={"40%"}
          label="Zresetuj Hasło"
          messages="null"
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
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

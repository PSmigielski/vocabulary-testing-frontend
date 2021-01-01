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

const ForgotPasswordForm = () => {
  const [error, notification, setError, setNotification, reset] = useContext(
    MessageContext
  );
  const [email, bindEmail] = useInput("");
  // eslint-disable-next-line
  useEffect(() => reset(), []);
  const initForgot = () => {
    axios
      .post("/user/reset-password", { email })
      .then((response) => {
        setNotification("email został wysłany");
      })
      .catch((error) => {
        if (error.response.data.message === "Content can not be empty!")
          setError("pole nie może być puste!");
        if (error.response.data.message === "something went wrong")
          setError("coś poszło nie tak spróbuj ponownie później");
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    initForgot();
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
          error={error}
          notification={notification}
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

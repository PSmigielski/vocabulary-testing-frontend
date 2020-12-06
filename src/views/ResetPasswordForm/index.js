import React from "react";
import "./index.scss";
import Nav from "../../components/Nav";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import useInput from "../../hooks/useInput.js";

const ResetPasswordForm = () => {
  const [email, bindEmail] = useInput("");
  const [password1, bindPassword1] = useInput("");
  const [password2, bindPassword2] = useInput("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("email:", email);
    console.log("password1:", password1);
    console.log("password2:", password2);
  };
  return (
    <div className="loginWrapper">
      <Nav />
      <div className="container">
        <Form
          wrapperHeight={"60%"}
          formHeight={"55%"}
          label="Zresetuj hasło"
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
          <FormInput
            data={{
              type: "password",
              name: "password1",
              placeholder: "Nowe hasło",
              required: true,
            }}
            {...bindPassword1}
          />
          <FormInput
            data={{
              type: "password",
              name: "password2",
              placeholder: "Powtórz nowe hasło",
              required: true,
            }}
            {...bindPassword2}
          />
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

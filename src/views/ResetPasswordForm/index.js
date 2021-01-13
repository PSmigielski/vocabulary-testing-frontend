import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";
import Nav from "../../components/Nav";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import useInput from "../../hooks/useInput.js";
import { MessageContext } from "../../contexts/MessageContext.js";
import { useHistory } from "react-router";
import Loader from "../../components/Loader";

const ResetPasswordForm = ({ routerProps }) => {
  const token = routerProps.match.params.token;
  const [email, bindEmail] = useInput("");
  const [password1, bindPassword1] = useInput("");
  const [password2, bindPassword2] = useInput("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, notification, setError, , reset] = useContext(
    MessageContext
  );
  const history = useHistory();
  /* eslint-disable */
  useEffect(() =>{ 
    reset();
    axios.get(`/user/reset-password/${token}`).then(res =>{
      console.log(res)
      setIsLoading(false);
    }).catch(err => {
      console.log('dupa');
      history.push('/');
    })
  }, []);
  const validatepass = (TestPassword) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\-\=])(?=.*[A-Z])(?!.*\s).{8,}$/;
    return re.test(TestPassword);
  };
  /* eslint-enable */
  const verify = (password1, password2) => {
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
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (verify(password1, password2))
      axios
        .put(`/user/reset-password/${token}`, {
          email,
          password: password1,
        })
        .then((res) => {
          if (res.data.message === "password has been updated") {
            setError("Hasło zostało zaktualizowane");
          }
        })
        .catch((err) => {
          if (err.response.data === "Token not found") {
            setError("Nie odnaleziono tokena");
          } else if (err.response.data === "user not found") {
            setError("Nie ma takiego użytkownika");
          } else if (err.response.data === "something went wrong") {
            setError("Coś poszło nie tak");
          } else if (err.response.data === "server error") {
            setError("Błąd serwera spróbuj ponownie później");
          }
        });
  };
  return (
    <div className="resetPasswordWrapper">
      <Nav />
      {isLoading ?
       (<Loader />) 
       : (
        <div className="container">
          <Form
            wrapperHeight={"60%"}
            formHeight={"55%"}
            label="Zresetuj hasło"
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
      )}
    </div>
  );
};

export default ResetPasswordForm;

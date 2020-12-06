import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import "./App.scss";
import ForgotPasswordForm from "./views/ ForgotPasswordForm";
import Home from "./views/Home";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import ResetPasswordForm from "./views/ResetPasswordForm";
import VerifyPage from "./views/VerifyPage";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const location = useLocation();
  return (
    <UserProvider>
      <Switch location={location} key={location.key}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/forgot">
          <ForgotPasswordForm />
        </Route>
        <Route path="/reset">
          <ResetPasswordForm />
        </Route>
        <Route
          path="/verify/:login"
          render={(routerProps) => {
            return <VerifyPage routerProps={routerProps} />;
          }}
        />
      </Switch>
    </UserProvider>
  );
}

export default App;

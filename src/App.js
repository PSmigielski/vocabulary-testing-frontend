import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import "./App.scss";
import ForgotPasswordForm from "./views/ ForgotPasswordForm";
import Home from "./views/Home";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import ResetPasswordForm from "./views/ResetPasswordForm";
import VerifyPage from "./views/VerifyPage";
import { AuthProvider } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageContext";

function App() {
  const location = useLocation();
  const history = useHistory();
  return (
    <MessageProvider>
      <AuthProvider>
        <Switch location={location} key={location.key}>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <LoginForm history={history} />
          </Route>
          <Route path="/register">
            <RegisterForm history={history} />
          </Route>
          <Route path="/forgot">
            <ForgotPasswordForm />
          </Route>
          <Route
            path="/reset/:token"
            render={(routerProps) => {
              return <ResetPasswordForm routerProps={routerProps} />;
            }}
          />
          <Route
            path="/verify/:login"
            render={(routerProps) => {
              return <VerifyPage routerProps={routerProps} />;
            }}
          />
        </Switch>
      </AuthProvider>
    </MessageProvider>
  );
}

export default App;

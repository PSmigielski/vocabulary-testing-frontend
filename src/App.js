import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import "./App.scss";
import Home from "./views/Home";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";

function App() {
  const location = useLocation();
  return (
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
    </Switch>
  );
}

export default App;

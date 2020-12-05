import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import "./App.scss";
import Home from "./views/Home";

function App() {
  const location = useLocation();
  return (
    <Switch location={location} key={location.key}>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;

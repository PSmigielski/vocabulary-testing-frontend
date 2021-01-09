import React,{useContext} from "react";
import { Switch, Route, useLocation, useHistory,Redirect } from "react-router-dom";
import ForgotPasswordForm from "../../views/ForgotPasswordForm";
import Home from "../../views/Home";
import LoginForm from "../../views/LoginForm";
import RegisterForm from "../../views/RegisterForm";
import ResetPasswordForm from "../../views/ResetPasswordForm";
import VerifyPage from "../../views/VerifyPage";
import Dashboard from "../../views/Dashboard";
import { AuthContext } from "../../contexts/AuthContext";

const AppRoutes = () =>{
    const auth = useContext(AuthContext);
    const location = useLocation();
    const history = useHistory();
    return(
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
          <Route
            path="/dashboard"
            render={() => auth.isAuthenticated() ? <Dashboard /> : <Redirect to="/" />}
            />
        </Switch>
    )
}

export default AppRoutes
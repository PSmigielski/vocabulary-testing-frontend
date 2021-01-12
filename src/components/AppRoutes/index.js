import React,{useContext} from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import ForgotPasswordForm from "../../views/ForgotPasswordForm";
import Home from "../../views/Home";
import LoginForm from "../../views/LoginForm";
import RegisterForm from "../../views/RegisterForm";
import ResetPasswordForm from "../../views/ResetPasswordForm";
import VerifyPage from "../../views/VerifyPage";
import Dashboard from "../../views/Dashboard";
import { AuthContext } from "../../contexts/AuthContext";
import AppShell from "../AppShell";
import axios from "axios";

const AppRoutes = () =>{
    const auth = useContext(AuthContext);
    const location = useLocation();
    const history = useHistory();
    const handleLogout = () => {
      axios.delete('/user/logout').then(res => {
        history.push('/');
        auth.logout();
        auth.setIsLoggedIn(false);
      }).catch(err => {
        history.push('/');
      })
    }
    const refreshAccessToken = () => {
      axios.post('/user/refresh').then(res=>{
        const userInfo = auth.authState.userInfo;
        auth.setAuthInfo({expiresAt:res.data.expiresAt, userInfo})
        sessionStorage.setItem("expiresAt", res.data.expiresAt);
        auth.setIsLoggedIn(true);
        history.push('/dashboard')
        console.log(res)
        return (
          <AppShell>
            <Dashboard />
          </AppShell>
        )
      }).catch(err =>{
        console.log(err); 
        handleLogout()});
    }
    return(
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
            render={() => auth.isAuthenticated() ? 
              (<AppShell>
                <Dashboard />
              </AppShell>) : refreshAccessToken()}
            />
        </Switch>
    )
}

export default AppRoutes
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";
import { AuthContext } from "../../contexts/AuthContext"; 
import Logo from "../Logo";
import axios from "axios";

const Nav = () => {
  const auth = useContext(AuthContext)
  let isLoggedIn = auth.isLoggedIn;
  const history = useHistory();
  const handleLogout = () => {
    axios.delete('/user/logout').then(res => {
      history.push('/');
      auth.logout();
      auth.setIsLoggedIn(false);
    }).catch(err => {
      alert(err.response.data.message)
    })
  }
  return (
    <div className="nav__wrapper">
      <div className="nav__container">
        <Logo />
        <div style={{display: isLoggedIn ? 'flex' : 'none'}} className="menu">
          <Link to="/dashboard">Testy</Link>
          <Link to="/stats">Statystyki</Link>
          <Link to="/options">Opcje</Link>
          <button onClick={handleLogout} className="menu__button">Wyloguj</button>
        </div>
      </div>
    </div>
  );
};
export default Nav;

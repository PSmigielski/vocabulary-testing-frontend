import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import Logo from "../Logo";

const Nav = ({ isLoggedIn }) => {
  return (
    <div className="nav__wrapper">
      <div className="nav__container">
        <Logo />
        <div style={isLoggedIn ? "" : { display: "none" }} className="menu">
          <Link to="/dashboard">Lekcje</Link>
          <Link to="/stats">Statystyki</Link>
          <Link to="/options">opcje</Link>
          <button className="menu__button">Wyloguj</button>
        </div>
      </div>
    </div>
  );
};
export default Nav;

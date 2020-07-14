import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/appContext";

import { mainHeader, activeLink } from "./Header.module.scss";
import logo from "../assets/logo.png";

function Header() {
  const { isAuthenticated, logout } = useContext(AppContext);

  console.log(isAuthenticated);
  return (
    <header className={mainHeader}>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <nav>
        <ul>
          <NavLink activeClassName={activeLink} to="/legislatie">
            <li>Legislatie</li>
          </NavLink>
          <NavLink activeClassName={activeLink} to="/documente">
            <li>Documente COSP</li>
          </NavLink>
          <NavLink activeClassName={activeLink} to="/materiale">
            <li>Materiale Suport</li>
          </NavLink>
          <NavLink activeClassName={activeLink} to="/noutati">
            <li> Noutati</li>
          </NavLink>
          {!isAuthenticated && (
            <NavLink activeClassName={activeLink} to="/autentificare">
              <li> Autentificare</li>
            </NavLink>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

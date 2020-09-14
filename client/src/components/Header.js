import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/appContext";

import { mainHeader, activeLink } from "./Header.module.scss";
import logo from "../assets/logo.png";

function Header() {
  const { isAuthenticated, logout } = useContext(AppContext);

  return (
    <header className={mainHeader}>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={activeLink} to="/legislatie">
              Legislație
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={activeLink} to="/documente">
              Documente COSP
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={activeLink} to="/materiale">
              Materiale Suport
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={activeLink} to="/noutati">
              Noutăți
            </NavLink>
          </li>
          {!isAuthenticated ? (
            <li>
              <NavLink activeClassName={activeLink} to="/autentificare">
                Autentificare
              </NavLink>
            </li>
          ) : (
            <li>
              <button onClick={logout}>Delogare</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

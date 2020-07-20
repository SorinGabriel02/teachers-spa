import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppContext } from "../context/appContext";

import { mainHeader, activeLink } from "./Header.module.scss";
import logo from "../assets/logo.png";

function Header() {
  const { isAuthenticated, logout } = useContext(AppContext);

  const { pathname } = useLocation();

  return (
    <header className={mainHeader}>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <nav>
        <ul>
          <NavLink activeClassName={activeLink} to="/legislatie">
            <li>Legislație</li>
          </NavLink>
          <NavLink activeClassName={activeLink} to="/documente">
            <li>Documente COSP</li>
          </NavLink>
          <NavLink activeClassName={activeLink} to="/materiale">
            <li>Materiale Suport</li>
          </NavLink>
          <NavLink activeClassName={activeLink} to="/noutati">
            <li>Noutati</li>
          </NavLink>
          {!isAuthenticated ? (
            <NavLink
              /*keep the link active if path is /contNou */
              className={pathname === "/contNou" ? activeLink : null}
              activeClassName={activeLink}
              to="/autentificare"
            >
              <li>Autentificare</li>
            </NavLink>
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

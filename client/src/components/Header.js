import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { mainHeader, activeLink } from "./Header.module.scss";
import logo from "../assets/logo.png";

function Header() {
  const [isActive, setActive] = useState(false);

  return (
    <header className={mainHeader}>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={activeLink} to="/legislatie">
              Legislatie
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
              Noutati
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={activeLink} to="/autentificare">
              Autentificare
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

import React from "react";
import { Link } from "react-router-dom";

import { mainHeader } from "./Header.module.scss";

function Header() {
  return (
    <header className={mainHeader}>
      <nav>
        <p>
          <Link to="/">Sprijin</Link>
        </p>
        <ul>
          <li>
            <Link to="/legislatie">Legislatie</Link>
          </li>
          <li>
            <Link to="/documente">Documente COSP</Link>
          </li>
          <li>
            <Link to="/materiale">Materiale Suport</Link>
          </li>
          <li>
            <Link to="/noutati">Noutati</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

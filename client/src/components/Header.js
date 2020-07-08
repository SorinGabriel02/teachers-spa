import React from "react";
import { Link } from "react-router-dom";

import { mainHeader, card } from "./Header.module.scss";

function Header() {
  return (
    <header className={mainHeader}>
      <p className={card} title="Inapoi la pagina de pornire.">
        <Link to="/">Sprijin</Link>
      </p>
      <nav>
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
            <Link to="/autentificare">Autentificare</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

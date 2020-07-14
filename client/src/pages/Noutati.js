import React from "react";
import { NavLink } from "react-router-dom";

import { newsBtn } from "./Noutati.module.scss";

function Noutati() {
  return (
    <div>
      <h1>Noutati</h1>
      <NavLink to="/postNou">
        <button className={newsBtn}>Creează post</button>
      </NavLink>
    </div>
  );
}

export default Noutati;

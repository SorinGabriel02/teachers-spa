import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from "../context/appContext";
import { newsBtn } from "./Noutati.module.scss";

function Noutati(props) {
  const { isAdmin } = useContext(AppContext);

  return (
    <div>
      <h1>Noutati</h1>
      {isAdmin && (
        <NavLink to="/postNou">
          <button className={newsBtn}>Creează post</button>
        </NavLink>
      )}
    </div>
  );
}

export default Noutati;

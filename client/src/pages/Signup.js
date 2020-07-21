import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../context/appContext";
import { loginForm } from "./Login.module.scss";

function Signup() {
  const { login } = useContext(AppContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/users/signup", {
        username: name,
        email,
        password,
      });
      login(response.data.token, false);
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={loginForm}>
      <h2>Creează cont</h2>
      <label htmlFor="nume">Nume</label>
      <input
        autoComplete="off"
        type="text"
        name="nume"
        placeholder="Nume și prenume..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">E-mail</label>
      <input
        autoComplete="off"
        type="email"
        name="email"
        placeholder="Adresa de e-mail..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Parolă</label>
      <input
        type="password"
        name="password"
        placeholder="Parola..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Creează Cont</button>
      <p>
        Ai deja cont? <NavLink to="/autentificare">Loghează-te</NavLink>
      </p>
    </form>
  );
}

export default Signup;

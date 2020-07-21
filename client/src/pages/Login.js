import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/appContext";

import { loginForm } from "./Login.module.scss";

function Login() {
  const { login, errorMessage, handleError } = useContext(AppContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/users/login", {
        email,
        password,
      });
      // send data to appContext
      login(response.data.token, !!response.data.admin);

      history.goBack();
    } catch (error) {
      if (error.response.status === 401)
        handleError("Datele introduse sunt incorecte.");
      if (error.response.status === 500)
        handleError("Eroare de server. Te rugam să încerci mai tarziu.");
    }
  };

  //console.log(error);
  return (
    <form onSubmit={handleSubmit} className={loginForm}>
      <h2>Autentificare</h2>
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
      {errorMessage && <p>{errorMessage}</p>}
      <button>Autentificare</button>
      <p>
        Nu ai cont? <NavLink to="/contNou">Creează cont</NavLink>
      </p>
    </form>
  );
}

export default Login;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { loginForm } from "./Login.module.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/users/login", {
      email,
      password,
    });
    console.log(response.data);
  };
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
      <button>Autentificare</button>
      <p>
        Nu ai cont? <NavLink to="/signup">Creează cont</NavLink>{" "}
      </p>
    </form>
  );
}

export default Login;

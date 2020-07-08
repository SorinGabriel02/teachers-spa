import React, { useState } from "react";

import { loginForm } from "./Login.module.scss";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting....");
  };

  return (
    <div>
      <h1>Autentificati-va</h1>
      <form onSubmit={handleSubmit} className={loginForm}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Parola</label>
        <input type="password" name="password" />
        <button>Autentificare</button>
      </form>
    </div>
  );
}

export default Login;

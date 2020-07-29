import React, { useReducer, useContext, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../context/appContext";
import useValidation from "../hooks/useValidation";
import { loginForm } from "./Login.module.scss";

const initialState = {
  // intervalId is an array in case there's more than 1 active interval;
  intervalId: [],
  isLoading: false,
  name: "",
  email: "",
  password: "",
  errorMessage: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "name":
      return {
        ...state,
        name: action.payload,
      };
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "password":
      return {
        ...state,
        password: action.payload,
      };
    case "intervalId":
      return {
        ...state,
        intervalId: [...state.intervalId, action.payload],
      };
    default:
      return state;
  }
}

function Signup() {
  const { login } = useContext(AppContext);
  const history = useHistory();
  // for canceling axios call if component dismounts
  const cancelSource = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isName,
    isEmail,
    isPassword,
    validateName,
    validateEmail,
    validatePassword,
    errorMessage,
    displayErrorMessage,
    clearError,
  } = useValidation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !validateName(state.name) ||
      !validateEmail(state.email) ||
      !validatePassword(state.password)
    )
      return;
    try {
      cancelSource.current = axios.CancelToken.source();
      const response = await axios.post(
        "/users/signup",
        {
          username: state.name,
          email: state.email,
          password: state.password,
        },
        { cancelToken: cancelSource.current.token }
      );
      login(response.data.token, false);
      history.goBack();
    } catch (error) {
      let id = 0;
      if (error.response && error.response.status >= 500) {
        displayErrorMessage(
          "res",
          "Eroare de server. Te rugam să încerci mai tarziu."
        );
        id = setInterval(() => {
          clearError("res");
        }, 4000);
        dispatch({ type: "intervalId", payload: id });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
    clearError(name);
  };

  // abort changing state if component is unmounted
  useEffect(() => {
    return () => {
      cancelSource.current &&
        cancelSource.current.cancel(
          "component dismounts, api is being canceled"
        );
      state.intervalId.forEach((id) => clearInterval(id));
    };
  }, [state.intervalId]);

  return (
    <form onSubmit={handleSubmit} className={loginForm}>
      <h2>Creează cont</h2>
      <label htmlFor="nume">Nume</label>
      {!isName && errorMessage.name && (
        <p className="errorMessage">{errorMessage.name}</p>
      )}
      <input
        autoComplete="off"
        type="text"
        name="name"
        placeholder="Nume și prenume..."
        value={state.name}
        onChange={handleChange}
      />
      <label htmlFor="email">E-mail</label>
      {!isEmail && errorMessage.email && (
        <p className="errorMessage">{errorMessage.email}</p>
      )}
      <input
        autoComplete="off"
        type="text"
        name="email"
        placeholder="Adresa de e-mail..."
        value={state.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Parolă</label>
      {!isPassword && errorMessage.password && (
        <p className="errorMessage">{errorMessage.password}</p>
      )}
      <input
        type="password"
        name="password"
        placeholder="Parola..."
        value={state.password}
        onChange={handleChange}
      />
      {isPassword && (
        <p className="infoMessage">
          Parola trebuie să aibă cel puțin opt caractere și să conțină cel puțin
          o literă mică, o majusculă, o cifră și un caracter special @$!%*?&amp;
        </p>
      )}
      <button>Creează Cont</button>
      <p>
        Ai deja cont? <NavLink to="/autentificare">Loghează-te</NavLink>
      </p>
    </form>
  );
}

export default Signup;

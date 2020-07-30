import React, { useReducer, useEffect, useRef, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../context/appContext";
import useValidation from "../hooks/useValidation";
import { loginForm } from "./Login.module.scss";

const initialState = {
  // intervalId is an array in case there's more than 1 active interval;
  intervalId: [],
  isLoading: false,
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

function Login() {
  const { login } = useContext(AppContext);
  const history = useHistory();
  // for canceling axios call if component dismounts
  const cancelSource = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isEmail,
    isPassword,
    validateEmail,
    validatePassword,
    errorMessage,
    displayErrorMessage,
    clearError,
  } = useValidation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(state.email) || !validatePassword(state.password))
      return;
    try {
      // create a ref in case request needs to be canceled
      cancelSource.current = axios.CancelToken.source();
      const response = await axios.post(
        "/users/login",
        {
          email: state.email,
          password: state.password,
        },
        { cancelToken: cancelSource.current.token }
      );
      // send data to appContext
      login(response.data.token, !!response.data.admin);
      history.goBack();
    } catch (error) {
      let id = 0;
      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 400
      ) {
        displayErrorMessage("res", "Datele introduse sunt incorecte.");
        id = setInterval(() => {
          clearError("res");
        }, 4000);
        dispatch({ type: "intervalId", payload: id });
      } else if (error.response && error.response.status === 500) {
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
      <h2>Autentificare</h2>
      <label htmlFor="email">E-mail</label>
      {!isEmail && errorMessage.email && (
        <p className="errorMessage">{errorMessage.email}</p>
      )}
      <input
        autoComplete="off"
        type="text"
        name="email"
        placeholder="Adresa de email..."
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
      {errorMessage.res && <p className="errorMessage">{errorMessage.res}</p>}
      <button>Autentificare</button>
      <p>
        Nu ai cont? <NavLink to="/contNou">Creează cont</NavLink>
      </p>
    </form>
  );
}

export default Login;

import React, { useReducer, useContext, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
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
  passwordRepeat: "",
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
    case "passwordRepeat":
      return {
        ...state,
        passwordRepeat: action.payload,
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
    let id = 0;
    if (
      !validateName(state.name) ||
      !validateEmail(state.email) ||
      !validatePassword(state.password)
    )
      return;
    if (!samePassword) {
      return displayErrorMessage(
        "unequalPassword",
        "Cele două valori ale parolei nu sunt identice."
      );
    }
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
      console.log(error.response);
      if (error.response && error.response.status >= 500) {
        displayErrorMessage(
          "res",
          "Eroare de server. Te rugam să încerci mai tarziu."
        );
        id = setInterval(() => clearError("res"), 4000);
        dispatch({ type: "intervalId", payload: id });
      }
      if (error.response && error.response.status === 409) {
        displayErrorMessage("res", error.response.data.errorMessage);
        id = setInterval(() => clearError("res"), 4000);
        dispatch({ type: "intervalId", payload: id });
      }
      if (error.response && error.response.status === 422) {
        displayErrorMessage("res", error.response.data.errorMessage);
        id = setInterval(() => clearError("res"), 4000);
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

  const passwordError = Boolean(!isPassword && errorMessage.password);
  const emailError = Boolean(!isEmail && errorMessage.email);
  const nameError = Boolean(!isName && errorMessage.name);
  const samePassword = Boolean(
    state.password && state.password === state.passwordRepeat
  );

  return (
    <form onSubmit={handleSubmit} className={loginForm}>
      <h2>Creează cont</h2>
      <label htmlFor="nume">Nume</label>
      <CSSTransition
        in={nameError}
        unmountOnExit
        timeout={250}
        classNames="errorMessage"
      >
        <p className="errorMessage">{errorMessage.name}</p>
      </CSSTransition>
      <input
        autoComplete="off"
        type="text"
        name="name"
        placeholder="Nume și prenume..."
        value={state.name}
        onChange={handleChange}
      />
      <label htmlFor="email">E-mail</label>
      <CSSTransition
        in={emailError}
        unmountOnExit
        timeout={250}
        classNames="errorMessage"
      >
        <p className="errorMessage">{errorMessage.email}</p>
      </CSSTransition>
      <input
        autoComplete="off"
        type="text"
        name="email"
        placeholder="Adresa de e-mail..."
        value={state.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Parolă</label>
      <CSSTransition
        in={passwordError}
        unmountOnExit
        timeout={250}
        classNames="errorMessage"
      >
        <p className="errorMessage">{errorMessage.password}</p>
      </CSSTransition>
      <input
        type="password"
        name="password"
        placeholder="Parola..."
        value={state.password}
        onChange={handleChange}
      />
      <label htmlFor="passwordRepeat">
        Repetă Parola
        <CSSTransition
          unmountOnExit
          in={samePassword}
          timeout={250}
          classNames="okMessage"
        >
          <i
            style={{ marginLeft: "1vmax", borderRadius: "6px" }}
            className="okMessage"
          >
            &#x2713;ok
          </i>
        </CSSTransition>
      </label>

      <input
        style={samePassword ? { boxShadow: "0 0 10px green" } : null}
        type="password"
        name="passwordRepeat"
        placeholder="Repetă parola"
        value={state.passwordRepeat}
        onChange={handleChange}
      />
      <CSSTransition
        unmountOnExit
        in={isPassword}
        timeout={250}
        classNames="infoMessage"
      >
        <p className="infoMessage">
          Parola trebuie să aibă cel puțin opt caractere și să conțină cel puțin
          o literă mică, o majusculă, o cifră și un caracter special @ $ ! % * ?
          &amp;
        </p>
      </CSSTransition>
      <CSSTransition
        unmountOnExit
        in={Boolean(errorMessage.unequalPassword && !samePassword)}
        timeout={250}
        classNames="errorMessage"
      >
        <p className="errorMessage">{errorMessage.unequalPassword}</p>
      </CSSTransition>
      <CSSTransition
        unmountOnExit
        in={Boolean(errorMessage.res)}
        timeout={250}
        classNames="errorMessage"
      >
        <p className="errorMessage">{errorMessage.res}</p>
      </CSSTransition>

      <button>Creează Cont</button>
      <p>
        Ai deja cont? <NavLink to="/autentificare">Loghează-te</NavLink>
      </p>
    </form>
  );
}

export default Signup;

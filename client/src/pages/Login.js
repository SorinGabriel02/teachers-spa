import React, { useReducer, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

import { AppContext } from "../context/appContext";
import useValidation from "../hooks/useValidation";
import Loading from "../components/Loading";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";
import { loginContainer, loginForm } from "./Login.module.scss";

const initialState = {
  // intervalId is an array in case there's more than 1 active interval;
  intervalId: [],
  isLoading: false,
  isLogin: true,
  name: "",
  email: "",
  password: "",
  passwordRepeat: "",
  errorMessage: {},
  goBackTo: "",
};

function loginReducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case "goBackTo":
      return {
        ...state,
        goBackTo: action.payload,
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
    case "isLogin":
      return {
        ...state,
        isLogin: !state.isLogin,
      };
    default:
      return state;
  }
}

function Login() {
  const { login } = useContext(AppContext);
  const history = useHistory();
  // for canceling axios call if component dismounts
  const cancelFetch = useRef(null);
  const [state, dispatch] = useReducer(loginReducer, initialState);
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
    // pre-fetch validation
    if (!state.isLogin && !validateName(state.name)) return;
    if (!validateEmail(state.email) || !validatePassword(state.password))
      return;
    if (!state.isLogin && !samePassword) {
      return displayErrorMessage(
        "unequalPassword",
        "Cele două valori ale parolei nu sunt identice."
      );
    }

    try {
      cancelFetch.current = axios.CancelToken.source();
      const reqRoute = state.isLogin ? "/api/users/login" : "/api/users/signup";
      const reqBody = state.isLogin
        ? { email: state.email, password: state.password }
        : {
            username: state.name,
            email: state.email,
            password: state.password,
          };
      dispatch({ type: "isLoading" });

      const response = await axios.post(reqRoute, reqBody, {
        cancelToken: cancelFetch.current.token,
      });
      dispatch({ type: "isLoading" });

      login(response.data.token, Boolean(response.data.admin));
      if (state.goBackTo && state.goBackTo.backToComment) {
        return history.push(`/noutati/${state.goBackTo.backToComment}`, {
          focusOnComment: true,
        });
      } else {
        history.goBack();
      }
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
      dispatch({ type: "isLoading" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
    clearError(name);
  };

  useEffect(() => {
    // save the state from history for a targeted push after login
    if (history.location.state) {
      dispatch({ type: "goBackTo", payload: history.location.state });
    }
  }, [history.location.state]);

  useEffect(() => {
    // stop changing state if component is unmounted
    return () => {
      cancelFetch.current &&
        cancelFetch.current.cancel(
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
    <section className={loginContainer}>
      {state.isLoading && <Loading size={"5vmax"} />}
      <form onSubmit={handleSubmit} className={loginForm}>
        <h2>{state.isLogin ? "Autentificare" : "Creează cont"}</h2>
        {!state.isLogin && (
          <React.Fragment>
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
          </React.Fragment>
        )}
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
        {!state.isLogin && (
          <React.Fragment>
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
                Parola trebuie să aibă cel puțin opt caractere și să conțină cel
                puțin o literă mică, o majusculă, o cifră și un caracter special
                @ $ ! % * ? &amp;
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
          </React.Fragment>
        )}

        {/* error sent back from the server */}
        <CSSTransition
          unmountOnExit
          in={Boolean(errorMessage.res)}
          timeout={250}
          classNames="errorMessage"
        >
          <p className="errorMessage">{errorMessage.res}</p>
        </CSSTransition>
        <button>{state.isLogin ? "Logheză-te" : "Creează Cont"}</button>
        <p>
          {state.isLogin ? "Nu ai cont?" : "Ai deja cont?"}{" "}
          <span
            onClick={() => {
              dispatch({ type: "isLogin" });
            }}
          >
            {state.isLogin ? "Creează Cont" : "Loghează-te"}
          </span>
        </p>
      </form>
    </section>
  );
}

export default Login;

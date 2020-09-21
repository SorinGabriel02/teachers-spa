import React, { useReducer, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppContext } from "../context/appContext";
import useHttpReq from "../hooks/useHttpReq";
import useValidation from "../hooks/useValidation";
import Loading from "../components/Loading";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";
import XBtn from "../components/XBtn";

import { loginContainer, loginForm } from "./Login.module.scss";

const initialState = {
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
  const nameRef = useRef();
  const emailRef = useRef();
  const [data, err, makeReq, cancelReq, clearErr] = useHttpReq();
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

    const reqRoute = state.isLogin ? "/api/users/login" : "/api/users/signup";
    const reqBody = state.isLogin
      ? { email: state.email, password: state.password }
      : {
          username: state.name,
          email: state.email,
          password: state.password,
        };
    dispatch({ type: "isLoading" });

    await makeReq("post", reqRoute, reqBody);

    dispatch({ type: "isLoading" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
    clearError(name);
  };

  const passwordError = Boolean(!isPassword && errorMessage.password);
  const emailError = Boolean(!isEmail && errorMessage.email);
  const nameError = Boolean(!isName && errorMessage.name);
  const samePassword = Boolean(
    state.password && state.password === state.passwordRepeat
  );

  const modalMessage = () => {
    if (err.data.errorMessage) {
      return <h3>{err.data.errorMessage}</h3>;
    }
    if (err.status === 401) {
      return <h3>Emailul sau parola nu se potrivesc.</h3>;
    }
    return <h3>Eroare de server. Te rugăm să încerci mai târziu.</h3>;
  };

  const clearErrModal = () => {
    clearErr();
    emailRef?.current && emailRef.current.focus();
  };

  useEffect(() => {
    if (data?.token) {
      login(data.token, Boolean(data.admin));
      // if user came here from comments section and has to be sent back
      if (state.goBackTo?.backToComment) {
        return history.push(`/noutati/${state.goBackTo.backToComment}`, {
          focusOnComment: true,
        });
      } else {
        history.goBack();
      }
    }
  }, [data, history, login, state.goBackTo.backToComment]);

  useEffect(() => {
    // save the state from history for a targeted push after login
    if (history.location.state) {
      dispatch({ type: "goBackTo", payload: history.location.state });
    }
  }, [history.location.state]);

  useEffect(() => {
    // focus on email or name input
    state.isLogin
      ? emailRef?.current && emailRef.current.focus()
      : nameRef?.current && nameRef.current.focus();
    // cancel request if user navigates away before a response arrives
    return () => {
      cancelReq && cancelReq.cancel("Request is being canceled");
    };
  }, [state.isLogin, cancelReq]);

  console.log(err);

  return (
    <section className={loginContainer}>
      {state.isLoading && <Loading size={"5vmax"} />}
      {err && (
        <React.Fragment>
          <Backdrop show={Boolean(err)} onClick={clearErrModal} />
          <Modal show={Boolean(err)}>
            <XBtn onClick={clearErrModal} />
            {modalMessage()}
          </Modal>
        </React.Fragment>
      )}
      <form onSubmit={handleSubmit} className={loginForm}>
        <h2>{state.isLogin ? "Autentificare" : "Creează cont"}</h2>
        {!state.isLogin && (
          <React.Fragment>
            <label htmlFor="nume">Nume și Prenume</label>
            <CSSTransition
              in={nameError}
              unmountOnExit
              timeout={250}
              classNames="errorMessage"
            >
              <p className="errorMessage">{errorMessage.name}</p>
            </CSSTransition>
            <input
              ref={nameRef}
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
          ref={emailRef}
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
              in={Boolean(errorMessage.unequalPassword && !samePassword)}
              timeout={250}
              classNames="errorMessage"
            >
              <p className="errorMessage">{errorMessage.unequalPassword}</p>
            </CSSTransition>
            <p className="infoMessage">
              Parola trebuie să aibă cel puțin opt caractere și să conțină cel
              puțin o literă mică, o majusculă, o cifră și un caracter special @
              $ ! % * ? &amp;
            </p>
          </React.Fragment>
        )}
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

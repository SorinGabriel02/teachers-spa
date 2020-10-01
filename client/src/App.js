import React, { useState, useEffect, useCallback, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ReactGA from "react-ga";

import { AppContext } from "./context/appContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Legislatie from "./pages/Legislatie";
import Documents from "./pages/Documents";
import Materials from "./pages/Materials";
import Noutati from "./pages/Noutati";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import SelectedPost from "./pages/SelectedPost";
import Loading from "./components/Loading";
import CookiePolicy from "./components/CookiePolicy";

import { app } from "./App.module.scss";

function App() {
  const { isAuthenticated, isAdmin, appLoading } = useContext(AppContext);
  const [cookiesOk, setCookiesOk] = useState(
    Boolean(localStorage.getItem("cookiesOk"))
  );

  const handleAccept = useCallback(() => {
    localStorage.setItem("cookiesOk", true);
    setCookiesOk(true);
    ReactGA.initialize("UA-179230022-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  // accept cookie policy on scroll or exploring site
  useEffect(() => {
    const acceptedOnBrowse = (e) => {
      if (e.target.nodeName === "A" || e.target.nodeName === "IMG") {
        if (!cookiesOk) handleAccept();
        window.removeEventListener("click", acceptedOnBrowse);
      }
    };

    const acceptedOnScroll = () => {
      if (!cookiesOk) handleAccept();
      window.removeEventListener("scroll", acceptedOnScroll);
    };

    if (!cookiesOk) {
      window.addEventListener("click", acceptedOnBrowse);
      window.addEventListener("scroll", acceptedOnScroll);
    }
  }, [cookiesOk, handleAccept]);

  if (appLoading) return <Loading />;

  return (
    <div className={app}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/legislatie">
          <Legislatie />
        </Route>
        <Route path="/documente">
          <Documents />
        </Route>
        <Route exact path="/materiale">
          <Materials />
        </Route>
        <Route exact path="/materiale/:pageName">
          <Noutati />
        </Route>
        <Route exact path="/articol/:pageName/:postId">
          <SelectedPost />
        </Route>
        <Route exact path="/noutati/:pageName">
          <Noutati />
        </Route>
        <Route path="/autentificare">
          {!isAuthenticated ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/:pageName/postNou">
          {isAuthenticated && isAdmin ? <NewPost /> : <Redirect to="/" />}
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
      <CSSTransition
        classNames="policyContainer"
        timeout={250}
        mountOnEnter
        unmountOnExit
        in={!cookiesOk}
      >
        <CookiePolicy handleAccept={handleAccept} />
      </CSSTransition>
    </div>
  );
}

export default App;

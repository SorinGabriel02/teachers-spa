import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import { AppContext } from "./context/appContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Legislatie from "./pages/Legislatie";
import Documente from "./pages/Documente";
import Materiale from "./pages/Materiale";
import Noutati from "./pages/Noutati";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewPost from "./pages/NewPost";

import { app } from "./App.module.scss";

function App() {
  const { isAuthenticated, isAdmin, login } = useContext(AppContext);

  const [refreshInterval, setRefreshInterval] = useState(false);
  const [intervalId, setIntervalId] = useState(0);

  // on first render, if possible, token is being refreshed
  useEffect(() => {
    const initialRefresh = async () => {
      try {
        const response = await axios.get("/users/refresh");
        if (response.data.token) {
          console.log("initial call", response.data);
          login(response.data.token, response.data.admin);
          setRefreshInterval((prevInt) => (prevInt ? false : true));
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    initialRefresh();
  }, [login]);

  // refresh token at a certain interval
  useEffect(() => {
    const id = setTimeout(async () => {
      try {
        const response = await axios.get("/users/refresh");
        console.log("inside silent refresh call", response.data);
        if (response.data.token) {
          login(response.data.token, response.data.admin);
          setRefreshInterval((prevInt) => (prevInt ? false : true));
        }
      } catch (error) {
        console.log(error.response);
      }
    }, 10 * 1000);
    setIntervalId(id);
  }, [refreshInterval, login]);

  console.log(intervalId);
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
          <Documente />
        </Route>
        <Route path="/materiale">
          <Materiale />
        </Route>
        <Route path="/noutati">
          <Noutati />
        </Route>
        <Route path="/autentificare">
          {!isAuthenticated ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/contNou">
          {!isAuthenticated ? <Signup /> : <Redirect to="/" />}
        </Route>
        <Route path="/postNou">
          {isAuthenticated && isAdmin ? <NewPost /> : <Redirect to="/" />}
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

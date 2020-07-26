import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

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
  const { isAuthenticated, isAdmin } = useContext(AppContext);

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

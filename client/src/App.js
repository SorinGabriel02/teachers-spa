import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Legislatie from "./pages/Legislatie";
import Documente from "./pages/Documente";
import Materiale from "./pages/Materiale";
import Noutati from "./pages/Noutati";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";

import { app } from "./App.module.scss";

function App() {
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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/new">
          <NewPost />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

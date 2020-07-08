import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { AppContextProvider } from "./context/appContext";
import App from "./App";
import "./index.scss";

ReactDOM.render(
  <AppContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContextProvider>,
  document.getElementById("root")
);

import React, { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AppContext = createContext();

function AppContextProvider({ children }) {
  // const [timeoutId, setTimeoutId] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const logout = () => {
    setIsAuthenticated("");
    setIsAdmin(false);
  };

  const login = (token, admin) => {
    setIsAuthenticated(token);
    setIsAdmin(admin);
  };

  const handleError = (errMessage) => setErrorMessage(errMessage);

  useEffect(() => {
    axios
      .get("/users/refresh")
      .then((response) => {
        console.log(response.data.token);
        setIsAuthenticated(response.data.token);
        setIsAdmin(response.data.admin);
      })
      .catch((err) => {
        console.log(err.response);
        if (err) logout();
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        login,
        logout,
        errorMessage,
        handleError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };

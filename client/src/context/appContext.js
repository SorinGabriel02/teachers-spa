import React, { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("admin"));
  const [errorMessage, setErrorMessage] = useState("");

  const logout = () => {
    setIsAuthenticated("");
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  const login = () => {
    setIsAuthenticated(localStorage.getItem("token"));
    setIsAdmin(!!localStorage.getItem("admin"));
  };

  const handleError = (errMessage) => setErrorMessage(errMessage);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const expires = jwtDecode(token).exp;
      if (Date.now() >= expires * 1000) {
        logout();
      }
    }
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

import React, { useState, createContext } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("admin"));
  const [error, setError] = useState(null);

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  const login = () => {
    setIsAuthenticated(localStorage.getItem("token"));
    setIsAdmin(!!localStorage.getItem("admin"));
  };

  const handleError = (err) => setError(err);

  return (
    <AppContext.Provider
      value={{ isAuthenticated, isAdmin, login, logout, error, handleError }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };

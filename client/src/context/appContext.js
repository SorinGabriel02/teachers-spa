import React, { useState, createContext, useEffect } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = () => {
    setIsAuthenticated(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  const login = () => {
    setIsAuthenticated(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("admin"));
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };

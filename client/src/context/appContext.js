import React, { useState, createContext } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };

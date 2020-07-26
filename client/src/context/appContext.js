import React, { useState, useCallback, createContext } from "react";
import axios from "axios";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const logout = async () => {
    setIsAuthenticated("");
    setIsAdmin(false);
    await axios
      .get("/users/logout", {
        headers: {
          Authentication: `Bearer ${isAuthenticated}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  const login = useCallback((token, admin) => {
    setIsAuthenticated(token);
    setIsAdmin(admin);
  }, []);

  const handleError = (errMessage) => setErrorMessage(errMessage);

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

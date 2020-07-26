import React, { useState, useEffect, useCallback, createContext } from "react";
import axios from "axios";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [refreshInterval, setRefreshInterval] = useState(false);
  const [intervalId, setIntervalId] = useState(0);

  const logout = async () => {
    setIsAuthenticated("");
    setIsAdmin(false);
    try {
      await axios.get("/users/logout", {
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
      });
      setRefreshInterval(false);
      clearInterval(intervalId);
    } catch (error) {
      console.log(error.response);
    }
  };

  const login = useCallback((token, admin) => {
    setIsAuthenticated(token);
    setIsAdmin(admin);
    setRefreshInterval(true);
  }, []);

  const handleError = (errMessage) => setErrorMessage(errMessage);

  // on first render, if possible, token is being refreshed
  useEffect(() => {
    const initialRefresh = async () => {
      try {
        const response = await axios.get("/users/refresh");
        if (response.data.token) {
          console.log("initial call", response.data);
          login(response.data.token, response.data.admin);
          setRefreshInterval(true);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    initialRefresh();
  }, [login]);

  // if user is logged in setup an interval
  // for the token to be refreshed just before it expires
  // (15 minutes - 5 seconds = 14 minutes 55 seconds)
  useEffect(() => {
    if (refreshInterval) {
      const id = setInterval(async () => {
        try {
          const response = await axios.get("/users/refresh");
          console.log("inside silent refresh call", response.data);
          if (response.data.token) {
            login(response.data.token, response.data.admin);
          }
        } catch (error) {
          console.log(error.response);
        }
      }, 14 * 60 * 1000 + 55 * 1000); /* 14 minutes and 55 seconds */
      setIntervalId(id);
    }
  }, [login, refreshInterval]);

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

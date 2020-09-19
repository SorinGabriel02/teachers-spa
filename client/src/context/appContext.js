import React, { useState, useEffect, useCallback, createContext } from "react";
import axios from "axios";

const AppContext = createContext();

function AppContextProvider({ children }) {
  // show loading until we get a response from the refresh token answer
  const [appLoading, setAppLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(false);
  const [intervalId, setIntervalId] = useState(0);

  const logout = async () => {
    setIsAuthenticated("");
    setIsAdmin(false);
    try {
      await axios.get("/api/users/logout", {
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
    setAppLoading(false);
    setRefreshInterval(true);
  }, []);

  // on first render, if possible, token is being refreshed
  useEffect(() => {
    const initialRefresh = async () => {
      try {
        const response = await axios.get("/api/users/refresh");
        const token = response.data.token;
        if (token) {
          login(token, Boolean(response.data.admin));
        }
      } catch (error) {
        if (error.response?.status === 401)
          console.log("User is not logged in.");
        setAppLoading(false);
      }
    };
    initialRefresh();
  }, [login]);

  // if user is logged in setup an interval
  // for the token to be refreshed just before it expires
  // (14 minutes 55 seconds, must correspond with the backend)
  useEffect(() => {
    if (refreshInterval) {
      const id = setInterval(async () => {
        try {
          const response = await axios.get("/api/users/refresh");
          if (response.data.token) {
            login(response.data.token, response.data.admin);
          }
        } catch (error) {
          console.log(error.response);
        }
      }, 14 * 60 * 1000 + 55 * 1000); /* 14 minutes +  55 seconds */
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
        appLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };

import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../context/appContext";
import Loading from "../components/Loading";

import { newsBtn } from "./Noutati.module.scss";

function Noutati(props) {
  const cancelFetch = useRef(null);
  const { isAdmin } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        cancelFetch.current = axios.CancelToken.source();
        const response = axios.get("/posts");
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPosts();
    return () => {
      cancelFetch.current &&
        cancelFetch.current.cancel(
          "component dismounts, api is being canceled"
        );
    };
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      <h1>Noutati</h1>
      {isAdmin && (
        <NavLink to="/postNou">
          <button className={newsBtn}>Creează post</button>
        </NavLink>
      )}
    </div>
  );
}

export default Noutati;

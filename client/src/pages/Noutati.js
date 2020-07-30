import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import SunEditor from "suneditor-react";
import axios from "axios";

import { AppContext } from "../context/appContext";
import Loading from "../components/Loading";

import { newsBtn, editContainer } from "./Noutati.module.scss";
import "suneditor/dist/css/suneditor.min.css";

function Noutati(props) {
  const cancelFetch = useRef(null);
  const { isAdmin } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const setOptionsObj = {
    height: "65.5vh",
    mode: "balloon",
    resizingBar: false,
    defaultStyle: { border: "3px solid red" },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        cancelFetch.current = axios.CancelToken.source();
        const response = await axios.get("/posts");
        setPosts([...response.data]);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchPosts();
    return () => {
      cancelFetch.current &&
        cancelFetch.current.cancel(
          "component dismounts, api is being canceled"
        );
    };
  }, []);

  const postsList = posts.map((post) => (
    <section key={post._id} className={editContainer}>
      <SunEditor
        showToolbar={false}
        enableToolbar={false}
        setContents={post.content}
        disable={true}
        setOptions={setOptionsObj}
      />
    </section>
  ));

  return (
    <div>
      {isLoading && <Loading />}
      {isAdmin && (
        <NavLink to="/postNou">
          <button className={newsBtn}>Creează post</button>
        </NavLink>
      )}

      <main>{postsList}</main>
    </div>
  );
}

export default Noutati;

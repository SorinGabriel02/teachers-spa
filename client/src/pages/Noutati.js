import React, { useReducer, useEffect, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import SunEditor from "suneditor-react";

import { AppContext } from "../context/appContext";
import useHttpReq from "../hooks/useHttpReq";
import Loading from "../components/Loading";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";

import { newsBtn, editContainer, notFound } from "./Noutati.module.scss";
import "suneditor/dist/css/suneditor.min.css";

const initialState = { isLoading: true };

function postsReducer(state, action) {
  switch (action.type) {
    case "fetch":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

function Noutati(props) {
  const ref = useRef(null);
  const { isAdmin } = useContext(AppContext);
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [posts, err, makeReq, cancelReq] = useHttpReq();

  const setOptionsObj = {
    height: "65.5vh",
    mode: "balloon",
    resizingBar: false,
  };

  const postsList =
    posts &&
    posts
      .sort((a, b) => {
        // sort the posts by creation date last to first
        const aCreatedAt = Date.parse(a.createdAt);
        const bCreatedAt = Date.parse(b.createdAt);
        return bCreatedAt - aCreatedAt;
      })
      .map((post) => (
        <section key={post.id} className={editContainer}>
          <NavLink
            style={{ textDecoration: "none" }}
            to={`/noutati/${post._id}`}
          >
            <SunEditor
              ref={ref}
              showToolbar={false}
              enableToolbar={false}
              setContents={post.content}
              disable={true}
              setDefaultStyle={
                "background-color: rgb(240, 240, 230); overflow-x: hidden; overflow-y: hidden;"
              }
              setOptions={setOptionsObj}
            />
          </NavLink>
        </section>
      ));

  const handleClick = () => {};

  // get post on page load
  useEffect(() => {
    dispatch({ type: "fetch", payload: true });
    makeReq("get", "/posts");
  }, [makeReq]);

  // when a response arrives isLoading = false
  useEffect(() => {
    if (posts || err) dispatch({ type: "fetch", payload: false });
  }, [posts, err]);

  // cancel request if one is active on component dismount
  useEffect(() => {
    return () => {
      cancelReq &&
        cancelReq.cancel("component dismounts, api is being canceled");
    };
  }, [cancelReq]);

  return (
    <div>
      <Backdrop show={state.isLoading} />
      {state.isLoading && <Loading />}
      <Backdrop
        onClick={handleClick}
        show={!!err || (postsList && !postsList.length)}
      />
      <Modal show={(postsList && !postsList.length) || !!err}>
        <button onClick={handleClick} className={newsBtn}>
          x
        </button>
        <h1>Momentan nu a fost găsit nici un articol.</h1>
      </Modal>
      {isAdmin && posts && (
        <NavLink to="/postNou">
          <button className={newsBtn}>Publică articol</button>
        </NavLink>
      )}
      <main>{postsList}</main>
    </div>
  );
}

export default Noutati;

import React, { useReducer, useEffect, useContext, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import SunEditor from "suneditor-react";

import { AppContext } from "../context/appContext";
import useHttpReq from "../hooks/useHttpReq";
import Loading from "../components/Loading";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";
import XBtn from "../components/XBtn";

import { publishBtn, editContainer } from "./Noutati.module.scss";
import "suneditor/dist/css/suneditor.min.css";

const initialState = { isLoading: true, showModal: false };

function postsReducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "showModal":
      return {
        ...state,
        showModal: action.payload,
      };
    default:
      return state;
  }
}

function Noutati() {
  const ref = useRef(null);
  const history = useHistory();
  const { isAdmin } = useContext(AppContext);
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [posts, err, makeReq, cancelReq, clearErr] = useHttpReq();

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
            to={`/noutati/${post.id}`}
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

  const handleClick = () => {
    if (!isAdmin) {
      history.push("/");
    } else {
      clearErr();
    }
  };

  // get post on page load
  useEffect(() => {
    dispatch({ type: "isLoading", payload: true });
    makeReq("get", "/posts");
  }, [makeReq]);

  // when a response arrives isLoading = false
  useEffect(() => {
    if (posts || err) dispatch({ type: "isLoading", payload: false });
  }, [posts, err]);

  // cancel request if one is active on component dismount
  useEffect(() => {
    return () => {
      cancelReq &&
        cancelReq.cancel("component dismounts, api is being canceled");
    };
  }, [cancelReq]);

  if (postsList?.length && !Boolean(err)) {
    return <h1>Pentru moment nu sunt noutăți</h1>;
  }

  return (
    <div>
      <Backdrop show={state.isLoading} />
      {state.isLoading && <Loading />}
      <Backdrop
        onClick={handleClick}
        show={Boolean(err) || (postsList && !postsList.length)}
      />
      <Modal show={(postsList && !postsList.length) || Boolean(err)}>
        <XBtn onClick={handleClick} />
        <h1>
          Momentan nu a fost găsit nici un articol. Te rog să încerci mai
          târziu.
        </h1>
      </Modal>
      {isAdmin && posts && (
        <NavLink to="/postNou">
          <button className={publishBtn}>Publică articol</button>
        </NavLink>
      )}
      <main>{postsList}</main>
    </div>
  );
}

export default Noutati;

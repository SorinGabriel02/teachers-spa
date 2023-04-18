import React, { useReducer, useEffect, useContext, useRef } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";

import { AppContext } from "../context/appContext";
import useHttpReq from "../hooks/useHttpReq";
import useHeader from "../hooks/useHeader";
import Loading from "../components/Loading";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";
import XBtn from "../components/XBtn";

import "suneditor/dist/css/suneditor.min.css";

const initialState = { isLoading: true, noPosts: false };

function postsReducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "noPosts":
      return {
        ...state,
        noPosts: action.payload,
      };
    default:
      return state;
  }
}

function Noutati() {
  const ref = useRef(null);
  const history = useHistory();
  const { pageName } = useParams();
  const { isAdmin } = useContext(AppContext);
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [posts, err, makeReq, cancelReq] = useHttpReq();
  const [chooseHeader] = useHeader();

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
      .map(post => (
        <article key={post.id} className={"editorContainer"}>
          <NavLink
            style={{ textDecoration: "none" }}
            to={`/articol/${pageName}/${post.id}`}
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
        </article>
      ));

  const handleClick = () => history.push("/");

  // get post on page load
  useEffect(() => {
    dispatch({ type: "isLoading", payload: true });
    makeReq("get", `/api/posts/page/${pageName}`);
  }, [makeReq, pageName]);

  // when a response arrives isLoading = false
  useEffect(() => {
    if (posts || err) dispatch({ type: "isLoading", payload: false });
    if (posts?.length === 0 && !Boolean(err))
      dispatch({ type: "noPosts", payload: true });
  }, [posts, err]);

  // cancel request if one is active on component dismount
  useEffect(() => {
    return () => {
      cancelReq &&
        cancelReq.cancel("component dismounts, api is being canceled");
    };
  }, [cancelReq]);

  return (
    <main className={"newsContainer"}>
      {state.isLoading && <Loading />}
      <Backdrop
        onClick={handleClick}
        show={(Boolean(err) && !postsList?.length) || state.isLoading}
      />
      <Modal show={!postsList?.length && Boolean(err)}>
        <XBtn onClick={handleClick} />
        <h1>Eroare de server. Te rog să încerci mai târziu.</h1>
      </Modal>
      {isAdmin && posts && (
        <NavLink to={`/${pageName}/postNou`}>
          <button className={"publishBtn"}>Publică articol</button>
        </NavLink>
      )}
      {state.noPosts ? (
        <h1 className={"notFound"}>
          Această pagină va fi actualizată în curând
        </h1>
      ) : (
        <React.Fragment>
          <header className={"headerContainer"}>
            <h1>{chooseHeader(pageName)}</h1>
            <h4>Accesează pentru a vedea fiecare articol în detaliu</h4>
          </header>
          <section className={"postsSection"}>{postsList}</section>
        </React.Fragment>
      )}
    </main>
  );
}

export default Noutati;

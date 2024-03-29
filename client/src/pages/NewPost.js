import React, { useReducer, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { AppContext } from "../context/appContext";
import PostEditor from "../components/PostEditor";
import Loading from "../components/Loading";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";
import XBtn from "../components/XBtn";
import useHttpReq from "../hooks/useHttpReq";

const initialState = {
  isLoading: false,
  editorState: "",
  showError: false,
};

function newPostReducer(state, action) {
  switch (action.type) {
    case "publish":
      return {
        ...state,
        isLoading: true,
      };
    case "postSaved":
      return {
        ...state,
        isLoading: false,
      };
    case "contentChange":
      return {
        ...state,
        editorState: action.payload,
      };
    case "showError":
      return {
        ...state,
        showError: action.payload,
      };
    default:
      return state;
  }
}

function NewPost() {
  const history = useHistory();
  const { pageName } = useParams();
  const { isAuthenticated } = useContext(AppContext);
  const [postData, err, makeReq, cancelReq] = useHttpReq();
  const [state, dispatch] = useReducer(newPostReducer, initialState);

  const handleChange = content =>
    dispatch({ type: "contentChange", payload: content });

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch({ type: "publish" });
    await makeReq(
      "post",
      `/api/posts/${pageName}/new`,
      { content: state.editorState },
      { headers: { Authorization: `Bearer ${isAuthenticated}` } }
    );
    dispatch({ type: "postSaved" });
  };

  const hideError = () => dispatch({ type: "showError", payload: false });

  useEffect(() => {
    if (postData) history.goBack();
    if (err) dispatch({ type: "showError", payload: true });
    return () => {
      if (cancelReq)
        cancelReq.cancel("component dismounted, api request canceled");
    };
  }, [cancelReq, postData, err, history]);

  const btnDisable = !state.editorState ? true : false;

  if (state.isLoading)
    return (
      <React.Fragment>
        <Backdrop />
        <Loading />
      </React.Fragment>
    );

  return (
    <main>
      <Backdrop show={state.showError} onClick={hideError} />
      <Modal show={state.showError}>
        <XBtn onClick={() => history.goBack()} />
        <hr />
        <h2>
          {err && err.status === 401
            ? "Autentificare necesară. Nu ai permisiunea de a salva acest articol."
            : "Eroare de server. Te rog să încerci mai târziu."}
        </h2>
      </Modal>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <PostEditor handleChange={handleChange} />
        <button className={"publish"} disabled={btnDisable}>
          Publică Articolul
        </button>
      </form>
    </main>
  );
}

export default NewPost;

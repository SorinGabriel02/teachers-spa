import React, { useEffect, useRef, useReducer, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import { matsContainer, editBtn } from "./SelectedMaterial.module.scss";
import { AppContext } from "../context/appContext";
import useHttpReq from "../hooks/useHttpReq";
import PostEditor from "../components/PostEditor";
import Backdrop from "../components/Backdrop";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import XBtn from "../components/XBtn";

const initialState = {
  isLoading: false,
  content: "",
  editMode: false,
  editorContent: "",
};

const matsReducer = (state, action) => {
  switch (action.type) {
    case "makeRequest":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "editMode":
      return {
        ...state,
        editMode: !state.editMode,
      };
    case "dataReceived":
      return {
        ...state,
        isLoading: false,
        editorContent: action.payload,
      };
    case "editPost":
      return {
        ...state,
        editorContent: action.payload,
      };
    default:
      return state;
  }
};

function SelectedMaterial() {
  const { pageName } = useParams();
  const editorRef = useRef();
  const history = useHistory();
  const { isAuthenticated, isAdmin } = useContext(AppContext);
  const [state, dispatch] = useReducer(matsReducer, initialState);
  const [data, err, makeReq, cancelReq] = useHttpReq();

  const handleClick = () => {
    if (!state.editMode) return dispatch({ type: "editMode" });
    dispatch({ type: "makeRequest", payload: true });
    makeReq(
      "patch",
      `/api/posts/update/${data.post.id}`,
      { content: state.editorContent },
      { headers: { Authorization: `Bearer ${isAuthenticated}` } }
    );
    dispatch({ type: "editMode" });
  };

  const handleChange = (content) => {
    dispatch({ type: "editPost", payload: content });
  };

  const closeErrModal = () => history.goBack();

  useEffect(() => {
    dispatch({ type: "makeRequest", payload: true });
    if (!data) makeReq("get", `/api/posts/page/${pageName}`);
  }, [makeReq, data, pageName]);

  useEffect(() => {
    if (data && data.post)
      dispatch({ type: "dataReceived", payload: data.post.content });
    if (err || data?.message) dispatch({ type: "makeRequest", payload: false });
  }, [data, err]);

  useEffect(() => {
    return () => {
      if (cancelReq)
        cancelReq.cancel("component dismounted, api request canceled");
    };
  }, [cancelReq]);

  if (err) {
    return (
      <main className={matsContainer}>
        <Backdrop show={Boolean(err)} />
        <Modal show={Boolean(err)}>
          <XBtn onClick={closeErrModal} />
          <h3>
            {err.errorMessage
              ? err.errorMessage
              : "Eroare de server, te rog încearcă mai târziu."}
          </h3>
        </Modal>
      </main>
    );
  }

  return (
    <main className={matsContainer}>
      {isAuthenticated && isAdmin && (
        <button
          disabled={state.isLoading}
          className={editBtn}
          onClick={handleClick}
        >
          {state.editMode ? "Salvează" : "Editează"}
        </button>
      )}
      {state.isLoading ? (
        <Loading />
      ) : (
        <PostEditor
          forwardRef={editorRef}
          disable={!state.editMode}
          handleChange={handleChange}
          editorContent={state.editorContent}
        />
      )}
    </main>
  );
}

export default SelectedMaterial;

import React, { useReducer, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import SunEditor from "suneditor-react";
import { AppContext } from "../context/appContext";
import useHttpReq from "../hooks/useHttpReq";
import Loading from "../components/Loading";
import Comment from "../components/Comment";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";

import "suneditor/dist/css/suneditor.min.css";
import {
  btnSection,
  editBtn,
  deleteBtn,
  commentsSection,
  deleteModal,
} from "./SelectedPost.module.scss";

const initialState = {
  isLoading: true,
  deleteModal: false,
  postData: "",
  commentsData: [],
  comment: "",
};

function postReducer(state, action) {
  switch (action.type) {
    case "getData":
      return { ...state, isLoading: true };
    case "dataRetrieved":
      return {
        ...state,
        isLoading: false,
        postData: action.payload.post,
        commentsData: action.payload.comments,
      };
    case "deleteModal":
      return {
        ...state,
        deleteModal: action.payload,
      };
    case "deletePost":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

function SelectedPost() {
  const { postId } = useParams();
  const history = useHistory();
  const { isAuthenticated, isAdmin } = useContext(AppContext);
  const [state, dispatch] = useReducer(postReducer, initialState);
  const [data, err, makeReq, cancelReq] = useHttpReq();

  const postEditorOptions = {
    minHeight: "70vh",
    height: "auto",
    mode: "balloon",
    resizingBar: false,
  };

  const handleComment = (content) => {};

  const comments =
    state.commentsData &&
    state.commentsData.map((comment) => {
      return <li key={comment.id}>{comment.content}</li>;
    });

  const showDeleteModal = () =>
    dispatch({ type: "deleteModal", payload: true });
  const hideDeleteModal = () =>
    dispatch({ type: "deleteModal", payload: false });
  const deleteArticle = async () => {
    hideDeleteModal();
    dispatch({ type: "deletePost" });
    await makeReq("delete", `/posts/delete/${postId}`, {
      headers: { Authorization: `Bearer ${isAuthenticated}` },
    });
    history.push("/noutati");
  };
  // get post data when component mounts
  useEffect(() => {
    dispatch({ type: "getData" });
    makeReq("get", `/posts/${postId}`);
  }, [makeReq, postId]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: "dataRetrieved",
        payload: {
          post: data.post.content,
          comments: [...data.post.comments],
        },
      });
    }
  }, [data]);

  // cancel request if active on componentWillUnmount
  useEffect(() => {
    return () => {
      cancelReq &&
        cancelReq.cancel("component dismounts, api call is being canceled");
    };
  }, [cancelReq]);

  if (state.isLoading)
    return (
      <React.Fragment>
        <Backdrop show={state.isLoading} onClick={hideDeleteModal} />
        <Loading />
      </React.Fragment>
    );

  return (
    <main>
      <Backdrop show={state.deleteModal} onClick={hideDeleteModal} />
      <Modal show={state.deleteModal} className={deleteModal}>
        <header>
          <h3>Te rog confirmă ștergerea permanentă a articolului</h3>
        </header>
        <hr />
        <main>
          <button className={deleteBtn} onClick={deleteArticle}>
            Șterge
          </button>
          <button className={editBtn} onClick={hideDeleteModal}>
            Anulează
          </button>
        </main>
      </Modal>

      {isAdmin && (
        <section className={btnSection}>
          <button className={editBtn}>Editează Articolul</button>
          <button className={deleteBtn} onClick={showDeleteModal}>
            Șterge Articolul
          </button>
        </section>
      )}
      <section>
        <SunEditor
          showToolbar={false}
          enableToolbar={false}
          setContents={state.postData}
          disable={true}
          setOptions={postEditorOptions}
          setDefaultStyle={"background-color: rgb(228, 228, 230); padding: 2%;"}
        />
      </section>
      <section className={commentsSection}>
        <h2>Comentarii:</h2>
        {state.commentsData && !state.commentsData.length ? (
          <p style={{ textAlign: "center" }}>
            Pentru moment nu sunt comentarii.
          </p>
        ) : (
          <ul>{comments}</ul>
        )}
      </section>
      <Comment />
    </main>
  );
}

export default SelectedPost;

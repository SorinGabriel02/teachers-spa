import React, { useReducer, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import axios from "axios";

import { AppContext } from "../context/appContext";
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
  isLoading: false,
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
      };
    default:
      return state;
  }
}

function SelectedPost() {
  const { postId } = useParams();
  const cancelFetch = useRef(null);
  const { isAdmin } = useContext(AppContext);
  const [state, dispatch] = useReducer(postReducer, initialState);

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
  const deleteArticle = () => {
    console.log("Deleting article...");
    hideDeleteModal();
  };

  useEffect(() => {
    dispatch({ type: "getData" });
    const fetchPost = async () => {
      try {
        cancelFetch.current = axios.CancelToken.source();
        const response = await axios.get(`/posts/${postId}`);

        dispatch({
          type: "dataRetrieved",
          payload: {
            post: response.data.post.content,
            comments: [...response.data.post.comments],
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();

    return () => {
      cancelFetch.current &&
        cancelFetch.current.cancel(
          "component dismounts, api is being canceled"
        );
    };
  }, [postId]);

  if (state.isLoading) return <Loading />;

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

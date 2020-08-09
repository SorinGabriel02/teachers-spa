import React, { useReducer, useEffect, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import { AppContext } from "../context/appContext";
import useHttpReq from "../hooks/useHttpReq";
import PostEditor from "../components/PostEditor";
import PostedComment from "../components/PostedComment";
import Loading from "../components/Loading";
import Comment from "../components/Comment";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";
import XBtn from "../components/XBtn";

import "suneditor/dist/css/suneditor.min.css";
import {
  btnSection,
  sendCommentBtn,
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
  commentInput: "",
  resetInput: false,
  editPost: false,
};

function postReducer(state, action) {
  switch (action.type) {
    case "apiCall":
      return { ...state, isLoading: true };
    case "dataRetrieved":
      return {
        ...state,
        isLoading: false,
        postData: action.payload.post,
        commentsData: action.payload.comments,
      };
    case "newComment":
      return {
        ...state,
        isLoading: false,
        commentsData: [...state.commentsData, action.payload],
        commentInput: "",
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
    case "commentInput":
      return {
        ...state,
        commentInput: action.payload,
      };
    case "editPost":
      return {
        ...state,
        editPost: !state.editPost,
      };
    case "postChange":
      return {
        ...state,
        postData: action.payload,
      };
    default:
      return state;
  }
}

function SelectedPost() {
  const { postId } = useParams();
  const history = useHistory();

  const ref = useRef();
  const { isAuthenticated, isAdmin } = useContext(AppContext);
  const [state, dispatch] = useReducer(postReducer, initialState);
  const [data, err, makeReq, cancelReq] = useHttpReq();

  const updateComments =
    state.commentsData &&
    state.commentsData.length &&
    state.commentsData.map((comment) => (
      <PostedComment key={comment.id} comment={comment} />
    ));

  const handleComment = (value) =>
    dispatch({ type: "commentInput", payload: value });

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

  const postComment = () => {
    if (!isAuthenticated) {
      // adding a piece of state, login component will know
      // the user wants to post a comment and bring him back
      return history.push("/autentificare", {
        backToComment: postId,
      });
    }
    if (isAuthenticated && !state.commentInput) return ref.current.focus();

    dispatch({ type: "apiCall" });
    makeReq(
      "post",
      `/comments/${postId}/new`,
      { content: state.commentInput },
      {
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
      }
    );
  };

  const handlePostEdit = () => {
    dispatch({ type: "editPost" });
  };

  const handlePostChange = (content) => {
    dispatch({ type: "postChange", payload: content });
  };

  const handleXBtn = () => {
    console.log("x pushed");
  };

  // get post data when component mounts
  useEffect(() => {
    dispatch({ type: "apiCall" });
    makeReq("get", `/posts/${postId}`);
  }, [makeReq, postId]);

  useEffect(() => {
    if (data && data.post) {
      dispatch({
        type: "dataRetrieved",
        payload: {
          post: data.post.content,
          comments: [...data.post.comments],
        },
      });
      if (history.location.state && history.location.state.focusOnComment)
        ref.current.focus();
    }
    if (data && data.comment) {
      dispatch({ type: "newComment", payload: data.comment });
    }
  }, [data, history.location.state]);

  // cancel request if active on componentWillUnmount
  useEffect(() => {
    return () => {
      cancelReq &&
        cancelReq.cancel("component dismounts, api call is being canceled");
    };
  }, [cancelReq]);
  console.log(err);
  return (
    <main>
      {!Boolean(err && err.status) && state.isLoading && !state.postData && (
        <Loading styles={{ top: "45vh" }} />
      )}
      <Modal show={Boolean(err && err.status)}>
        <XBtn onClick={handleXBtn} />
        {err && err.data}
      </Modal>

      <Backdrop
        show={
          Boolean(err && err.status) ||
          state.deleteModal ||
          (state.isLoading && !state.postData)
        }
        onClick={hideDeleteModal}
      />
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
          <button className={editBtn} onClick={handlePostEdit}>
            {!state.editPost ? "Editează Articolul" : "Salvează articolul"}
          </button>
          <button className={deleteBtn} onClick={showDeleteModal}>
            Șterge Articolul
          </button>
        </section>
      )}
      <section>
        <PostEditor
          handleChange={handlePostChange}
          editorContent={state.postData}
          disable={!state.editPost}
        />
      </section>
      <section className={commentsSection}>
        <h2>Comentarii:</h2>
        {state.commentsData && !state.commentsData.length ? (
          <p style={{ textAlign: "center" }}>
            Pentru moment nu sunt comentarii.
          </p>
        ) : (
          <ul>{updateComments}</ul>
        )}
      </section>
      <section>
        <button className={sendCommentBtn} onClick={postComment}>
          {isAuthenticated ? "Adaugă Comentariu" : "Logează-te pentru a posta"}
        </button>
        <Comment
          value={state.commentInput}
          inputRef={ref}
          isLoading={Boolean(state.isLoading && state.postData)}
          onChange={handleComment}
        />
      </section>
    </main>
  );
}

export default SelectedPost;

import React, {
  useReducer,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useParams, useHistory } from "react-router-dom";
import DOMPurify from "dompurify";

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

const initialState = {
  isLoading: true,
  deleteModal: false,
  postData: "",
  commentsData: [],
  commentInput: "",
  resetInput: false,
  editPostMode: false,
};

function postReducer(state, action) {
  switch (action.type) {
    case "apiCall":
      return { ...state, isLoading: action.payload };
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
    case "commentInput":
      return {
        ...state,
        commentInput: action.payload,
      };
    case "editPostMode":
      return {
        ...state,
        editPostMode: !state.editPostMode,
      };
    case "postChange":
      return { ...state, postData: action.payload };
    case "editedComment": {
      const updatedComments =
        action.payload &&
        state.commentsData.map(comm => {
          if (comm.id === action.payload.id) {
            comm.content = action.payload.content;
          }
          return comm;
        });
      return {
        ...state,
        isLoading: false,
        commentsData: updatedComments,
      };
    }
    case "deleteComment": {
      const filteredComments = state.commentsData.filter(
        comm => comm.id !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        commentsData: filteredComments,
      };
    }
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

  const handleComment = value =>
    dispatch({ type: "commentInput", payload: value });

  const showDeleteModal = () =>
    dispatch({ type: "deleteModal", payload: true });

  const hideDeleteModal = () =>
    dispatch({ type: "deleteModal", payload: false });

  const deleteArticle = async () => {
    hideDeleteModal();
    dispatch({ type: "apiCall", payload: true });
    await makeReq("delete", `/api/posts/delete/${postId}`, {
      headers: { Authorization: `Bearer ${isAuthenticated}` },
    });
    history.goBack();
  };

  const postComment = () => {
    if (!isAuthenticated) {
      // add state to history, login component will see
      // the user wants to post a comment and bring him back
      return history.push("/autentificare", { backToComment: postId });
    }
    if (isAuthenticated && !state.commentInput) return ref.current.focus();

    dispatch({ type: "apiCall", payload: true });
    makeReq(
      "post",
      `/api/comments/${postId}/new`,
      { content: DOMPurify.sanitize(state.commentInput) },
      { headers: { Authorization: `Bearer ${isAuthenticated}` } }
    );
  };

  const editComment = useCallback(
    (commentId, edited) => {
      dispatch({ type: "apiCall", payload: true });
      makeReq(
        "patch",
        `/api/comments/${commentId}`,
        { content: DOMPurify.sanitize(edited) },
        { headers: { Authorization: `Bearer ${isAuthenticated}` } }
      );
    },
    [isAuthenticated, makeReq]
  );

  const deleteComment = useCallback(
    async commentId => {
      dispatch({ type: "apiCall", payload: true });
      await makeReq("delete", `/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${isAuthenticated}` },
      });
      if (!err) dispatch({ type: "deleteComment", payload: commentId });
    },
    [isAuthenticated, makeReq, err]
  );

  const handlePostEdit = () => {
    dispatch({ type: "editPostMode" });
    if (state.editPostMode) {
      dispatch({ type: "apiCall", payload: true });
      makeReq(
        "patch",
        `/api/posts/update/${postId}`,
        { content: state.postData },
        { headers: { Authorization: `Bearer ${isAuthenticated}` } }
      );
    }
  };

  const handlePostChange = content =>
    dispatch({ type: "postChange", payload: content });

  const handleXBtn = () => history.goBack();

  const showBackdrop =
    Boolean(err && err.status) ||
    state.editCommentMode ||
    state.deleteModal ||
    (state.isLoading && !state.postData);

  const showLoading =
    !Boolean(err?.status) && state.isLoading && !state.postData;

  const showErrorMessage = err?.data?.errorMessage
    ? err.data.errorMessage
    : "A intervenit o eroare. Te rog să încerci mai târziu.";

  const updateComments = useCallback(() => {
    return (
      state?.commentsData?.length &&
      state.commentsData.map(comment => (
        <PostedComment
          key={comment.id}
          comment={comment}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      ))
    );
  }, [deleteComment, editComment, state.commentsData]);
  // get post data when component mounts
  useEffect(() => {
    dispatch({ type: "apiCall", payload: true });
    makeReq("get", `/api/posts/${postId}`);
  }, [makeReq, postId]);
  // watch for incoming data and refresh UI
  useEffect(() => {
    if (data?.post) {
      dispatch({
        type: "dataRetrieved",
        payload: {
          post: data.post.content,
          comments: [...data.post.comments],
        },
      });
      if (history?.location?.state?.focusOnComment) ref.current.focus();
    }
    if (data?.comment) {
      dispatch({ type: "newComment", payload: data.comment });
    }
    if (data?.updatedComment) {
      dispatch({ type: "editedComment", payload: data.updatedComment });
    }
  }, [data, err, history.location]);
  // cancel request if active and component dismounts
  useEffect(() => {
    return () => {
      cancelReq &&
        cancelReq.cancel("component dismounts, api call is being canceled");
    };
  }, [cancelReq]);

  return (
    <main className={"selectedContainer"}>
      {showLoading && <Loading styles={{ top: "45vh" }} />}
      <Modal show={Boolean(err && err.status)}>
        <XBtn onClick={handleXBtn} />
        <hr />
        {showErrorMessage}
      </Modal>
      <Backdrop show={showBackdrop} onClick={hideDeleteModal} />
      {/* Modal to confirm post delete */}
      <Modal show={state.deleteModal} className={"deleteModal"}>
        <header>
          <h3>Te rog confirmă ștergerea permanentă a articolului.</h3>
        </header>
        <main>
          <button className={"deleteBtn"} onClick={deleteArticle}>
            Șterge
          </button>
          <button className={"editBtn"} onClick={hideDeleteModal}>
            Anulează
          </button>
        </main>
      </Modal>
      <section className={"btnSection"}>
        {isAdmin && (
          <React.Fragment>
            <button
              disabled={state.isLoading}
              className={"editBtn"}
              onClick={handlePostEdit}
            >
              {!state.editPostMode
                ? "Editează Articolul"
                : "Salvează articolul"}
            </button>
            <button className={"deleteBtn"} onClick={showDeleteModal}>
              Șterge Articolul
            </button>
          </React.Fragment>
        )}
        <button onClick={handleXBtn} className={"editBtn"}>
          &lt;&lt; Pagina Anterioară
        </button>
      </section>
      <section className={"editorContainer singlePost"}>
        <PostEditor
          handleChange={handlePostChange}
          editorContent={state.postData}
          disable={!state.editPostMode}
        />
      </section>
      <section className={"commentsSection"}>
        <h2>Comentarii:</h2>
        {state.commentsData && !state.commentsData.length ? (
          <p style={{ textAlign: "center" }}>
            Pentru moment nu sunt comentarii.
          </p>
        ) : (
          <ul>{updateComments()}</ul>
        )}
      </section>
      <section className={"commentContainer"}>
        <button
          disabled={state.isLoading}
          className={"sendCommentBtn"}
          onClick={postComment}
        >
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

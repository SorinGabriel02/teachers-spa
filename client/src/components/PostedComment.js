import React, { useState, useContext } from "react";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";

import { AppContext } from "../context/appContext";
import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";
import Comment from "../components/Comment";

import {
  singleComment,
  commentButtons,
  editBtn,
  deleteBtn,
} from "./PostedComment.module.scss";

function PostedComment({ comment, editComment, deleteComment }) {
  const { isAuthenticated, isAdmin } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [edited, setEdited] = useState(comment.content);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (value) => setEdited(value);

  const editC = () => {
    setShow(true);
    setEditMode(true);
    setEdited(comment.content);
  };

  const deleteC = () => {
    setShow(true);
    setEditMode(false);
  };

  const confirmedDelete = () => {
    deleteComment(comment.id);
    setShow(false);
  };

  const hideModal = () => setShow(false);

  const displayEditBtn =
    isAuthenticated && jwtDecode(isAuthenticated).sub === comment.author;
  const displayDeleteBtn =
    isAuthenticated &&
    (jwtDecode(isAuthenticated).sub === comment.author || isAdmin);
  const noBtnShowing = !displayEditBtn && !displayDeleteBtn;
  return (
    <li className={singleComment}>
      <article>{comment.content}</article>
      <div
        style={noBtnShowing ? { border: "none" } : null}
        className={commentButtons}
      >
        {displayEditBtn && (
          <button onClick={editC} className={editBtn}>
            Editează
          </button>
        )}
        {displayDeleteBtn && (
          <button onClick={deleteC} className={deleteBtn}>
            Șterge
          </button>
        )}
        <Backdrop show={show} onClick={() => setShow(false)} />
        <Modal show={show} className="editCommentContainer">
          {editMode ? (
            <React.Fragment>
              <Comment value={edited} onChange={handleChange} />
              <button onClick={() => editComment(comment.id)}>Salvează</button>
              <button onClick={hideModal}>Anulează</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>Te rog confirmă ștergerea definitivă a comentariului.</p>
              <button onClick={confirmedDelete}>Șterge</button>
              <button onClick={hideModal}>Anulează</button>
            </React.Fragment>
          )}
        </Modal>
      </div>
    </li>
  );
}

PostedComment.propTypes = {
  comment: PropTypes.object.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default PostedComment;

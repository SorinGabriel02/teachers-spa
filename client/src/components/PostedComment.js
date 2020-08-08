import React, { useContext } from "react";
import jwtDecode from "jwt-decode";

import { AppContext } from "../context/appContext";

import {
  singleComment,
  commentButtons,
  editBtn,
  deleteBtn,
} from "./PostedComment.module.scss";

function PostedComment({ comment }) {
  const { isAuthenticated, isAdmin } = useContext(AppContext);

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
        {displayEditBtn && <button className={editBtn}>Editează</button>}
        {displayDeleteBtn && <button className={deleteBtn}>Șterge</button>}
      </div>
    </li>
  );
}

export default PostedComment;

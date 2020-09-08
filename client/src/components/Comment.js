import React, { useContext } from "react";
import PropTypes from "prop-types";

import Loading from "./Loading";
import { AppContext } from "../context/appContext";

import { writeComment } from "./Comment.module.scss";

function Comment(props) {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <div className={writeComment}>
      {props.isLoading && <Loading />}
      <textarea
        maxLength="300"
        ref={props.inputRef}
        disabled={props.isLoading || !isAuthenticated}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Postează un comentariu..."
      />
      <p>Caractere rămase: {300 - props.value.length}</p>
    </div>
  );
}

Comment.propTypes = {
  inputRef: PropTypes.object,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Comment;

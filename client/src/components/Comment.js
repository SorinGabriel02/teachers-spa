import React, { useContext, useState } from "react";
import Loading from "./Loading";
import { AppContext } from "../context/appContext";

import { writeComment } from "./Comment.module.scss";

function Comment(props) {
  const { isAuthenticated } = useContext(AppContext);
  const [textInput, setTextInput] = useState();

  const handleChange = (e) => {
    setTextInput(e.target.value);
    props.onChange(textInput);
  };

  return (
    <div className={writeComment}>
      {props.isLoading && <Loading />}
      <div>
        <button>
          <b>B</b>
        </button>
      </div>
      <textarea
        ref={props.inputRef}
        disabled={props.isLoading || !isAuthenticated}
        value={textInput}
        onChange={handleChange}
        placeholder="Postează un comentariu..."
      />
    </div>
  );
}

export default Comment;

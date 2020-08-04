import React from "react";

import { writeComment } from "./Comment.module.scss";

function Comment(props) {
  return (
    <section className={writeComment}>
      <div>
        <button>
          <b>B</b>
        </button>
      </div>
      <textarea placeholder="Postează un comentariu..." />
    </section>
  );
}

export default Comment;

import React from "react";

import { newsBtn } from "./XBtn.module.scss";

function XBtn(props) {
  return (
    <button onClick={props.onClick} className={newsBtn}>
      &#10006;
    </button>
  );
}

export default XBtn;

import React from "react";
import PropTypes from "prop-types";

import { newsBtn } from "./XBtn.module.scss";

function XBtn(props) {
  return (
    <button onClick={props.onClick} className={newsBtn}>
      &#10006;
    </button>
  );
}

XBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default XBtn;

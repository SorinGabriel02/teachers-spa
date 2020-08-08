import React from "react";
import PropTypes from "prop-types";

import { spinner } from "./Loading.module.scss";

function Loading(props) {
  return <div style={props.styles} className={spinner}></div>;
}

Loading.propTypes = {
  styles: PropTypes.object,
};

export default Loading;

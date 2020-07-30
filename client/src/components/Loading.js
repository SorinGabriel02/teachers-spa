import React from "react";
import PropTypes from "prop-types";

import { spinner } from "./Loading.module.scss";

function Loading(props) {
  const styles = {
    width: props.size,
    height: props.size,
  };

  return <div style={styles} className={spinner}></div>;
}

Loading.defaultProps = { size: "45px" };

Loading.propTypes = {
  size: PropTypes.string,
};

export default Loading;

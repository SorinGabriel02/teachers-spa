import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import styles from "./Backdrop.module.scss";

function Backdrop(props) {
  return ReactDOM.createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={150}
      classNames={{
        enter: styles.backdropEnter,
        enterActive: styles.backdropEnterActive,
        exit: styles.backdropExit,
        exitActive: styles.backdropExitActive,
      }}
    >
      <div onClick={props.onClick} className={styles.backdrop}></div>
    </CSSTransition>,
    document.getElementById("backdrop")
  );
}

Backdrop.defaultProps = {
  show: true,
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Backdrop;

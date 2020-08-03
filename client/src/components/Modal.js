import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import styles from "./Modal.module.scss";

function Modal(props) {
  return ReactDOM.createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={200}
      classNames={{
        enter: styles.containerEnter,
        enterActive: styles.containerEnterActive,
        exit: styles.containerExit,
        exitActive: styles.containerExitActive,
      }}
    >
      <div className={`${styles.container} ${props.className}`}>
        {props.children}
      </div>
    </CSSTransition>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default Modal;

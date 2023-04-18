import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

function Modal(props) {
  return ReactDOM.createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={200}
      classNames={{
        enter: "containerEnter",
        enterActive: "containerEnterActive",
        exit: "containerExit",
        exitActive: "containerExitActive",
      }}
    >
      <div className={`${"container"} ${props.className}`}>
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

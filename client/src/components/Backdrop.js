import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

function Backdrop(props) {
  return ReactDOM.createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={150}
      classNames={{
        enter: "backdropEnter",
        enterActive: "backdropEnterActive",
        exit: "backdropExit",
        exitActive: "backdropExitActive",
      }}
    >
      <div onClick={props.onClick} className={"backdrop"}></div>
    </CSSTransition>,
    document.getElementById("backdrop")
  );
}

Backdrop.defaultProps = {
  show: true,
};

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default Backdrop;

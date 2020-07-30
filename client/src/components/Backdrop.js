import React, { useState } from "react";
import ReactDOM from "react-dom";

function Backdrop() {
  const [hide, setHide] = useState(false);
  const styles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "rgba(128, 128, 128, 0.6)",
    zIndex: 9,
  };

  const handleClick = () => {
    setHide(true);
  };

  return ReactDOM.createPortal(
    <div
      style={hide ? { display: "none" } : styles}
      onClick={handleClick}
    ></div>,
    document.getElementById("backdrop")
  );
}

export default Backdrop;

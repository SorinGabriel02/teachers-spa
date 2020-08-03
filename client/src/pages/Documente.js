import React, { useState } from "react";

import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";

import styles from "./Documente.module.scss";

function Documente() {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(false);

  return (
    <div style={{ position: "relative" }}>
      <Modal show={show} className={styles.modal}>
        <Backdrop show={show} onClick={handleClick} />
        <h1>Modalul online</h1>
        <button onClick={() => setShow(false)}>Make me disappear</button>
      </Modal>
      <h1 style={{ position: "absolute", top: "40%", left: "40%" }}>
        Documente COSP
      </h1>
      <button style={{ minWidth: "5vmax" }} onClick={() => setShow(true)}>
        Show Modal
      </button>
    </div>
  );
}

export default Documente;

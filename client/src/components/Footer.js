import React from "react";

import { mainFooter, content } from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={mainFooter}>
      <p className={content}>&copy; ProfiDeSprijin 2020</p>
    </footer>
  );
}

export default Footer;

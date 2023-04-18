import React from "react";

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="mainFooter">
      <p>&copy; Profesori de Sprijin {year}</p>
    </footer>
  );
}

export default Footer;

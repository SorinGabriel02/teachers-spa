import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/appContext";

import {
  mainHeader,
  logoLink,
  navBar,
  activeLink,
  hamburger,
  lineOne,
  lineTwo,
  lineThree,
  activeHamburger,
  activeNav,
} from "./Header.module.scss";
import logo from "../assets/logo.png";

function Header() {
  const { isAuthenticated, logout } = useContext(AppContext);
  const hamburgerRef = useRef(null);
  const navRef = useRef(null);
  const [active, setActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleClick = (e) => {
    console.log(e.target);
    setActive((prevActive) => !prevActive);
  };

  const handleLogout = () => {
    handleClick();
    setActive(false);
    logout();
  };

  useEffect(() => {
    if (active) {
      hamburgerRef.current.classList.add(activeHamburger);
      navRef.current.classList.add(activeNav);
    } else {
      hamburgerRef.current.classList.remove(activeHamburger);
      navRef.current.classList.remove(activeNav);
    }
  }, [active]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    if (windowWidth > 750) setActive(false);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  console.log(windowWidth, active);

  return (
    <header className={mainHeader}>
      <NavLink onClick={handleClick} className={logoLink} to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <div onClick={handleClick} ref={hamburgerRef} className={hamburger}>
        <div className={lineOne}></div>
        <div className={lineTwo}></div>
        <div className={lineThree}></div>
      </div>
      <nav ref={navRef} className={navBar}>
        <ul>
          <li>
            <NavLink
              onClick={handleClick}
              activeClassName={activeLink}
              to="/legislatie"
            >
              Legislație
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
              activeClassName={activeLink}
              to="/documente"
            >
              Documente COSP
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
              activeClassName={activeLink}
              to="/materiale"
            >
              Materiale Suport
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
              activeClassName={activeLink}
              to="/noutati"
            >
              Noutăți
            </NavLink>
          </li>
          {!isAuthenticated ? (
            <li>
              <NavLink
                onClick={handleClick}
                activeClassName={activeLink}
                to="/autentificare"
              >
                Autentificare
              </NavLink>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout}>Delogare</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

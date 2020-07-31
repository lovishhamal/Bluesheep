import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

import Sidebar from '../Sidemenu';
import Backdrop from '../Sidemenu/Backdrop';
import colors from '../../colors/colors';

export default function Navbar() {
  const [toggle, settoggle] = useState(false);

  let slide = 'sidebar-container';
  let backdrop = 'backdrop';

  if (toggle) {
    slide = 'sidebar-container open';
    backdrop = 'backdrop open';
  }

  return (
    <div className="navbar-container">
      <div></div>
      <div className="navbar-main ">
        <div>
          <Sidebar close={() => settoggle(!toggle)} slide={slide}></Sidebar>
          <Backdrop
            close={() => settoggle(!toggle)}
            className={backdrop}
          ></Backdrop>
        </div>
        <header>
          <div className="logo">
            <img src="/images/logo.png" className="logo-img"></img>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink
                  exact
                  to="/"
                  className="link "
                  activeClassName="active-nav"
                >
                  home
                </NavLink>
              </li>

              <li>
                <NavLink
                  exact
                  to="/rooms&pricing"
                  className="link"
                  activeClassName="active-nav"
                >
                  rooms & pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/culinary"
                  className="link"
                  activeClassName="active-nav"
                >
                  culinary
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/services"
                  className="link"
                  activeClassName="active-nav"
                >
                  our services
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/about"
                  className="link"
                  activeClassName="active-nav"
                >
                  about bluesheep
                </NavLink>
              </li>
            </ul>
            <span className="spacer"></span>
            <ul className="account">
              <li className="login">
                <i className="fas fa-lock"></i>
                <NavLink
                  to="/login"
                  className="link login-link"
                  style={{
                    color: colors.primaryColor,
                  }}
                >
                  log in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="link signup"
                  style={{
                    backgroundColor: colors.primaryColor,
                    color: colors.white,
                  }}
                >
                  sign up
                </NavLink>
              </li>
            </ul>
            <div className="bar-cont" onClick={() => settoggle(!toggle)}>
              <i className="fas fa-bars"></i>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}

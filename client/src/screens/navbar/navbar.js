import React, { useState } from 'react';
import './Navbar.css';
import { NavLink, Link, useHistory } from 'react-router-dom';

import Sidebar from '../side-menu';
import Backdrop from '../side-menu/Backdrop';
import colors from '../../colors/colors';
import { removeToken } from '../../utils';

export default function Navbar({ profile }) {
  const [toggle, settoggle] = useState(false);
  const [toggleAccount, settoggleaccount] = useState(false);
  let history = useHistory();

  let slide = 'sidebar-container';
  let backdrop = 'backdrop';

  if (toggle) {
    slide = 'sidebar-container open';
    backdrop = 'backdrop open';
  }

  const signout = () => {
    removeToken();
    settoggleaccount(!toggleAccount);
    history.push('/');
  };

  return (
    <div className="navbar-container">
      <div />
      <div className="navbar-main ">
        <div>
          <Sidebar
            close={() => settoggle(!toggle)}
            slide={slide}
            profile={profile}
          />
          <Backdrop close={() => settoggle(!toggle)} className={backdrop} />
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
            {profile ? (
              <div className="main-account relative pt-6 mr-20">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="user-circle w-8 h-8 right-10 static cursor-pointer"
                  style={{ color: '#168afd' }}
                  onClick={() => settoggleaccount(!toggleAccount)}
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                {toggleAccount && (
                  <div class="z-20 mt-2 py-2 absolute right-0 w-48 bg-white rounded-lg shadow-xl">
                    <span
                      class="block cursor-pointer px-4 py-2 text-gray-800 capitalize hover:bg-indigo-500 hover:text-white"
                      style={{ borderBottom: '1px solid #f2f2f2' }}
                    >
                      {profile?.firstname ?? profile.name} {profile.lastname}
                    </span>
                    <Link
                      to="/mybooking"
                      class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                    >
                      My Booking
                    </Link>
                    <Link
                      to="/myorder"
                      class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                    >
                      My Order
                    </Link>
                    <span
                      class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer"
                      onClick={() => signout()}
                    >
                      Sign out
                    </span>
                  </div>
                )}
              </div>
            ) : (
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
            )}
            <div className="bar-cont" onClick={() => settoggle(!toggle)}>
              <i className="fas fa-bars"></i>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}

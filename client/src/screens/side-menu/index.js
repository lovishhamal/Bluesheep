import React from 'react';
import './sidebar.css';
import { useHistory } from 'react-router-dom';
import { removeToken } from '../../utils';

export default function Index({ profile, close, slide }) {
  let history = useHistory();

  const signout = () => {
    removeToken();
    close();
    history.push('/');
  };

  return (
    <div>
      <div className={slide}>
        <div className="circle">
          <i
            className="fa fa-times-circle"
            aria-hidden="true"
            onClick={() => close()}
          ></i>
        </div>
        <div>
          <nav className="side-nav-main">
            <ul>
              <li>
                <a href="/" className="side-link">
                  home
                </a>
              </li>
              <li>
                <a href="/rooms&pricing" className="side-link">
                  rooms & pricing
                </a>
              </li>
              <li>
                <a href="/culinary" className="side-link">
                  culinary
                </a>
              </li>
              <li>
                <a href="/services" className="side-link">
                  our services
                </a>
              </li>
              <li>
                <a href="/about" className="side-link">
                  about bluesheep
                </a>
              </li>
              {profile ? (
                <>
                  <li>
                    <a href="/mybooking" className="side-link">
                      My Booking
                    </a>
                  </li>
                  <li className="side-link" onClick={() => signout()}>
                    Sign Out
                  </li>
                </>
              ) : (
                <>
                  <li className="">
                    <a href="/login" className="side-link">
                      login
                    </a>
                  </li>
                  <li>
                    <a href="/register" className="side-link ">
                      sign up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";
import useDocumentScrollThrottled from "./useDocumentScrollThrottled";
import "./globaly.scss";
import "./mobile-navy.scss";
import { BiHomeAlt } from "react-icons/bi";
import { BiPlanet } from "react-icons/bi";
import { BiRocket } from "react-icons/bi";

const Menu = () => {
  const navLinks = [];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const [shouldShowShadow, setShouldShowShadow] = useState(false);

  const MINIMUM_SCROLL = 100;
  const TIMEOUT_DELAY = 1;

  useDocumentScrollThrottled((callbackData) => {
    const { previousScrollTop, currentScrollTop } = callbackData;
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

    setShouldShowShadow(currentScrollTop > 10);

    setTimeout(() => {
      setShouldHideHeader(isScrolledDown && isMinimumScrolled);
    }, TIMEOUT_DELAY);
  });

  const shadowStyle = shouldShowShadow ? "shadow" : "";
  const hiddenStyle = shouldHideHeader ? "hidden" : "";
  return (
    <div className="menus">
      <ul className="navbar-nav flex-row mb-2 mb-lg-0">
        {/* {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className={`nav-link `} to={link.path}>
              <span className={`material-icons `}>{link.icon}</span>
            </Link>
          </li>
        ))} */}
        <li className="nav-item px-2">
          <Link to="/">
            <BiHomeAlt className="menus-icon" />
          </Link>
        </li>
        <li className="nav-item px-2">
          <Link to="/message">
            <BiRocket className="menus-icon" />
          </Link>
        </li>
        <li className="nav-item px-2">
          <Link to="/discover">
            <BiPlanet className="menus-icon" />
          </Link>
        </li>

        <li className="nav-item dropdown" style={{ opacity: "1" }}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span
              style={{
                color: notify.data.length > 0 ? "var(--c1)" : "",
              }}
              className={`material-icons `}
            >
              notifications
            </span>
            <span className="notify_length">{notify.data.length}</span>
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <NotifyModal />
          </div>
        </li>

        <li className="nav-item dropdown" style={{ opacity: "1" }}>
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                Profile
              </Link>
            </li>
            <li>
              <label
                htmlFor="theme"
                className="dropdown-item"
                onClick={() =>
                  dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
                }
              >
                {theme ? "Light mode" : "Dark mode"}
              </label>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <Link
                className="dropdown-item"
                to="/"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

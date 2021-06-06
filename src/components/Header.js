import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

import { default as AuthModal } from "./AuthModal";
import { clearUsernameToken } from "../api";

const Header = ({ currentUsername, setCurrentUsername }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authType, setAuthType] = useState("register");
  const [message, setMessage] = useState(null);

  const handleLogout = () => {
    clearUsernameToken();
    setCurrentUsername(null);
    setMessage("");
  };

  return (
    <header>
      <div id="menu">
        <NavLink to="/" id="home-tab">
          Home
        </NavLink>
        <NavLink to="/api/routines" id="routines-tab">
          Routines
        </NavLink>
        {currentUsername && (
          <NavLink to="/api/users/:username/routines" id="myroutines-tab">
            My Routines
          </NavLink>
        )}
        <NavLink to="/api/activities" id="activities-tab">
          Activities
        </NavLink>
      </div>
      <div id="header-buttons">
        {currentUsername ? (
          <a href="#" onClick={handleLogout}>
            Log out
          </a>
        ) : (
          <>
            <NavLink
              to="/api/users/register"
              onClick={() => {
                setModalIsOpen(true);
                setAuthType("register");
              }}
            >
              Sign up
            </NavLink>
            <NavLink
              to="/api/users/login"
              onClick={() => {
                setModalIsOpen(true);
                setAuthType("login");
              }}
            >
              Log in
            </NavLink>
          </>
        )}
      </div>
      <AuthModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        authType={authType}
        setCurrentUsername={setCurrentUsername}
        message={message}
        setMessage={setMessage}
      />
    </header>
  );
};

export default Header;

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
        <NavLink to="/routines" id="routines-tab">
          Routines
        </NavLink>
        {currentUsername && (
          <NavLink to={`/users/${currentUsername}/routines`} id="myroutines-tab">
            My Routines
          </NavLink>
        )}
        <NavLink to="/activities" id="activities-tab">
          Activities
        </NavLink>
      </div>
      <div id="header-buttons">
        {currentUsername ? (
          <NavLink to="/" onClick={handleLogout}>
            Log out
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/users/register"
              onClick={() => {
                setModalIsOpen(true);
                setAuthType("register");
              }}
            >
              Sign up
            </NavLink>
            <NavLink
              to="/users/login"
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

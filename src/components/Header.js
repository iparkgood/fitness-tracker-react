import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";

import "./Header.css";

Modal.setAppElement("#root");

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  return (
    <header>
      <div id="menu">
        <NavLink to="/" id="home-tab">
          Home
        </NavLink>
        <NavLink to="/routines" id="routines-tab">
          Routines
        </NavLink>
        <NavLink to="/routines" id="myroutines-tab">
          My Routines
        </NavLink>
        <NavLink to="/activities" id="activities-tab">
          Activities
        </NavLink>
      </div>
      <div id="header-buttons">
        <button onClick={() => setModalIsOpen(true)}>Sign up</button>/<button onClick={() => setModalIsOpen(true)}>Sign in</button>
        <button>Log out</button>
        <Modal isOpen={modalIsOpen} style={{
          overlay: {
            backdropFilter: "blur(6px)"
          },
          content: {
            top:"50%",
            left:"50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "480px",
            height: "300px"
          }
        }}>
          <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required/>
          </form>
          <button>Sign up</button>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
      </div>
    </header>
  );
};

export default Header;

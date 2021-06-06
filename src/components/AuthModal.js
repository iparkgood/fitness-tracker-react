import React, { useState } from "react";

import Modal from "react-modal";

import "./AuthModal.css";

import { registerUser, loginUser } from "../api";

Modal.setAppElement("#root");

const AuthModal = ({ modalIsOpen, setModalIsOpen, authType, setCurrentUsername, message, setMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");
  };

  const handleRegister = async () => {
    const result = await registerUser(username, password);
    setMessage(result);
    setCurrentUsername(result.username);
  };

  const handleLogin = async () => {
    const result = await loginUser(username, password);
    setMessage(result);
    setCurrentUsername(result.username);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={{
        overlay: {
          backdropFilter: "blur(6px)",
        },
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "480px",
        },
      }}
    >
      <div id="modal-header">
        {authType === "register" ? <h3>Sign up</h3> : <h3>Log in</h3>}
        <button onClick={() =>{ 
          setModalIsOpen(false)
          setMessage("");
          }}>&times;</button>
      </div>
      <form id="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div id="result-message">{message}</div>

        {authType === "register" ? (
          <button onClick={handleRegister}>Sign up</button>
        ) : (
          <button onClick={handleLogin}>Log in</button>
        )}
      </form>
    </Modal>
  );
};

export default AuthModal;

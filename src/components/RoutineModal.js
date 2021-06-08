import React, { useState } from "react";

import Modal from "react-modal";

import "./ModalForm.css";

import { createRoutine } from "../api";

Modal.setAppElement("#root");

const RoutineModal = ({
  modalIsOpen,
  setModalIsOpen,
  myRoutines,
  setMyRoutines,
  publicRoutines, setRoutines
}) => {
  const [routineName, setRoutineName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setRoutineName("");
    setGoal("");
    setIsPublic(false);
    setMessage("");
  };

  const handleCreateRoutine = async () => {
    const result = await createRoutine(routineName, goal, isPublic);

    if (result.error) {
      setMessage(result.error);
      return;
    }
    
    setMyRoutines([...myRoutines, result]);
    setRoutines([...publicRoutines, result])
    setModalIsOpen(false);
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
          height: "fit-content",
        },
      }}
    >
      <div id="modal-header">
        <h3>Create Routine</h3>
        <button
          onClick={() => {
            setModalIsOpen(false);
            setMessage("");
          }}
        >
          &times;
        </button>
      </div>
      <form id="modal-form" onSubmit={handleSubmit}>
        <label htmlFor="routineName">Routine Name</label>
        <input
          type="text"
          id="routineName"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          required
        />
        <label htmlFor="goal">Goal</label>
        <input
          type="text"
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        />
        <label htmlFor="isPublic">Public</label>
        <input
          type="checkbox"
          id="isPublic"
          defaultChecked={isPublic}
          onChange={(e) => setIsPublic(e.target.value)}
        ></input>
        <div id="result-message">{message}</div>
        <button onClick={handleCreateRoutine}>Submit</button>
      </form>
    </Modal>
  );
};

export default RoutineModal;

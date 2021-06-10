import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

import "./ModalForm.css";
import "./CreateButton.css";

import { patchRoutine } from "../api";

Modal.setAppElement("#root");

const UpdateRoutineModal = ({
  routineModalIsOpen,
  setRoutineModalIsOpen,
  publicRoutines,
  myRoutines,
  setRoutines,
  setMyRoutines,
}) => {
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [message, setMessage] = useState(null);

  const { routineId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
  };

  const handleUpdateRoutine = async () => {
    const result = await patchRoutine(routineId, routineName, routineGoal);

    if (result.error) {
      setMessage(result.error);
      return;
    }

    const updatedRoutine = myRoutines.find((mr) => mr.id === result.id);
    
    updatedRoutine.name = result.name;
    updatedRoutine.goal = result.goal;

    const updatedPublicRoutines = publicRoutines.find((pr) => pr.id === result.id)

    updatedPublicRoutines.name = result.name;
    updatedPublicRoutines.goal = result.goal;
    
    setRoutineName("");
    setRoutineGoal("");
    setRoutineModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={routineModalIsOpen}
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
        <h3>Update Routine</h3>
        <button
          onClick={() => {
            setRoutineModalIsOpen(false);
            setMessage("");
          }}
        >
          &times;
        </button>
      </div>
      <form id="modal-form" onSubmit={handleSubmit}>
        <label htmlFor="routine-name">Routine Name</label>
        <input
          type="text"
          id="routine-name"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
        />
        <label htmlFor="routine-goal">Goal</label>
        <input
          type="text"
          id="routine-goal"
          value={routineGoal}
          onChange={(e) => setRoutineGoal(e.target.value)}
        />
        <div id="result-message">{message}</div>
        <button onClick={handleUpdateRoutine}>Submit</button>
      </form>
    </Modal>
  );
};

export default UpdateRoutineModal;

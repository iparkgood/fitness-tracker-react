import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

import "./ModalForm.css";

import { patchRoutineActivity } from "../api";

Modal.setAppElement("#root");

const UpdateRoutineActModal = ({
  routineActModalIsOpen,
  setRoutineActModalIsOpen,
  myRoutines,
  publicRoutines,
}) => {
  const [duration, setDuration] = useState(0);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(null);

  const { routineActivityId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
  };

  const handleUpdateRoutineAct = async () => {
    const result = await patchRoutineActivity(
      routineActivityId,
      count,
      duration
    );
    console.log("can I update routine_activity?", result);
    if (result.error) {
      setMessage(result.error);
      return;
    }

    const updatedRoutine = myRoutines.find((mr) => mr.id === result.routineId);
    const updatedRoutineAct = updatedRoutine.activities.find(
      (a) => a.routineActivityId === result.id
    );

    updatedRoutineAct.duration = result.duration;
    updatedRoutineAct.count = result.count;

    const updatedPublicRoutines = publicRoutines.find(
      (pr) => pr.id === result.routineId
    );
    const updatedPublicRoutineAct = updatedPublicRoutines.activities.find(
      (a) => a.routineActivityId === result.id
    );

    updatedPublicRoutineAct.duration = result.duration;
    updatedPublicRoutineAct.count = result.count;

    setDuration(0);
    setCount(0);
    setRoutineActModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={routineActModalIsOpen}
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
        <h3>Update Routine Activity</h3>
        <button
          onClick={() => {
            setRoutineActModalIsOpen(false);
            setMessage("");
          }}
        >
          &times;
        </button>
      </div>
      <form id="modal-form" onSubmit={handleSubmit}>
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label htmlFor="count">Count</label>
        <input
          type="text"
          id="count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <div id="result-message">{message}</div>
        <button onClick={handleUpdateRoutineAct}>Submit</button>
      </form>
    </Modal>
  );
};

export default UpdateRoutineActModal;

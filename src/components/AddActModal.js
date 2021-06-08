import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

import "./ModalForm.css";
import "./CreateButton.css";

import { addActToRoutine } from "../api";

Modal.setAppElement("#root");

const ActivityModal = ({
  actModalIsOpen,
  setActModalIsOpen,
  allActivities,
  myRoutines,
  setMyRoutines,
  publicRoutines,
  setRoutines,
}) => {
  const [activity, setActivity] = useState(allActivities[0]);
  const [duration, setDuration] = useState(0);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(null);

  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
  };

  const handleAddActivity = async () => {
    const selectedActivity = allActivities.find((a) => a.name === activity);
   
    const result = await addActToRoutine(
      id,
      selectedActivity.id,
      count,
      duration
    );
  
    if (result.error) {
      setMessage(result.error);
      return;
    }

    //find routine using routine Id 
    const routineToAdd = myRoutines.filter((mr) => mr.id === result.routineId)
    //add activities to the routine 
    console.log(routineToAdd);
    routineToAdd[0].activities.push(result)

    setMyRoutines([...myRoutines, routineToAdd])
    setRoutines([...publicRoutines, routineToAdd])

    setActivity(allActivities[0]);
    setDuration(0);
    setCount(0);
    setActModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={actModalIsOpen}
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
        <h3>Add Activity</h3>
        <button
          onClick={() => {
            setActModalIsOpen(false);
            setMessage("");
          }}
        >
          &times;
        </button>
      </div>
      <form id="modal-form" onSubmit={handleSubmit}>
        <label htmlFor="activities">Select Activity</label>
        <select
          id="select-activity"
          name="activities"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          {allActivities.map(({ id, name }) => (
            <option key={id}>{name}</option>
          ))}
        </select>
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
        <button onClick={handleAddActivity}>Submit</button>
      </form>
    </Modal>
  );
};

export default ActivityModal;

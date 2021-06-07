import React, { useState } from "react";

import Modal from "react-modal";

import "./ModalForm.css";

import { createActivity } from "../api";

Modal.setAppElement("#root");

const ActivityModal = ({ modalIsOpen, setModalIsOpen, allActivities, setActivities }) => {
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setActivityName("");
    setDescription("");
    setMessage("");
  };

  const handleCreateActivity = async () => {
    const result = await createActivity(activityName, description);

    if (result.error) {
      setMessage(result.error);
      return;
    }

    setActivities([...allActivities, result]);
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
        <h3>Create Activity</h3>
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
        <label htmlFor="activityName">Activity Name</label>
        <input
          type="text"
          id="activityName"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          rows="5"
          cols="50"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div id="result-message">{message}</div>
        <button onClick={handleCreateActivity}>Submit</button>
      </form>
    </Modal>
  );
};

export default ActivityModal;

import React, { useState } from "react";

import { default as ActivityModal } from "./ActivityModal";

import "./Activities.css";

const Activities = ({ allActivities, currentUsername, setActivities }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div id="all-activities">
        {allActivities.map(({ id, name, description }) => (
          <div className="activity" key={id}>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
      {currentUsername && (
        <button
          id="activity-create-button"
          onClick={() => setModalIsOpen(true)}
        >
          +
        </button>
      )}
      <ActivityModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        allActivities={allActivities}
        setActivities={setActivities}
      />
    </>
  );
};

export default Activities;

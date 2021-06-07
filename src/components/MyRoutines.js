import React, { useState } from "react";

import "./Routines.css";
import "./CreateButton.css"

import { default as RoutineModal } from "./RoutineModal"

const MyRoutines = ({ myRoutines, setMyRoutines }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div id="all-routines">
        {myRoutines &&
          myRoutines.map(({ id, name, goal, activities }) => (
            <div key={id} className="routine">
              <h3>{name}</h3>
              <p>My Goal: {goal}</p>
              {activities &&
                activities.map(({ id, name, description, duration, count }) => (
                  <div className="routine-activity" key={id}>
                    <h4>{name}</h4>
                    <ul>
                      {description && <li>{description}</li>}
                      {duration && <li>Duration: {duration}</li>}
                      {count && <li>Count: {count}</li>}
                    </ul>
                  </div>
                ))}
            </div>
          ))}
      </div>
      <button className="create-button" onClick={() => setModalIsOpen(true)}>
        +
      </button>
      <RoutineModal
        {...{ modalIsOpen, setModalIsOpen, myRoutines, setMyRoutines }}
      />
    </>
  );
};

export default MyRoutines;

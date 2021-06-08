import React, { useState } from "react";

import "./Routines.css";
import "./CreateButton.css";

import { default as RoutineModal } from "./RoutineModal";

import { deleteRoutine } from "../api";

const MyRoutines = ({ myRoutines, setMyRoutines, currentUsername }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDeleteRoutine = async (routineId) => {
    const result = await deleteRoutine(routineId);

    const updatedRoutines = myRoutines.filter((r) => r.id !== routineId);

    setMyRoutines(updatedRoutines);
  };

  return (
    <>
        <div id="all-routines">
          {myRoutines &&
            myRoutines.map(({ id, name, goal, activities }) => (
              <div key={id} className="routine">
                <div className="routine-header">
                  <h3>{name}</h3>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteRoutine(id)}
                  >
                    &times;
                  </button>
                </div>

                <p>My Goal: {goal}</p>
                {activities &&
                  activities.map(
                    ({ id, name, description, duration, count }) => (
                      <div className="routine-activity" key={id}>
                        <h4>{name}</h4>
                        <ul>
                          {description && <li>{description}</li>}
                          {duration && <li>Duration: {duration}</li>}
                          {count && <li>Count: {count}</li>}
                        </ul>
                      </div>
                    )
                  )}
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

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import "./Routines.css";
import "./CreateButton.css";

import { default as RoutineModal } from "./RoutineModal";
import { default as AddActModal } from "./AddActModal";

import { deleteRoutine } from "../api";

const MyRoutines = ({
  myRoutines,
  setMyRoutines,
  publicRoutines,
  setRoutines,
  allActivities,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [actModalIsOpen, setActModalIsOpen] = useState(false);

  const handleDeleteRoutine = async (routineId) => {
    const result = await deleteRoutine(routineId);

    const updatedRoutines = myRoutines.filter((mr) => mr.id !== result.id);
    const updatedPublicRoutines = publicRoutines.filter(
      (pr) => pr.id !== result.id
    );

    setMyRoutines(updatedRoutines);
    setRoutines(updatedPublicRoutines);
  };

  return (
    <Router>
      <div id="all-routines">
        {myRoutines &&
          myRoutines.map(({ id, name, goal, activities }) => (
            <div key={id} className="routine">
              <h3>{name}</h3>
              <button
                className="delete-button"
                onClick={() => handleDeleteRoutine(id)}
              >
                &times;
              </button>
              <p>My Goal: {goal}</p>

              <Link
                to={`/routines/${id}/activities`}
                onClick={() => setActModalIsOpen(true)}
              >
                +<span>Activity</span>
              </Link>

              {activities &&
                activities.map(({ id, name, description, duration, count }) => (
                  <div className="routine-activity" key={id}>
                    <h4>{name}</h4>
                    <ul>
                      {description && <li>{description}</li>}
                      {duration !== 0 && <li>Duration: {duration}</li>}
                      {count !== 0 && <li>Count: {count}</li>}
                    </ul>
                  </div>
                ))}
            </div>
          ))}
        <button className="create-button" onClick={() => setModalIsOpen(true)}>
          +
        </button>
      </div>

      <RoutineModal
        {...{
          modalIsOpen,
          setModalIsOpen,
          myRoutines,
          setMyRoutines,
          publicRoutines,
          setRoutines,
        }}
      />

      <Route path="/routines/:id/activities">
        <AddActModal
          {...{
            actModalIsOpen,
            setActModalIsOpen,
            allActivities,
            myRoutines,
            setMyRoutines,
            publicRoutines,
            setRoutines,
          }}
        />
      </Route>
    </Router>
  );
};

export default MyRoutines;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Routines.css";
import "./CreateButton.css";

import { default as RoutineModal } from "./RoutineModal";
import { default as AddActModal } from "./AddActModal";
import { default as UpdateRoutineModal } from "./UpdateRoutineModal";
import { default as UpdateRoutineActModal } from "./UpdateRoutineActModal";

import { deleteRoutine, deleteRoutineActivity } from "../api";

const MyRoutines = ({
  myRoutines,
  setMyRoutines,
  publicRoutines,
  setRoutines,
  allActivities,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [actModalIsOpen, setActModalIsOpen] = useState(false);
  const [routineModalIsOpen, setRoutineModalIsOpen] = useState(false);
  const [routineActModalIsOpen, setRoutineActModalIsOpen] = useState(false);

  const handleDeleteRoutine = async (routineId) => {
    const result = await deleteRoutine(routineId);

    const updatedRoutines = myRoutines.filter((mr) => mr.id !== result.id);
    const updatedPublicRoutines = publicRoutines.filter(
      (pr) => pr.id !== result.id
    );

    setMyRoutines(updatedRoutines);
    setRoutines(updatedPublicRoutines);
  };

  const handleDeleteActivity = async (routineActivityId) => {
    const result = await deleteRoutineActivity(routineActivityId);

    const updatedRoutine = myRoutines.find((mr) => mr.id === result.routineId);
    const activitiesWithoutDeletedAct = updatedRoutine.activities.filter(
      (a) => a.routineActivityId !== result.id
    );

    updatedRoutine.activities = activitiesWithoutDeletedAct;

    const updatedPublicRoutines = publicRoutines.filter(
      (pr) => pr.id !== result.routineId
    );
    updatedPublicRoutines.activities = activitiesWithoutDeletedAct;

    // setMyRoutines([...myRoutines, updatedRoutine]);
    // setRoutines([...publicRoutines]);
  };

  return (
    <Router>
      <div id="all-routines">
        {myRoutines &&
          myRoutines.map(({ id: routineId, name, goal, activities }) => (
            <div key={routineId} className="routine">
              <button
                className="delete-button"
                onClick={() => handleDeleteRoutine(routineId)}
              >
                &times;
              </button>
              <Link
                to={`/routines/${routineId}`}
                className="update-routine-button"
                onClick={() => setRoutineModalIsOpen(true)}
              >
                <h3>{name}</h3>
                <p>My Goal: {goal}</p>
              </Link>

              <Link
                to={`/routines/${routineId}/activities`}
                onClick={() => setActModalIsOpen(true)}
                className="add-act-button"
              >
                +<span>Activity</span>
              </Link>

              {activities &&
                activities.map(
                  (
                    {
                      id,
                      name,
                      description,
                      duration,
                      count,
                      routineActivityId,
                    },
                    idx
                  ) => (
                    <div className="routine-activity" key={id}>
                      <button
                        className="delete-activity-button"
                        onClick={() => handleDeleteActivity(routineActivityId)}
                      >
                        &times;
                      </button>
                      <h4>{name}</h4>
                      <ul>
                        {description && (
                          <li key={`${description}-${idx + 1}`}>
                            {description}
                          </li>
                        )}
                        <Link
                          to={`/routine_activities/${routineActivityId}`}
                          className="update-ra-button"
                          onClick={() => setRoutineActModalIsOpen(true)}
                        >
                          {duration !== 0 && (
                            <li key={`${duration}-${idx + 1}`}>
                              Duration: {duration}
                            </li>
                          )}
                          {count !== 0 && (
                            <li key={`${count}-${idx + 1}`}>Count: {count}</li>
                          )}
                        </Link>
                      </ul>
                    </div>
                  )
                )}
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

      <Route path="/routines/:routineId">
        <UpdateRoutineModal
          {...{
            routineModalIsOpen,
            setRoutineModalIsOpen,
            publicRoutines,
            myRoutines,
          }}
        />
      </Route>
      <Route path="/routines/:routineId/activities">
        <AddActModal
          {...{
            actModalIsOpen,
            setActModalIsOpen,
            allActivities,
            myRoutines,
            publicRoutines,
          }}
        />
      </Route>
      <Route path="/routine_activities/:routineActivityId">
        <UpdateRoutineActModal
          {...{
            routineActModalIsOpen,
            setRoutineActModalIsOpen,
            myRoutines,
            publicRoutines,
          }}
        />
      </Route>
    </Router>
  );
};

export default MyRoutines;

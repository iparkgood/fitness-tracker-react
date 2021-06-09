import React from "react";

import "./Routines.css";

const Routines = ({ publicRoutines }) => {
  return (
    <>
      <div id="all-routines">
        {publicRoutines.map(({ id, name, goal, creatorName, activities }) => (
          <div key={id} className="routine">
            <h3>{name}</h3>
            <p>by <span className="creator-name">{creatorName}</span></p>
            <p>My Goal: {goal}</p>
            {activities && (
              activities.map(({ id, name, description, duration, count }) => (
                <div className="routine-activity" key={id}>
                  <h4>{name}</h4>
                  <ul>
                  {description && <li>{description}</li>}
                  {duration !== 0 && <li>Duration: {duration}</li>}
                  {count !== 0 && <li>Count: {count}</li>}
                  </ul>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Routines;

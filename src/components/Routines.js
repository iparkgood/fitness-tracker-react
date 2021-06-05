import React from "react";

import "./Routines.css";

const Routines = ({ publicRoutines }) => {
  return (
    <div id="all-routines">
      {publicRoutines.map(({ id, name, goal, creatorName, activities }) => (
        <div key={id} className="routine">
          <h3>{name}</h3>
          <p>{goal}</p>
          <p id="creator-name">
            by {creatorName}
          </p>
          {activities !== []
            ? activities.map(({ id, name, description, duration, count }) => (
                <div key={id}>
                  <p>{name}</p>
                  <p>{description}</p>
                  <p>duration: {duration}</p>
                  <p>count: {count}</p>
                </div>
              ))
            : <p>"No Activity!"</p>}
        </div>
      ))}
    </div>
  );
};

export default Routines;

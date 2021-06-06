import React from "react";

// import "./Routines.css";

const Activities = ({ allActivities }) => {
  return (
    <div id="all-activities">
      {
          allActivities.map(({id, name, description}) => (
            <div key={id}>
            <h3>{name}</h3>
            <p>{description}</p>
            </div>
          ))
      }
    </div>
  );
};

export default Activities;

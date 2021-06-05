import React from "react";

// import "./Routines.css";

const Activities = ({ allActivities }) => {
  return (
    <div id="all-activities">
      {
          allActivities.map(({name, description}) => (
            <>
            <h3>{name}</h3>
            <p>{description}</p>
            </>
          ))
      }
    </div>
  );
};

export default Activities;

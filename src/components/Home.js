import React from "react";

const Home = ({ currentUsername }) => {
  return (
    <>
      {currentUsername ? (
        <h2>Welcome, {currentUsername}!</h2>
      ) : (
        <h2>Please sign up or sign in!</h2>
      )}
    </>
  );
};

export default Home;

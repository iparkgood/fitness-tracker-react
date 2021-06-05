import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Activities, Header, Routines } from "./components";
import { getRoutines, getActivities } from "./api";

import "./app.css";

const App = () => {
  const [publicRoutines, setRoutines] = useState([]);
  const [allActivities, setActivities] = useState([]);

  useEffect(() => {
    getRoutines()
      .then((r) => {
        setRoutines(r);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getActivities()
      .then((a) => {
        setActivities(a);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Router>
      <div id="app">
        <Header />
        <main>
          <Route exact path="/">
            <h2>Please sign up or sign in!</h2>
          </Route>
          <Route path="/routines">
            <Routines publicRoutines={publicRoutines} />
          </Route>
          <Route path="/activities">
            <Activities allActivities={allActivities}/>
          </Route>
        </main>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

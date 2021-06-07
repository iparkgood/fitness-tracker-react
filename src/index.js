import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Activities, Header, Routines, Home } from "./components";
import { getRoutines, getActivities, getUsername } from "./api";

import "./index.css";

const App = () => {
  const [publicRoutines, setRoutines] = useState([]);
  const [allActivities, setActivities] = useState([]);
  const [currentUsername, setCurrentUsername] = useState(getUsername());

  useEffect(() => {
    setCurrentUsername(getUsername());
  }, [currentUsername]);

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
        <Header
          currentUsername={currentUsername}
          setCurrentUsername={setCurrentUsername}
        />
        <main>
          <Switch>
            <Route exact path="/">
              <Home currentUsername={currentUsername} />
            </Route>
            <Route path="/api/routines">
              <Routines publicRoutines={publicRoutines} />
            </Route>
            <Route path="/api/users/:username/routines"></Route>
            <Route path="/api/activities">
              <Activities
                allActivities={allActivities}
                setActivities={setActivities}
                currentUsername={currentUsername}
              />
            </Route>
            <Route path="/api/users/register">
              <Redirect to="/" />
            </Route>
            <Route path="/api/users/login">
              <Redirect to="/" />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

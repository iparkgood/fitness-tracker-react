import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Activities, Header, Routines, Home, MyRoutines } from "./components";
import { getRoutines, getActivities, getUsername, getMyRoutines } from "./api";

import "./index.css";

const App = () => {
  const [publicRoutines, setRoutines] = useState([]);
  const [allActivities, setActivities] = useState([]);
  const [currentUsername, setCurrentUsername] = useState(getUsername());
  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(() => {
    setCurrentUsername(getUsername());
  }, []);

  useEffect(() => {
    getRoutines()
      .then((r) => {
        setRoutines(r);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getMyRoutines()
      .then((mr) => {
        setMyRoutines(mr);
      })
      .catch((error) => console.error(error));
  }, [currentUsername]);

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
            <Route path="/routines">
              <Routines publicRoutines={publicRoutines} />
            </Route>
            <Route path="/users/:username/routines">
              <MyRoutines {...{ myRoutines, setMyRoutines, publicRoutines, setRoutines, allActivities }} />
            </Route>
            <Route path="/activities">
              <Activities
                {...{ allActivities, setActivities, currentUsername }}
              />
            </Route>
            <Route path="/users/register">
              <Redirect to="/" />
            </Route>
            <Route path="/users/login">
              <Redirect to="/" />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

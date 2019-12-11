import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/index";
import Login from "./Pages/Login/index";
import Signup from "./Pages/Signup/index";

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;


import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./pages/login.page";
import SignUp from "./pages/signup.page";
import Home from "./pages/home.page";

import GameOne from "./pages/Game.page"
import Welcome from "./pages/Welcome.page"
import Form from "../src/pages/Form.page"
import results from "./pages/results.page";
import Instructions from "./pages/Instructions.page";
import Sleep from "./pages/sleep.page";
import Hunger from "./pages/hunger.page";
import Mood from "./pages/mood.page";
import Exercise from "./pages/exercise.page";




function App() {
  return (
    <Router>
      <div className="App">
        <nav
          id="nav2"
          className="navbar-dark navbar-success bg-transparent navbar-expand navigation-bar is-visible"
          data-nav-status="toggle"
        >
          <button
            id="navbarButton"
            className="navbar-toggler mr-auto custom-toggler"
            style={{ margin: "20px 0 0 20px" }}
            type="button"
            data-toggle="collapse"
            data-target="#nav3"
          >
            <div className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse collapse" id="nav3">
            <ul className="nav navbar-nav.navbar-right ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/Game" component={GameOne} />
              <Route path="/Welcome" component={Welcome} />
              <Route path="/Form" component={Form} />
              <Route path="/Sleep" component={Sleep} />
              <Route path="/Hunger" component={Hunger} />
              <Route path="/Mood" component={Mood} />
              <Route path="/Exercise" component={Exercise} />
              <Route path="/results" component={results} />
              <Route path="/Instructions" component={Instructions} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { Component } from "react";
import logo from "./Assets/Icons/logo.svg";
import Layout from "./HOC/Layout/Layout";
import Aux from "./HOC/Aux/aux";
import { css } from "emotion";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Calender from "./Containers/Calender/Calender";
import Profile from "./Containers/Profile/Profile";
import HolidayRequest from "./Containers/Requests/HolidayRequest";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExclamationTriangle,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import "react-dates/lib/css/_datepicker.css";

library.add(faExclamationTriangle, faArrowLeft, faArrowRight);

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + "/"}
          component={Dashboard}
        />
        <Route
          path={process.env.PUBLIC_URL + "/calender"}
          component={Calender}
        />
        <Route path={process.env.PUBLIC_URL + "/profile"} component={Profile} />
        <Route
          path={process.env.PUBLIC_URL + "/requestaholiday"}
          component={HolidayRequest}
        />
      </Switch>
    );
    return (
      <Aux
        className="App"
        style={{ border: "2px solid blue", fontFamily: "Cairo-Regular" }}>
        <Layout>{routes}</Layout>
      </Aux>
    );
  }
}

export default App;

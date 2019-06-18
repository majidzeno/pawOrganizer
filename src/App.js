import React, { Component } from "react";
import logo from "./Assets/Icons/logo.svg";
import Layout from "./HOC/Layout/Layout";
import Aux from "./HOC/Aux/aux";
import { css } from "emotion";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Calender from "./Containers/Calender/Calender";
import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Auth/Logout/Logout";
import Profile from "./Containers/Profile/Profile";
import HolidayRequest from "./Containers/Requests/HolidayRequest";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExclamationTriangle,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import "react-dates/lib/css/_datepicker.css";
import { connect } from "react-redux";

library.add(faExclamationTriangle, faArrowLeft, faArrowRight);

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path={process.env.PUBLIC_URL + "/auth"} component={Auth} />
        <Redirect to={process.env.PUBLIC_URL + "/auth"} />
      </Switch>
    );
    if (this.props.isLoggedIn) {
      routes = (
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
          <Route path={process.env.PUBLIC_URL + "/logout"} component={Logout} />
          <Route
            path={process.env.PUBLIC_URL + "/profile"}
            component={Profile}
          />
          <Route
            path={process.env.PUBLIC_URL + "/requestaholiday"}
            component={HolidayRequest}
          />
          <Redirect to={process.env.PUBLIC_URL + "/"} />
        </Switch>
      );
    }
    return (
      <Aux
        className="App"
        style={{ border: "2px solid blue", fontFamily: "Cairo-Regular" }}>
        <Layout>{routes}</Layout>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.authReducer.idToken
  };
};

export default connect(
  mapStateToProps,
  null
)(App);

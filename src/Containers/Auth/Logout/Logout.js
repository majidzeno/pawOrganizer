import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../../Store/Actions/ActionCreators/index";
class Logout extends Component {
  componentDidMount() {
    this.props.logoutHandler();
  }
  render() {
    return (
      <div>
        <Redirect to={process.env.PUBLIC_URL + "/auth"} />
      </div>
    );
  }
}
const mapDispatchToProps = dispacth => {
  return {
    logoutHandler: () => dispacth(actionCreators.authLogout())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Logout);

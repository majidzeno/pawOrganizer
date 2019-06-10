import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/Actions/ActionCreators/index";
import Button, { Success, Watchout } from "../../Components/UI/Button/Button";
import DatePicker from "../../Components/UI/DatePick/DatePick";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
// library.add(faExclamationTriangle);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faStroopwafel
} from "@fortawesome/free-solid-svg-icons";

class HolidayRequest extends Component {
  state = {
    date1: null,
    date2: null,
    days: 0,
    requestAvailability: true,
    errorMessage: null
  };
  componentDidMount() {
    return console.log(this.props.noOfholidaysAv);
  }

  pickDate = (event, date) => {
    if (date === "date1") {
      this.setState({ ...this.state, date1: event.target.value }, () => {
        this.calcDays();
      });
    } else {
      this.setState({ ...this.state, date2: event.target.value }, () => {
        this.calcDays();
      });
    }
  };
  calcDays = () => {
    let diffDays = null,
      available = true,
      errorMsg = null;
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(this.state.date1);
    var secondDate = new Date(this.state.date2);
    if (firstDate.getTime() - secondDate.getTime() < 0) {
      diffDays = Math.round(
        Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
      );
    } else {
      if (this.state.date2) {
        // diffDays =
        //   "You cant choose a day back , please choose a day after the first date ";

        errorMsg =
          "You cant choose a day back , please choose a day after the first date ";

        available = false;
      } else {
        // diffDays = null;
        // this.setState({ ...this.state, requestAvailability: true });
      }
    }
    if (diffDays > this.props.noOfholidaysAv) {
      // this.setState({ requestAvailability: false });
      available = false;
      errorMsg = `You can't request more than ${
        this.props.noOfholidaysAv
      } Days`;
    } else {
      // this.setState({ requestAvailability: true });
      // available = false;
    }
    this.setState({
      days: diffDays,
      requestAvailability: available,
      errorMessage: errorMsg
    });
  };
  holidayRequestHandler = e => {
    e.preventDefault();
    let obj = {
      ...this.state
    };
    this.props.requestHolidayHandler(obj);
  };

  render() {
    let btnClass = Success,
      btnSign = null,
      btnText1 = "Submit",
      btnText2 = null;
    if (!this.state.requestAvailability) {
      btnClass = Watchout;
      btnText1 = "Watch";
      btnText2 = "Out!";
      btnSign = <FontAwesomeIcon icon="exclamation-triangle" />;
    }
    // let days = this.state.days;
    return (
      <div>
        <h1 style={{ color: "green" }}>HolidayRequest</h1>
        <h2>Holidays</h2>
        <div>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ width: "100px", display: "inline-block", margin: "0" }}>
              Taken
            </p>
            <p style={{ width: "20px", display: "inline-block", margin: "0" }}>
              :
            </p>
            {this.props.noOfholidaysTaken}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ width: "100px", display: "inline-block", margin: "0" }}>
              Remains
            </p>
            <p style={{ width: "20px", display: "inline-block", margin: "0" }}>
              :
            </p>
            {this.props.noOfholidaysAv}
          </div>
        </div>
        <form action="" onSubmit={this.holidayRequestHandler}>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ width: "100px", display: "inline-block", margin: "0" }}>
              From
            </p>
            <p style={{ width: "20px", display: "inline-block", margin: "0" }}>
              :
            </p>
            <DatePicker changed={event => this.pickDate(event, "date1")} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ width: "100px", display: "inline-block", margin: "0" }}>
              To
            </p>
            <p style={{ width: "20px", display: "inline-block", margin: "0" }}>
              :
            </p>
            <DatePicker changed={event => this.pickDate(event, "date2")} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ width: "100px", display: "inline-block", margin: "0" }}>
              Days
            </p>
            <p style={{ width: "20px", display: "inline-block", margin: "0" }}>
              :
            </p>
            {this.state.days}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end"
            }}>
            <p style={{ color: "red", display: "inline-block", margin: "0" }}>
              {this.state.errorMessage}
            </p>
            <Button
              disabled={!this.state.requestAvailability}
              buttonClass={btnClass}>
              {btnSign}
              <span style={{ marginRight: "3px" }}>{btnText1}</span>
              <strong>{btnText2}</strong>
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    noOfholidaysAv: state.holidays,
    noOfholidaysTaken: state.taken
  };
};
const mapDispatchToProps = dispatch => {
  return {
    requestHolidayHandler: obj => dispatch(actionCreators.requestHoliday(obj))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HolidayRequest);

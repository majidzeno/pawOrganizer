import React, { Component } from "react";
import "./Calender.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/Actions/ActionCreators/index";
const allMonthsArr = moment.months(),
  constantMonth = moment().month(),
  constantYear = moment().year();
let monthDaysArr = [],
  eventsArr = [];

class Calendar extends Component {
  state = {
    currentYear: moment().year(),
    currentMonth: allMonthsArr[moment().month()],
    currentMonthIndex: moment().month(),
    selectedDate: null,
    numberofdaysofthismonth: null,
    momentObj: moment(),
    today: moment().date(),
    eventsArray: []
  };

  componentDidMount() {
    this.props.loadEvents();
    let currentMonth = allMonthsArr[moment().month()];
    let currentMonthIndex = moment().month();
    let currentYear = this.state.momentObj.year();
    this.daysOfThisMonth();
    let eventsKeys = null;
    if (this.props.userEvents) {
      eventsKeys = Object.keys(this.props.userEvents);
      eventsKeys.map(key =>
        eventsArr.push([
          this.props.userEvents[key].from,
          this.props.userEvents[key].days
        ])
      );
      console.log("eventsKeys =" + eventsKeys);
      // this.setState({
      //   ...this.state,
      //   eventsArray: eventsArr
      // });
      // console.log("ev =" + eventsArr);
    }
    return this.setState({
      currentMonth: currentMonth,
      currentMonthIndex: currentMonthIndex,
      currentYear: currentYear
    });
  }

  componentWillUpdate(prevProps, prevState) {
    return this.daysOfThisMonth();
  }

  daysInMonth = () => {
    return this.state.momentObj.daysInMonth(); //number of days in this month
  };
  year = () => {
    return this.state.momentObj.format("Y"); // 2019
  };
  currentDay = () => {
    return this.state.momentObj.format("D"); // 9
  };
  firstDayOfMonth = () => {
    let momentObj = this.state.momentObj;
    let firstDay = moment(momentObj)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.momentObj.format("MMMM"); // June
  };

  nextMonth = () => {
    // Need Conditionals
    let currentMonthIndex = this.state.currentMonthIndex + 1;

    if (currentMonthIndex > allMonthsArr.length - 1) {
      currentMonthIndex = 0;
    }
    let currentMonth = allMonthsArr[currentMonthIndex];
    return this.setState({
      currentMonth: currentMonth,
      currentMonthIndex: currentMonthIndex,
      momentObj: this.state.momentObj.add(1, "M"),
      currentYear: this.year()
    });
  };

  prevMonth = () => {
    let currentMonthIndex = this.state.currentMonthIndex - 1;
    if (currentMonthIndex < 0) {
      currentMonthIndex = allMonthsArr.length - 1;
    }
    let currentMonth = allMonthsArr[currentMonthIndex];
    return this.setState({
      currentMonth: currentMonth,
      currentMonthIndex: currentMonthIndex,
      momentObj: this.state.momentObj.subtract(1, "M"),
      currentYear: this.year()
    });
  };
  // eventsArr = [{}] // events fetched from server
  dayGenerator = (newClasses, i) => {
    return (
      <td className={newClasses} key={i}>
        {i}
      </td>
    );
  };

  daysOfThisMonth = () => {
    let numberOfDaysInThisMonth = this.daysInMonth(),
      blankCells = [];
    monthDaysArr = [];
    // console.log(
    //   "this.state.currentMonthIndex = " + this.state.currentMonthIndex
    // );
    // console.log("this.state.momentObj = " + this.state.momentObj.month());
    // Push Normal Days and Today
    // eventsArr.map(d => console.log("d is " + d));
    // console.log(eventsArr);

    for (let i = 1; i <= numberOfDaysInThisMonth; i++) {
      if (
        i === this.state.today &&
        constantMonth === this.state.momentObj.month() &&
        constantYear === this.state.momentObj.year()
      ) {
        monthDaysArr.push(this.dayGenerator("dayInMonth today", i));
      } else {
        monthDaysArr.push(this.dayGenerator("dayInMonth", i));
      }
    }
    // Push Blank Days
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blankCells.push(
        <td className="dayInMonth empty" key={i * 200}>
          {""}
        </td>
      );
    }
    monthDaysArr = [...blankCells, ...monthDaysArr];
  };

  splitDaysIntoWeeks = () => {
    var chunk_size = 7;
    var weeks = monthDaysArr
      .map(function(e, i) {
        return i % chunk_size === 0
          ? monthDaysArr.slice(i, i + chunk_size)
          : null;
      })
      .filter(function(e) {
        return e;
      });
    return weeks;
  };

  renderDays = () => {
    let weeks = this.splitDaysIntoWeeks();
    let totalWeeks = [];
    weeks.map((row, i) => {
      totalWeeks.push(<tr key={1 / (i + 1)}>{row}</tr>);
    });
    return totalWeeks.map(day => {
      return day;
    });
  };

  // uselessfunction//cal = () => {
  //   return moment().calendar();
  // };
  render() {
    const weekdayShortNames = moment.weekdaysShort();

    return (
      <div>
        <div className="monthNav">
          <div className="monthNav__iconPrev" onClick={this.prevMonth}>
            <FontAwesomeIcon icon="arrow-left" />
          </div>
          <div className="monthNav__currentMonth">
            <span> {this.state.currentMonth}</span>
            <span>{this.state.currentYear}</span>
          </div>
          <div className="monthNav__iconNext" onClick={this.nextMonth}>
            <FontAwesomeIcon icon="arrow-right" />
          </div>
        </div>
        <table className="days">
          <thead>
            <tr className="daysHeader">
              {weekdayShortNames.map(day => {
                return <th key={day}>{day}</th>;
              })}
            </tr>
          </thead>
          <tbody className="daysBody">{this.renderDays()}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userEvents: state.eventsReducer.events
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadEvents: () => {
      dispatch(actionCreators.loadEvents());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

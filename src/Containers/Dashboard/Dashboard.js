import React, { Component } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import "./Dashboard.css";

const data = [1, 2, 3, 4, 1, 2, 3, 4];
class Dashboard extends Component {
  render() {
    const height = 400,
      width = 400;
    let pie = d3.pie()(data),
      svgDrawing = (
        <svg height={height} width={width}>
          <g transform={`translate(${width / 2},{$height/2})`}>
            <Slice pie={pie} />
          </g>
        </svg>
      );
      // If the user just signed in the welcome message will show , but if he navigate from another route it will disappear 
    return (
      <div>
        {this.props.username ? (
          <h1>
            Welcome ,
            <strong className="username">{this.props.username}</strong>
          </h1>
        ) : null}

        {svgDrawing}
      </div>
    );
  }
}
const Slice = props => {
  let { pie } = props;
  let arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(100);
  let interpolate = d3.interpolateRgb("#eeaf79", "#bc3358");
  return pie.map((slice, index) => {
    let sliceColor = interpolate(index / (pie.length - 1));
    return <path d={arc(slice)} fill={sliceColor} />;
  });
};
const mapStateToProps = state => {
  return {
    username: state.authReducer.username
  };
};
export default connect(
  mapStateToProps,
  null
)(Dashboard);

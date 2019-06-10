import React, { Component } from "react";
import * as d3 from "d3";
// class Dashboard extends Component {

//   render() {
//     return (
//       <div>
//         <h1 style={{ color: "red" }}>Dashboard</h1>
//       </div>
//     );
//   }
// }

const data = [1, 2, 3, 4, 1,2,3,4];
const Dashboard = () => {
  const height = 400;
  const width = 400;
  let pie = d3.pie()(data);
  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2},{$height/2})`}>
        <Slice pie={pie} />
      </g>
    </svg>
  );
};
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

export default Dashboard;

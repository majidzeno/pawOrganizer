import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = props => {
  return (
    <div>
      <NavigationItem link="/" key="Dashboard">
        Dashboard
      </NavigationItem>
      <NavigationItem link="/calender" key="Calender">
        Calender
      </NavigationItem>
      <NavigationItem link="/requestaholiday" key="RequestAHoliday">
        Request A Holiday
      </NavigationItem>
      <NavigationItem link="/profile" key="Profile">
        Profile
      </NavigationItem>
    </div>
  );
};

export default navigationItems;

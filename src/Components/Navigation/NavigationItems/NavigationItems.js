import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = props => {
  return (
    <div>
      {console.log("props.isLoggedIn", props.isLoggedIn)}
      {props.isLoggedIn ? (
        [
          <NavigationItem link={process.env.PUBLIC_URL + "/"} key="Dashboard">
            Dashboard
          </NavigationItem>,
          <NavigationItem
            link={process.env.PUBLIC_URL + "/calender"}
            key="Calender">
            Calender
          </NavigationItem>,
          <NavigationItem
            link={process.env.PUBLIC_URL + "/requestaholiday"}
            key="RequestAHoliday">
            Request A Holiday
          </NavigationItem>,
          <NavigationItem
            link={process.env.PUBLIC_URL + "/profile"}
            key="Profile">
            Profile
          </NavigationItem>,
          <NavigationItem
            link={process.env.PUBLIC_URL + "/logout"}
            key="logout">
            Logout
          </NavigationItem>
        ]
      ) : (
        <NavigationItem link={process.env.PUBLIC_URL + "/auth"} key="auth">
          SignIn/SignUp
        </NavigationItem>
      )}
    </div>
  );
};

export default navigationItems;

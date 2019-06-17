import React from "react";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import { css } from "emotion";
import Logo from "../../Assets/Icons/logo.png";

const SideDrawerStyle = css`
    background-color: #262688;
    color: white;
    height: 84vh;
    margin: 0;
    padding: 2em;
  `,
  svgStyle = css`
    background-color: #262688;
    width: 50%;
    padding-top: 1em;
  `,
  containerStyle = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #262688;
  `;

const SideDrawer = (props) => {
  return (
    <div className={containerStyle}>
      <img className={svgStyle} src={Logo} alt="logo" />
      <ul className={SideDrawerStyle}>
        <NavigationItems isLoggedIn={props.isLoggedIn} />
      </ul>
    </div>
  );
};

export default SideDrawer;

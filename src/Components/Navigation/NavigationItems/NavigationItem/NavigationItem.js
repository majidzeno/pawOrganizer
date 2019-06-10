import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "emotion";
const navigationItemStyle = css`
  color: white;
  text-decoration: none;
`;
const navigationItem = props => {
  return (
    <li>
      <NavLink className={navigationItemStyle} to={props.link}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;

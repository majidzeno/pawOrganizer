import React from "react";
import { css } from "emotion";
const datePickerStyle = css`
  border: 1px solid black;
  font-family: CR;
  font-size: 1em;
  border-radius: 3px;
  text-align: center;
  /* align-items: baseline; */
  &::-webkit-datetime-edit-month-field {
    color: grey;
  }
  &::-webkit-datetime-edit-day-field {
    color: grey;
  }
  &::-webkit-datetime-edit-year-field {
    color: grey;
  }
  &::-webkit-clear-button {
    font-size: 18px;
    /* height: 30px; */
    position: relative;
    /* right: 5px; */
    /* margin-right: 4px; */
  }
  &::-webkit-inner-spin-button {
    height: 30px;
  }
  &::-webkit-calendar-picker-indicator {
    font-size: 18px;
  }
  &::-webkit-calendar-picker-indicator:hover {
    background-color: #959595;
    color: grey;
    cursor: pointer;
  }
  &::-webkit-calendar-picker-indicator:active {
    color: grey;
    /* color: blue; */
  }
`;
const date = props => {
  return (
    <input onChange={props.changed} className={datePickerStyle} type="date" />
  );
};

export default date;

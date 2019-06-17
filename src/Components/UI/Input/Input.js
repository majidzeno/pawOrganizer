import React from "react";
import "./Input.css";
const Input = props => {
  let type = props.config.type,
    value = props.config.value,
    placeholder = props.config.placholder;

  return (
    <div className="inputComp">
      <label className="inputCompLabel">{props.label}</label>
      <input
        className={props.valid ? "inputCompCell" : "inputCompCell invalid"}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={props.changed}
      />
      <span className="inputCompErrorMessage">
        {props.valid ? "" : props.errorMessage}
      </span>
    </div>
  );
};

export default Input;

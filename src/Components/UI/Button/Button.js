import React from "react";
import { css } from "emotion";

export const buttonStyle = css`
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;
    font-family: Verdana, sans-serif;
    font-family: CS;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    padding: 9px 16px 9px;
    margin: 1.5em;
    transition: all 20ms ease-out;
    vertical-align: top;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    strong {
      font-family: CB;
      font-weight: bold;
    }
  `,
  Success = css`
    ${buttonStyle}
    background-color: #97cc76;
    background-image: linear-gradient(to bottom, #97cc76, #8bcc62);
    border: 1px solid #5f993a;
    box-shadow: inset 0 1px 0 #c6e6b3, inset 0 -1px 0 #79b356,
      inset 0 0 0 1px #a4cc8b, 0 2px 4px rgba(0, 0, 0, 0.2);
    color: white;
    &:active {
      background: #8bcc62;
      box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2);
    }
    &:focus,&:hover: {
      background: #8bcc62;
      border-color: #326612;
      box-shadow: inset 0 1px 0 #c6e6b3, inset 0 -1px 0 #79b356,
        inset 0 0 0 1px #a4cc8b;
    }
  `,
  Disabled = css`
    ${buttonStyle}
    background-color: grey;
    color: darkgrey;
    /* background-image: linear-gradient(to bottom, #97cc76, #8bcc62);
    border: 1px solid #5f993a;
    box-shadow: inset 0 1px 0 #c6e6b3, inset 0 -1px 0 #79b356,
      inset 0 0 0 1px #a4cc8b, 0 2px 4px rgba(0, 0, 0, 0.2); */
  `,
  Watchout = css`
    ${buttonStyle}

    background-color: #f58a38;
    background-image: linear-gradient(to bottom, #f58a38, #f57c20);
    border: 1px solid #c25706;
    box-shadow: inset 0 1px 0 #ffb984, inset 0 -1px 0 #db6f1d,
      inset 0 0 0 1px #f59851, 0 2px 4px rgba(0, 0, 0, 0.2);
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &:focus,&:hover: {
      background: #f57c20;
      border-color: #773300;
      box-shadow: inset 0 1px 0 #ffb984, inset 0 -1px 0 #db6f1d,
        inset 0 0 0 1px #f59851;
    }
    &:active {
      background: #f57c20;
      box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2);
    }
    .fa {
      color: #c25706;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    svg {
      margin-right: 10px;
    }
  `;

const button = props => {
  return (
    <button
      className={props.buttonClass}
      disabled={props.disabled}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default button;

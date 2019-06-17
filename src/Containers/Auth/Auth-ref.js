import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button, { Success, Danger } from "../../Components/UI/Button/Button";
import { connect } from "react-redux";
import { errorList } from "./errorList";
import { Redirect } from "react-router-dom";
import {
  contactDataWrapperStyle,
  formStyle
} from "../Checkout/ContactData/ContactData";
import * as actionCreators from "../../Store/Actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "example@test.com"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "******"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };
  switchAuthMethodHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };
  checkValidity(value, rules, elementType) {
    let isValid = false;
    if (elementType === "select") {
      isValid = true;
    }
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    if (rules.isEmail) {
      function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
      isValid = validateEmail(value);
    }
    if (rules.minLength) {
      isValid = value.length > 6;
    }
    return isValid;
  }
  onInputChangeHandler = (event, formKey) => {
    const updatedOrderForm = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedOrderForm[formKey]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
      updatedFormElement.elementType
    );
    updatedOrderForm[formKey] = updatedFormElement;
    // console.log(updatedFormElement);
    this.setState({
      controls: updatedOrderForm
    });
  };
  submitHandler = event => {
    event.preventDefault();
    this.props.authHandler(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  componentDidMount() {
    return (
      <Redirect
        to={this.props.buildingBurger ? "/checkout" : "/burgerbuilder"}
      />
    );
  }

  render() {
    const dataArr = { ...this.state.controls };
    const formKeys = Object.keys(dataArr);
    if (this.props.isLoggedIn) {
      return (
        <Redirect
          to={this.props.buildingBurger ? "/checkout" : "/burgerbuilder"}
        />
      );
    }
    let btn = this.state.isSignup ? (
      <span>
        <p>Already have an account ?</p>
        <Button clicked={this.switchAuthMethodHandler} buttonClass={Danger}>
          SIGNIN
        </Button>
      </span>
    ) : (
      <span>
        <p>Don't have an account ?</p>
        <Button clicked={this.switchAuthMethodHandler} buttonClass={Danger}>
          SIGNUP
        </Button>
      </span>
    );
    let errorMsg = null;

    if (this.props.error) {
      errorMsg = (
        <p style={{ color: "red" }}>{errorList[this.props.error.message]}</p>
      );
    }

    let form;
    this.props.loading
      ? (form = <h1>LOADing ... Please Wait ^__^ </h1>)
      : this.props.msg
      ? (form = this.props.msg)
      : (form = (
          <form action="" className={formStyle} onSubmit={this.submitHandler}>
            {errorMsg}
            {formKeys.map((formKey, i) => {
              return (
                <Input
                  key={formKey + i}
                  elementType={dataArr[formKey].elementType}
                  elementConfig={dataArr[formKey].elementConfig}
                  elementValue={dataArr[formKey].value}
                  changed={event => this.onInputChangeHandler(event, formKey)}
                  valid={dataArr[formKey].valid}
                  touched={dataArr[formKey].touched}
                />
              );
            })}
            <Button buttonClass={Success}>Submit your Data</Button>
          </form>
        ));
    return (
      <div className={contactDataWrapperStyle}>
        {form}
        {btn}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.authR.loading,
    msg: state.authR.msg,
    error: state.authR.error,
    token: state.authR.idToken,
    isLoggedIn: state.authR.idToken,
    buildingBurger: state.burgerR.building
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authHandler: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

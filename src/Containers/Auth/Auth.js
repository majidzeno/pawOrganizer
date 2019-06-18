import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button, { Success, Watchout } from "../../Components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/Actions/ActionCreators/index";
import { errorList } from "./errorList";
import { Redirect } from "react-router-dom";
// let form;
class Auth extends Component {
  state = {
    userInput: {
      email: {
        elementLabel: "Email",
        elementConfig: {
          type: "email",
          placeholder: "example@email.com"
        },
        value: " ",
        validation: {
          required: true,
          isEmail: true
        },
        valid: true,
        touched: false,
        errorMessage: "Please Enter a Valid Email"
      },
      password: {
        elementLabel: "Password",
        elementConfig: {
          type: "password",
          placeholder: "******"
        },
        value: " ",
        validation: {
          required: true,
          isEmail: false
        },
        valid: true,
        touched: false,
        errorMessage: "Please Enter a Valid Password"
      }
    },
    requestAvailability: true,
    alreadyMember: false
  };
  componentDidMount() {
    this.setState({
      requestAvailability: false
    });
  }

  formFactory = userInputElementKey => {
    let userInputArr = { ...this.state.userInput };
    return (
      <Input
        label={userInputArr[userInputElementKey].elementLabel}
        config={userInputArr[userInputElementKey].elementConfig}
        key={userInputElementKey}
        changed={e => this.onInputChangeHandler(e, userInputElementKey)}
        valid={userInputArr[userInputElementKey].valid}
        errorMessage={userInputArr[userInputElementKey].errorMessage}
      />
    );
  };
  checkValidity = (elementType, value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    if (elementType === "email") {
      function validateEmail(email) {
        var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
      isValid = validateEmail(value);
    }
    if (elementType === "password") {
      isValid = value.length > 6;
    }
    return isValid;
  };
  onInputChangeHandler = (e, userInputElementKey) => {
    let updatedUserInput = { ...this.state.userInput };
    updatedUserInput[userInputElementKey].value = e.target.value;
    updatedUserInput[userInputElementKey].touched = true;
    updatedUserInput[userInputElementKey].valid = this.checkValidity(
      userInputElementKey,
      updatedUserInput[userInputElementKey].value,
      updatedUserInput[userInputElementKey].validation
    );

    this.setState({
      userInput: updatedUserInput,
      requestAvailability: updatedUserInput[userInputElementKey].valid
    });
  };
  submitHandler = e => {
    e.preventDefault();
    const auth = {
      email: this.state.userInput.email.value,
      password: this.state.userInput.password.value,
      alreadyMember: this.state.alreadyMember
    };
    this.props.authHandler(auth);
  };
  render() {
    let formKeys = Object.keys({ ...this.state.userInput }),
      signUpform = formKeys.map(userInputElementKey => {
        return this.formFactory(userInputElementKey);
      }),
      signInform = ["email", "password"].map(userInputElementKey => {
        return this.formFactory(userInputElementKey);
      });
    let btnClass = Success,
      btnSign = null,
      btnText1 = "Create",
      btnText2 = "New Account";
    // If this user is a member , make the button text "Sign in"
    if (this.state.alreadyMember) {
      btnClass = Success;
      btnSign = null;
      btnText1 = "Sign";
      btnText2 = "in";
    }
    // If this user is NOT a member & The request is not available
    if (!this.state.alreadyMember) {
      if (!this.state.requestAvailability) {
        btnClass = Watchout;
        btnText1 = "Watch";
        btnText2 = "Out!";
        btnSign = <FontAwesomeIcon icon="exclamation-triangle" />;
      }
    }
    // After Login , Redirect the user to the dashboard
    if (this.props.token) {
      return <Redirect to={process.env.PUBLIC_URL + "/"} />;
    }

    return (
      <div>
        <h1>{!this.state.alreadyMember ? "SignUp" : "Sign In"}</h1>
        <span>
          {!this.state.alreadyMember
            ? "Already Member ?"
            : "Don't have an account ?"}
        </span>
        <span
          className="link"
          onClick={() => {
            this.setState({ alreadyMember: !this.state.alreadyMember });
          }}>
          {!this.state.alreadyMember ? "Sign In" : "SignUp"}
        </span>
        <form action="" onSubmit={this.submitHandler}>
          {!this.state.alreadyMember ? signUpform : signInform}
          <Button
            disabled={!this.state.requestAvailability}
            buttonClass={btnClass}>
            {btnSign}
            <span style={{ marginRight: "3px" }}>{btnText1}</span>
            <strong>{btnText2}</strong>
          </Button>
          <span className="invalid">
            {this.props.databaseError
              ? errorList[this.props.databaseError.message]
              : ""}
          </span>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.authReducer.idToken,
    databaseError: state.authReducer.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authHandler: auth =>
      dispatch(
        actionCreators.auth(auth.email, auth.password, auth.alreadyMember)
      )
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

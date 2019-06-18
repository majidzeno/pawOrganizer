import * as actionTypes from "../ActionTypes/ActionTypes";
import axios from "axios";
// Where all events Start
// exports a function that return object, this object called "Action" so this function considered "Action Creator" , this action consists of many things , the most important thing in action is type
export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT
  };
};
export const auth = (email, password, alreadyMember) => {
  return dispatch => {
    dispatch(authInit());
    console.log("alreadyMember ", alreadyMember);

    const authData = {
        email,
        password,
        returnSecureToken: true
      },
      URL = alreadyMember
        ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
            process.env.REACT_APP_FIREBASE_API
          }`
        : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
            process.env.REACT_APP_FIREBASE_API
          }`;
    axios
      .post(URL, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
      })
      .catch(error => {
        console.log(error.response.data.error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: authData.idToken,
    localId: authData.localId,
    email: authData.email
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

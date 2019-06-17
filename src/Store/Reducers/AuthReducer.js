import * as actionTypes from "../Actions/ActionTypes/ActionTypes";

const initialState = {
  idToken: localStorage.getItem("token"),
  localId: localStorage.getItem("userId"),
  error: null,
  loading: null,
  username: null
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.AUTH_SUCCESS:
      let username = action.email.replace(/@.*$/, "");
      return {
        ...state,
        idToken: action.idToken,
        localId: action.localId,
        loading: false,
        username: username
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        localId: null,
        error: null,
        loading: null,
        username: null,
        idToken: null
      };
    default:
      return state;
  }
};
export default authReducer;

import * as actionTypes from "../ActionTypes/ActionTypes";
import AX from "../../../axios-req";

export const loadEventsSuccess = events => {
  return {
    type: actionTypes.LOAD_EVENTS_SUCCESS,
    events: events
  };
};

export const loadEventsFailed = () => {
  return {
    type: actionTypes.LOAD_EVENTS_FAILED
  };
};

export const loadEvents = () => {
  return dispatch => {
    AX.get("./holidays.json")
      .then(response => {
        dispatch(loadEventsSuccess(response.data), console.log(response.data));
      })
      .catch(error => {
        dispatch(loadEventsFailed());
      });
  };
};

// export const cancelEvent = id => {
//   return {
//     type: actionTypes.CANCEL_EVENT,
//     eventId: id
//   };
// };

// export const cancelEvent_Server = id => {
//   return dispatch => {
//     AX.delete(`holidays.json/${id}`).then(response => {
//       dispatch(cancelEvent());
//     });
//   };
// };

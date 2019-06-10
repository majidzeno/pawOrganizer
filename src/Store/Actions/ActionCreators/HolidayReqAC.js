import * as actionTypes from "../ActionTypes/ActionTypes";
import AX from "../../../axios-req";

export const requestHoliday = obj => {
  // console.log(obj);
  const holiday = {
    from: obj.date1,
    to: obj.date2,
    days: obj.days
  };
  return dispatch => {
    AX.post("/holidays.json", holiday)
      .then(response => {
        dispatch(holidayRequestSubmitted(holiday));
      })
      .catch(error => {
        console.log(error);
        dispatch(holidayRequestFailed(error));
      });
  };
};

export const holidayRequestSubmitted = (holiday) => {
  return {
    type: actionTypes.REQUEST_HOLIDAY_SUCCESS,
    holiday : holiday
  };
};

export const holidayRequestFailed = (error) => {
  return {
    type: actionTypes.REQUEST_HOLIDAY_FAILED,
    error : error
  };
};

//When user logged into his page load his holidays profile
// Dashboard and request holidays pages

// export const loadHolidays = () => {
//   return dispatch => {
//     AX.get("holidays.json")
//       .then(response => dispatch(setHolidays(response.data)))
//       .catch(error => {
//         dispatch(failedFetch());
//       });
//   };
// };

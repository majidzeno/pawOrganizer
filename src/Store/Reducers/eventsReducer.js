import * as actionTypes from "../Actions/ActionTypes/ActionTypes";

const initialState = {
  holidays: 21,
  taken: 0,
  events: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_HOLIDAY_SUCCESS:
      let days = action.holiday.days;
      return {
        ...state,
        holidays: state.holidays - days,
        taken: days
      };
    case actionTypes.LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.events
      };
    default:
      return state;
  }
};

export default reducer;

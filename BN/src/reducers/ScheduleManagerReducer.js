import {
    SCHEDULE_MANAGER_GET_LIST_APPOINT,
    SCHEDULE_MANAGER_GET_LIST_APPOINT_SUCCESS,
    SCHEDULE_MANAGER_GET_LIST_APPOINT_FAIL,
    SCHEDULE_MANAGER_RESET_DATA

  } from "../actions/ActionType";

  export const _INITIAL_STATE = {
    dataAppointSchedule: [],
    isLoading: false,
    lastError: ""
  };

  export const scheduleManagerReducer = (state = _INITIAL_STATE, action) => {

    switch (action.type) {
      case SCHEDULE_MANAGER_RESET_DATA:
      return {
        dataAppointSchedule: [],
        isLoading: true,
        lastError: ""
      };
      case SCHEDULE_MANAGER_GET_LIST_APPOINT_SUCCESS:
      return {
        dataAppointSchedule: action.dataAppointSchedule,
        isLoading: false,
        lastError: ""
      };
      case SCHEDULE_MANAGER_GET_LIST_APPOINT_FAIL:
      return {
        dataAppointSchedule: [],
        isLoading: false,
        lastError: ""
      };
      default: return state;
  }
}
  
  

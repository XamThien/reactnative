import {
  CREATE_SCHEDULE_CREATE_DATA_SUCCESS,
  CREATE_SCHEDULE_CREATE_DATA_FAIL,
  CREATE_SCHEDULE_RESET_DATA,
  WORK_SCHEDULE_RESET_DATA,
  CREATE_SCHEDULE_GEN_TIME_SUCCESS,
  CREATE_SCHEDULE_GEN_TIME_FAIL,
  CREATE_SCHEDULE_GEN_TIME_RESET
} from "../actions/ActionType";

export const _INITIAL_STATE = {
  isLoading: false,
  lastError: undefined,
  hasError: false,
  dataSchedule: {},
  dataTimes: {}
};

export const createScheduleReducers = (state = _INITIAL_STATE, action) => {
  switch (action.type) {
    case WORK_SCHEDULE_RESET_DATA:
      return {
        ...state,
        lastError: "",
        hasError: false,
        isLoading: false,
        dataSchedule: {}
      };
    case CREATE_SCHEDULE_CREATE_DATA_SUCCESS:
      return {
        ...state,
        lastError: "",
        hasError: "",
        isLoading: false,
        dataSchedule: action.dataSchedule
      };

    case CREATE_SCHEDULE_CREATE_DATA_FAIL:
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: false,
        dataSchedule: {}
      };

    case CREATE_SCHEDULE_RESET_DATA:
      return {
        ...state,
        lastError: "",
        hasError: false,
        isLoading: true,
        dataSchedule: {}
      };
    case CREATE_SCHEDULE_GEN_TIME_RESET:
      return {
        ...state,
        lastError: "",
        hasError: false,
        isLoading: true,
        dataTimes: {}
      };
    case CREATE_SCHEDULE_GEN_TIME_SUCCESS:
      return {
        ...state,
        lastError: "",
        hasError: false,
        isLoading: false,
        dataTimes: action.dataTimes
      };
    case CREATE_SCHEDULE_GEN_TIME_FAIL:
      return {
        ...state,
        lastError: "",
        hasError: action.hasError,
        isLoading: false,
        dataTimes: {}
      };
    default:
      return state;
  }
};

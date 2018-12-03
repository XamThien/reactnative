import {
    EXAMINATION_SCHEDULE_LOAD_LIST_APPOINT,
    EXAMINATION_SCHEDULE_LOAD_APPOINT_SUCCESS,
    EXAMINATION_SCHEDULE_LOAD_APPOINT_FAIL,
    EXAMINATION_SCHEDULE_RESET_LIST_APPOINT,
    EXAMINATION_SCHEDULE_LOAD_USER_APPOINT,
    EXAMINATION_SCHEDULE_RESET_LOADING,

    EXAMINATION_SCHEDULE_UPDATE_STATUS,
    EXAMINATION_SCHEDULE_UPDATE_STATUS_SUCCESS,
    EXAMINATION_SCHEDULE_UPDATE_STATUS_FAIL

} from "../actions/ActionType";

export const _INITIAL_STATE = {
    dataAppoint: {},
    isLoading: false,
    lastError: undefined,
    hasError: false,
    
};

export const getListAppointReducer = (state = _INITIAL_STATE ,action) => {
    switch (action.type) {
      case EXAMINATION_SCHEDULE_RESET_LOADING:
      return {
        ...state,
		lastError : "",
        hasError : undefined,
        isLoading: true
      }  
      case EXAMINATION_SCHEDULE_RESET_LIST_APPOINT:
      return {
        ...state,
		lastError : "",
        hasError : undefined,
        isLoading: true,
        dataAppoint: {}
      };
      case EXAMINATION_SCHEDULE_LOAD_APPOINT_SUCCESS:
      return {
        ...state,
        dataAppoint: action.dataAppoint,
		lastError : "",
        hasError : undefined,
        isLoading: false
      };
      case EXAMINATION_SCHEDULE_LOAD_APPOINT_FAIL:
      return {
        ...state,
        hasError: action.hasError,
        lastError: "",
        isLoading: false,
        dataAppoint: {}
      };
      default: return state;
  }
}





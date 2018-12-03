import {
    WORK_SCHEDULE_LOAD_DATA_SUCCESS,
    WORK_SCHEDULE_LOAD_DATA_FAIL,
    WORK_SCHEDULE_RESET_DATA,
    WORK_SCHEDULE_LOAD_ALL_PATIENTS_SUCCESS,
    WORK_SCHEDULE_MESSAGE_EVENTS_CALLBACK,
    VIDEO_CALL_RESET_MESSAGE_CALLBACK

} from "../actions/ActionType";

export const _INITIAL_STATE = {
    isLoading: false,
    lastError: undefined,
    hasError: false,
    dataWorkSchedule: {},
    dataPatients: [],
    callbackPatient: ""
    
};

export const loadWorkScheduleReducers = (state = _INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_SCHEDULE_LOAD_DATA_SUCCESS:
            return {
                ...state,
                lastError : "",
                hasError : "",
                isLoading: action.isLoading,
                dataWorkSchedule: action.dataWorkSchedule
            };

        case WORK_SCHEDULE_LOAD_DATA_FAIL:
            return {
                ...state,
                lastError : action.lastError,
                hasError : action.hasError,
                isLoading: action.isLoading,
                dataWorkSchedule: {}
            };

        case WORK_SCHEDULE_RESET_DATA: 
        return {
            ...state,
            lastError : "",
            hasError : false,
            isLoading: true,
            dataWorkSchedule: {}
          };
        case WORK_SCHEDULE_LOAD_ALL_PATIENTS_SUCCESS:
        return {
            ...state,
            isLoading: action.isLoading,
            dataPatients: action.dataPatients
          };
        case WORK_SCHEDULE_MESSAGE_EVENTS_CALLBACK:
        return {
            ...state,
            callbackPatient: action.callbackPatient
          };
        case VIDEO_CALL_RESET_MESSAGE_CALLBACK:
        return {
            ...state,
            callbackPatient: action.callbackPatient
          };
        default:
            return state;
    }
};




import {
    CREATE_SCHEDULE_CREATE_DATA_SUCCESS,
    CREATE_SCHEDULE_CREATE_DATA_FAIL,
    CREATE_SCHEDULE_RESET_DATA,
    WORK_SCHEDULE_RESET_DATA

} from "../actions/ActionType";

export const _INITIAL_STATE = {
    isLoading: false,
    lastError: undefined,
    hasError: false,
    dataSchedule: {}
    
};

export const createScheduleReducers = (state = _INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_SCHEDULE_RESET_DATA:
        return {
            ...state,
            lastError : "",
            hasError : false,
            isLoading: false,
            dataSchedule: {}
          };
        case CREATE_SCHEDULE_CREATE_DATA_SUCCESS:
            return {
                ...state,
                lastError : "",
                hasError : "",
                isLoading: false,
                dataSchedule: action.dataSchedule
            };

        case CREATE_SCHEDULE_CREATE_DATA_FAIL:
            return {
                ...state,
                lastError : action.lastError,
                hasError : action.hasError,
                isLoading: false,
                dataSchedule: {}
            };  

        case CREATE_SCHEDULE_RESET_DATA: 
        return {
            ...state,
            lastError : "",
            hasError : false,
            isLoading: true,
            dataSchedule: {}
          };
        default:
            return state;
    }
};




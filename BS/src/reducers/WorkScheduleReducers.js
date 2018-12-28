import {
    WORK_SCHEDULE_LOAD_DATA_SUCCESS,
    WORK_SCHEDULE_LOAD_DATA_FAIL,
    WORK_SCHEDULE_RESET_DATA,
    CREATE_SCHEDULE_CREATE_DATA_SUCCESS

} from "../actions/ActionType";

export const _INITIAL_STATE = {
    isLoading: false,
    lastError: undefined,
    hasError: false,
    dataWorkSchedule: {},
    isReloadSchedule: false,
    
};

export const workScheduleReducers = (state = _INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_SCHEDULE_LOAD_DATA_SUCCESS:
            return {
                ...state,
                lastError : "",
                hasError : "",
                isLoading: false,
                dataWorkSchedule: action.dataWorkSchedule
            };
        case WORK_SCHEDULE_LOAD_DATA_FAIL:
            return {
                ...state,
                lastError : action.lastError,
                hasError : action.hasError,
                isLoading: false,
                dataWorkSchedule: {}
            };
        case WORK_SCHEDULE_RESET_DATA: 
        return {
            ...state,
            lastError : "",
            hasError : false,
            isLoading: true,
            isReloadSchedule: false,
            dataWorkSchedule: {}
          };
        case CREATE_SCHEDULE_CREATE_DATA_SUCCESS: 
        return {
              ...state,
              isReloadSchedule: true,
              dataWorkSchedule: {}
        };  
        default:
            return state;
    }
};




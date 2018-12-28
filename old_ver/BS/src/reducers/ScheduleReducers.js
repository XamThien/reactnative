import {
    SCHEDULE_LOAD_USER_FROFILE_SUCCESS,

} from "../actions/ActionType";

var saveDataDoctor = [];

export const _INITIAL_STATE_SPECIALIZE = {
    isLoading: false,
    lastError: undefined,
    hasError: false,
    
};

export const getProfilesReducers = (userProfiles = [], action) => {
    switch (action.type) {
        case SCHEDULE_LOAD_USER_FROFILE_SUCCESS:
            return action.userProfiles;
        default:
            return userProfiles;
    }
};




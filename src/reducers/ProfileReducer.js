import {
    PROFILE_LOAD_USER_PROFILE, 
    PROFILE_LOAD_USER_PROFILE_SUCCESS
} from "../actions/ActionType";


export const getProfilesReducers = (userProfiles = [], action) => {
    switch (action.type) {
        case PROFILE_LOAD_USER_PROFILE_SUCCESS:
            return action.userProfiles;
            
        default:
            return userProfiles;
    }
};




import {
    STARTSCREEN_LOGIN_FACEBOOK_FAIL,
    STARTSCREEN_LOGIN_FACEBOOK_RESET,
    STARTSCREEN_LOGIN_SOCIAL_SUCCESS,
    STARTSCREEN_LOGIN_GOOGLE_FAIL,
    STARTSCREEN_LOGIN_GOOGLE_RESET
} from "../actions/ActionType";

export const _INITIAL_STATE_ = {
    userProfiles: {},
    isLoading: false,
    lastError: undefined,
    hasError: false,
};

export const loginSocialReducers = (state = _INITIAL_STATE_, action) => {
    switch (action.type) {
        case STARTSCREEN_LOGIN_SOCIAL_SUCCESS:
            console.log("nvTien - login social success...");
            return {
                ...state,
                userProfiles: action.userProfiles,
                hasError: false,
                lastError: "",
                isLoading: false
            };
        case STARTSCREEN_LOGIN_FACEBOOK_RESET:
            console.log("nvTien - Reset login facebook...");
            return {
                ...state,
                userProfiles: null,
                hasError: false,
                lastError: "",
                isLoading: false
            };
        case STARTSCREEN_LOGIN_GOOGLE_RESET:
            console.log("nvTien - Reset login google...");
            return {
                ...state,
                userProfiles: null,
                hasError: false,
                lastError: "",
                isLoading: false
            };
        case STARTSCREEN_LOGIN_FACEBOOK_FAIL:
            console.log("nvTien - login facebook fail...");
            return {
                ...state,
                userProfiles: null,
                hasError: true,
                lastError: action.lastError,
                isLoading: false
            };
        case STARTSCREEN_LOGIN_GOOGLE_FAIL:
            console.log("nvTien - login google fail...");
            return {
                ...state,
                userProfiles: null,
                hasError: true,
                lastError: action.lastError,
                isLoading: false
            };

        default:
            return state;
    }
};

  
  
  
import {
  USER_MANAGER_UPDATE_USER,
  USER_MANAGER_UPDATE_USER_SUCCESS,
  USER_MANAGER_UPDATE_USER_FAIL,
  USER_MANAGER_UPDATE_USER_RESET
} from "../actions/ActionType";

export const _INITIAL_STATE_ = {
  // dataNewUser: {},
  isLoading: false,
  lastError: undefined,
  hasError: false,
  isDissmiss: false
};

export const editUserInfoReducer = (state = _INITIAL_STATE_, action) => {

  switch (action.type) {
    case USER_MANAGER_UPDATE_USER_RESET:
      return {
        ...state,
        lastError: "",
        hasError: undefined,
        isLoading: false,
        isDissmiss: false,
        // dataNewUser: {}
      };
    case USER_MANAGER_UPDATE_USER:
      return {
        ...state,
        lastError: "",
        hasError: undefined,
        isLoading: true,
        isDissmiss: false,
        // dataNewUser: {}
      };
    case USER_MANAGER_UPDATE_USER_SUCCESS:
      return {
        ...state,
        hasError: action.hasError,
        lastError: "",
        isLoading: false,
        isDissmiss: true,
        messageSuccess: action.messageSuccess
        // dataNewUser: action.dataNewUser
      };
    case USER_MANAGER_UPDATE_USER_FAIL:
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: false,
        isDissmiss: false,
      };
    default: return state;
  }
}



import {
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_DO_RESET
  } from "../actions/ActionType";

  export const _INITIAL_STATE_ = {
    isLoading: false,
    lastError: undefined,
    hasError: false,
    messageSuccess: ''
  };
  
  export const changePasswordReducer = (state = _INITIAL_STATE_, action) => {
    
    switch (action.type) {
      case CHANGE_PASSWORD_SUCCESS:  
      return {
        ...state,
        messageSuccess: action.messageSuccess,
        hasError: action.hasError,
        lastError: "",
        isLoading: false
      };
      case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        messageSuccess: "",
		    lastError : action.lastError,
        hasError : action.hasError,
        isLoading: false
      };
      case CHANGE_PASSWORD_DO_RESET:
      return {
        ...state,
        messageSuccess: "",
		    lastError : action.lastError,
        hasError : action.hasError,
        isLoading: true
      };
      default:
        return state; //state does not change
    }
  };
  
  
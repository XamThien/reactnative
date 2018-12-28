

import {
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGIN_RESET_LOGIN
  } from "../actions/ActionType";

  export const _INITIAL_STATE_ = {
    userProfile: {},
    isLoading: false,
    lastError: undefined,
    hasError: false,
  };
  
  export const resultLoginReducer = (state = _INITIAL_STATE_, action) => {
    
    switch (action.type) {
      case LOGIN_SUCCESS:  
      console.log(`nvTien - login success...`);
      return {
        ...state,
        userProfile: action.userProfile,
        hasError: action.hasError,
        lastError: "",
        isLoading: false
      };
      case LOGIN_FAIL:
      return {
        ...state,
        userProfile: {},
		    lastError : action.lastError,
        hasError : action.hasError,
        isLoading: false
      };
      case LOGIN_RESET_LOGIN:
      return {
        ...state,
        userProfile: {},
		    lastError : action.lastError,
        hasError : action.hasError,
        isLoading: true
      };
      default:
        return state; //state does not change
    }
  };
  
  
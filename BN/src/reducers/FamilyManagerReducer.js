import {

    FAMILY_MANAGER_SUCCESS_DELETE,
    FAMILY_MANAGER_ERROR_DELETE,
    FAMILY_MANAGER_RESERT_DELETE,

    FAMILY_MANAGER_SUCCESS_DUPDATE,
    FAMILY_MANAGER_ERROR_UPDATE,
    FAMILY_MANAGER_RESERT_UPDATE
  } from "../actions/ActionType";

  export const _INITIAL_STATE_DELETE = {
    isLoading: false,
    lastError: undefined,
    hasError: false,
    messageSuccess: ''
  };
  
  export const resultDeleteMemberReducer = (state = _INITIAL_STATE_DELETE, action) => {
    
    switch (action.type) {
      case FAMILY_MANAGER_SUCCESS_DELETE:  
      console.log(`nvHuy - delete member success...`);
      return {
        ...state,
        messageSuccess: action.messageSuccess,
        hasError: action.hasError,
        lastError: "",
        isLoading: false
      };
      case FAMILY_MANAGER_ERROR_DELETE:
      console.log(`nvHuy - delete member false...`);
      return {
        ...state,
        messageSuccess: "",
		    lastError : action.lastError,
        hasError : action.hasError,
        isLoading: false
      };
      case FAMILY_MANAGER_RESERT_DELETE:
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
  

  export const _INITIAL_STATE_UPDATE = {
    isLoading: false,
    lastError: undefined,
    hasError: false,
    messageSuccess: ''
  };
  
  export const resultUpdateMemberReducer = (state = _INITIAL_STATE_UPDATE, action) => {
    
    switch (action.type) {
      case FAMILY_MANAGER_SUCCESS_DUPDATE:  
      console.log(`nvHuy - update member success...`);
      return {
        ...state,
        messageSuccess: action.messageSuccess,
        hasError: action.hasError,
        lastError: "",
        isLoading: false
      };
      case FAMILY_MANAGER_ERROR_UPDATE:
      console.log(`nvHuy - update member false...`);
      return {
        ...state,
        messageSuccess: "",
		    lastError : action.lastError,
        hasError : action.hasError,
        isLoading: false
      };
      case FAMILY_MANAGER_RESERT_UPDATE:
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
  
  
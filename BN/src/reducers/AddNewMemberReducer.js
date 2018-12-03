import {
    MODAL_NAME_ADD_NEW_MEMBER,
    MODAL_NAME_ADD_NEW_MEMBER_SUCCESS,
    MODAL_NAME_ADD_NEW_MEMBER_FAIL,
    MODAL_NAME_RESET_OLD_DATA
  } from "../actions/ActionType";

  export const _INITIAL_STATE_ = {
    dataNewUser: {},
    isLoading: false,
    lastError: undefined,
    hasError: false,
    isDissmiss: false
  };

  export const addNewMemberReducer = (state = _INITIAL_STATE_,action) => {

    switch (action.type) {
      case MODAL_NAME_RESET_OLD_DATA:
      return {
        ...state,
		    lastError : "",
        hasError : undefined,
        isLoading: false,
        isDissmiss: false,
        dataNewUser: {}
      };
      case MODAL_NAME_ADD_NEW_MEMBER:
      return {
        ...state,
		    lastError : "",
        hasError : undefined,
        isLoading: true,
        isDissmiss: false,
        dataNewUser: {}
      };
      case MODAL_NAME_ADD_NEW_MEMBER_SUCCESS:
      return {
        ...state,
        hasError: action.hasError,
        lastError: "",
        isLoading: false,
        isDissmiss: true,
        dataNewUser: action.dataNewUser
      };
      case MODAL_NAME_ADD_NEW_MEMBER_FAIL:
      return {
        ...state,
		    lastError : action.lastError,
        hasError : action.hasError,
        isLoading: false,
        isDissmiss: false,
      };
      default: return state;
  }
}
  
  

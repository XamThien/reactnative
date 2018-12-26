import {
  ADD_MEMBER_FAMILY,
  ADD_MEMBER_FAMILY_SUCCESS,
  ADD_MEMBER_FAMILY_FAIL,
  ADD_MEMBER_FAMILY_RESET
} from "../actions/ActionType";

export const _INITIAL_STATE_ = {
  dataNewUser: {},
  isLoading: false,
  lastError: undefined,
  hasError: false,
  isDissmiss: false
};

export const addMemberFamilyReducer = (state = _INITIAL_STATE_, action) => {
  switch (action.type) {
    case ADD_MEMBER_FAMILY_RESET:
      return {
        ...state,
        lastError: "",
        hasError: undefined,
        isLoading: false,
        isDissmiss: false,
        dataNewUser: {}
      };
    case ADD_MEMBER_FAMILY:
      return {
        ...state,
        lastError: "",
        hasError: undefined,
        isLoading: true,
        isDissmiss: false,
        dataNewUser: {}
      };
    case ADD_MEMBER_FAMILY_SUCCESS:
      return {
        ...state,
        hasError: action.hasError,
        lastError: "",
        isLoading: false,
        isDissmiss: true,
        dataNewUser: action.dataNewUser
      };
    case ADD_MEMBER_FAMILY_FAIL:
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: false,
        isDissmiss: false
      };
    default:
      return state;
  }
};

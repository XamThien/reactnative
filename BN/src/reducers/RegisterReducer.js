import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_RESET_REGISTER
} from "../actions/ActionType";

export const _INITIAL_STATE_ = {
  userData: {},
  isLoading: false,
  lastError: undefined,
  hasError: false
};

export const resultRegisterReducer = (state = _INITIAL_STATE_, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
        console.log("nvTien - REGISTER_SUCCESS");
      return {
        ...state,
        hasError: action.hasError,
        lastError: "",
        isLoading: false,
      };
    case REGISTER_FAIL:
      console.log("nvTien - LOGIN_FAIL");
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: false,
      };
    case REGISTER_RESET_REGISTER:
      console.log("nvTien - LOGIN_RESET_LOGIN");
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: true,
      };
    default:
      return state; //state does not change
  }
};

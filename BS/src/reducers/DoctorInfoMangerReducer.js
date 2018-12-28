import {
  DOCTOR_INFO_MANAGER_DO_GET_DATA_SUCCESS,
  DOCTOR_INFO_MANAGER_DO_GET_DATA_ERROR,
  DOCTOR_INFO_MANAGER_DO_GET_DATA_RESET,
  DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_SUCCESS,
  DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_ERROR,
  DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_RESET
} from "../actions/ActionType";

export const _INITIAL_STATE_ = {
  isLoading: false,
  lastError: undefined,
  hasError: false
};

export const doctorInfoManagerReducer = (
  state = _INITIAL_STATE_,
  action
) => {
  switch (action.type) {
    // ========================== case for get doctor infomation =========================
    case DOCTOR_INFO_MANAGER_DO_GET_DATA_SUCCESS:
      return {
        ...state,
        doctorData: action.doctorData,
        // loginProfile: action.loginProfile,
        hasError: action.hasError,
        lastError: "",
        isLoading: false
      };
    case DOCTOR_INFO_MANAGER_DO_GET_DATA_ERROR:
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: false
      };
    case DOCTOR_INFO_MANAGER_DO_GET_DATA_RESET:
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: true
      };

    // ========================== case for update doctor infomation =========================
    case DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        messageSuccess: action.messageSuccess,
        hasError: action.hasError,
        lastError: "",
        isLoading: false
      };
    case DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_ERROR:
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: false
      };
    case DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_RESET:
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: true
      };

    default:
      return state; //state does not change
  }
};

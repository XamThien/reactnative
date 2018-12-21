import {

    SETTING_NOTIFICATION_GET_DATA_SUCCESS,
    SETTING_NOTIFICATION_GET_DATA_FAIL,
    
    SETTING_NOTIFICATION_SAVE_DATA_SUCCESS,
    SETTING_NOTIFICATION_SAVE_DATA_FAIL,
  } from "../actions/ActionType";



export const _INITIAL_STATE_ = {
  isLoading: false,
  lastError: undefined,
  messageSuccess: ''
};

export const resultSettingNotificationReducer = (state = _INITIAL_STATE_, action) => {
  switch (action.type) {
      
      case SETTING_NOTIFICATION_GET_DATA_SUCCESS:
          return {
              ...state,
              lastError: "",
              isLoading: false,
              hasError: false,
              setting_notify: action.setting_notify,
              messageSuccess: action.messageSuccess

          };
      case SETTING_NOTIFICATION_GET_DATA_FAIL:
          return {
              ...state,
              lastError: action.lastError,
              isLoading: false,
              hasError: true
          };
          

      case SETTING_NOTIFICATION_SAVE_DATA_SUCCESS:
          return {
            ...state,
            lastError: "",
            isLoading: false,
            hasError: false,
            messageSuccess: action.messageSuccess,
            setting_notify: action.setting_notify,
            
          };
      case SETTING_NOTIFICATION_SAVE_DATA_FAIL:
          return {
            ...state,
            lastError: action.lastError,
            isLoading: false,
            hasError: false,
          };
      
    default:
      return state; //state does not change
  }
};

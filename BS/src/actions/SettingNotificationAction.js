import {
    SETTING_NOTIFICATION_GET_DATA,
    SETTING_NOTIFICATION_SAVE_DATA,
  } from "./ActionType";
  
  export const doGetTimeSettingNotification = () => {
    return {
      type: SETTING_NOTIFICATION_GET_DATA,
    }
  }
  
  export const updateTimeSettingNotification = (time,checked) => {
    return {
      type: SETTING_NOTIFICATION_SAVE_DATA,
      time,
      checked
    }
  }
  
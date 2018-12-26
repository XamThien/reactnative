import {
    USER_MANAGER_UPDATE_USER,
  } from "./ActionType";
  
  
  export const doUpdateUser = (dataNewUser,userOldInfo) => {
    return {
      type: USER_MANAGER_UPDATE_USER,
      dataNewUser,
      userOldInfo
    }
  }
  
  
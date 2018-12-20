import {
    USER_MANAGER_UPDATE_USER,
    USER_MANAGER_UPDATE_USER_SUCCESS,

  } from "./ActionType";
  
  
  export const doUpdateUser = (dataNewUser,userOldInfo) => {
    return {
      type: USER_MANAGER_UPDATE_USER,
      dataNewUser,
      userOldInfo
    }
  }
  
  export const doUpdateUserSuccess = (dataUser) => {
    return {
      type: USER_MANAGER_UPDATE_USER_SUCCESS,
      dataUser
    }
  }
  export const doUpdateUserFail = (error) => {
    return {
      type: USER_MANAGER_UPDATE_USER_SUCCESS,
      error
    }
  }

  export const doUpdateUserReset = () => {
    return {
      type: USER_MANAGER_UPDATE_USER_SUCCESS,
      
    }
  }
  
  
import {
    CHANGE_PASSWORD_DO_CHANGE,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_DO_RESET
  } from "./ActionType";
  
  
  export const doChangePassword = (newPassword,oldPassword) => {
    return {
      type: CHANGE_PASSWORD_DO_CHANGE,
      newPassword,
      oldPassword
    }
  }
  
  export const isChangePassword = (newPassword,oldPassword) => {
    return {
      type: CHANGE_PASSWORD_SUCCESS,
      newPassword,
      oldPassword
    }
  }
  
  export const getErrorChangePassword = (lastError, hasError) => {
    return {
      type: CHANGE_PASSWORD_FAIL,
      lastError,
      hasError
    }
  }

  export const resetChangePassword = (lastError, hasError) => {
    return {
      type: CHANGE_PASSWORD_DO_RESET,
      lastError,
      hasError
    }
  }
  

  
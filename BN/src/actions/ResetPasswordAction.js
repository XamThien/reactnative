import {
    RESET_PASSWORD_DO_RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_DO_RESET
  } from "./ActionType";
  
  
  export const doResetPassWord = (userMail) => {
    return {
      type: RESET_PASSWORD_DO_RESET_PASSWORD,
      userMail
    }
  }
  
  export const isResetPassWord = (userMail) => {
    return {
      type: RESET_PASSWORD_SUCCESS,
      userMail
    }
  }
  
  export const getErrorResetPassWord = (lastError, hasError) => {
    return {
      type: RESET_PASSWORD_FAIL,
      lastError,
      hasError
    }
  }

  export const resetResetPassword = (lastError, hasError) => {
    return {
      type: RESET_PASSWORD_DO_RESET,
      lastError,
      hasError
    }
  }
  

  
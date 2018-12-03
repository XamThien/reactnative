import {
    REGISTER_DO_REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_RESET_REGISTER
  } from "./ActionType";
  
  
  export const doRegister = (userData) => {
    return {
      type: REGISTER_DO_REGISTER,
      userData
    }
  }
  
  export const registerSuccess = (userData) => {
    return {
      type: REGISTER_SUCCESS,
      userData
    }
  }
  
  export const registerFail = (lastError, hasError) => {
    return {
      type: REGISTER_FAIL,
      lastError,
      hasError
    }
  }

  export const resetRegister = (lastError, hasError) => {
    return {
      type: REGISTER_RESET_REGISTER,
      lastError,
      hasError
    }
  }
  

  
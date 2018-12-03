import {
    LOGIN_DO_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_RESET_LOGIN
  } from "./ActionType";
  
  
  export const doLoginUserName = (userData) => {
    return {
      type: LOGIN_DO_LOGIN,
      userData
    }
  }
  
  export const isLogin = (userData) => {
    return {
      type: LOGIN_SUCCESS,
      userData
    }
  }
  
  export const getErrorLogin = (lastError, hasError) => {
    return {
      type: LOGIN_FAIL,
      lastError,
      hasError
    }
  }

  export const resetLogin = (lastError, hasError) => {
    return {
      type: LOGIN_RESET_LOGIN,
      lastError,
      hasError
    }
  }
  

  
import {
    LOGIN_DO_LOGIN
  } from "./ActionType";
  
  
  export const doLoginUserName = (userData) => {
    return {
      type: LOGIN_DO_LOGIN,
      userData
    }
  }
  

  
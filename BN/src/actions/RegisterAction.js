import {
    REGISTER_DO_REGISTER
  } from "./ActionType";
  
  
  export const doRegister = (userData) => {
    return {
      type: REGISTER_DO_REGISTER,
      userData
    }
  }
  

  
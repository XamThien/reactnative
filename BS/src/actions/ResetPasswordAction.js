import {
    RESET_PASSWORD_DO_RESET_PASSWORD,
  } from "./ActionType";
  
  
  export const doResetPassWord = (userMail) => {
    return {
      type: RESET_PASSWORD_DO_RESET_PASSWORD,
      userMail
    }
  }


  
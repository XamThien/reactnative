import {
    STARTSCREEN_LOGIN_FACEBOOK,
    STARTSCREEN_LOGIN_GOOGLE,
    STARTSCREEN_CONFIG_LOGIN_GOOGLE
  } from "./ActionType";
  
  
  export const doLoginFacebook = () => {
    return {
      type: STARTSCREEN_LOGIN_FACEBOOK
    }
  }

  
  export const doLoginGoogle = () => {
    return {
      type: STARTSCREEN_LOGIN_GOOGLE
    }
  }

  export const configLoginGoogle =() => {
    return {
      type: STARTSCREEN_CONFIG_LOGIN_GOOGLE,
    }
  }
  
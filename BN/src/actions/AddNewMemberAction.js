import {
    MODAL_NAME_ADD_NEW_MEMBER,
    MODAL_NAME_ADD_NEW_MEMBER_SUCCESS,

  } from "./ActionType";
  
  
  export const addNewMember = (dataNewUser) => {
    return {
      type: MODAL_NAME_ADD_NEW_MEMBER,
      dataNewUser
    }
  }
  
  export const addNewMemberSuccess = (dataNewUser) => {
    return {
      type: MODAL_NAME_ADD_NEW_MEMBER_SUCCESS,
      dataNewUser
    }
  }
  export const addNewMemberFail = (error) => {
    return {
      type: MODAL_NAME_ADD_NEW_MEMBER_SUCCESS,
      error
    }
  }

  export const addNewMemberReset = () => {
    return {
      type: MODAL_NAME_ADD_NEW_MEMBER_SUCCESS,
      
    }
  }
  
  
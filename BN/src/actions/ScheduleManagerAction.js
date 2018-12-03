import {
    SCHEDULE_MANAGER_DELETE_APPOINT,
    SCHEDULE_MANAGER_GET_LIST_APPOINT,
    
  } from "./ActionType";
  
  
  export const doDeleteAppoint = (dataAppoint) => {
    return {
      type: SCHEDULE_MANAGER_DELETE_APPOINT,
      dataAppoint
    }
  }

  export const doGetListDataAppoint = () => {
    return {
      type: SCHEDULE_MANAGER_GET_LIST_APPOINT
    }
  }
  
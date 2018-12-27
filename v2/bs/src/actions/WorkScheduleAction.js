import {
    WORK_SCHEDULE_LOAD_DATA
    } from "./ActionType";
    
    
  export const loadDataWorkSchedule = (date) => {
      return {
        type: WORK_SCHEDULE_LOAD_DATA,
        date
      }
  }
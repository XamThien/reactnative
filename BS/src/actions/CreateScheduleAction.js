import {
    CREATE_SCHEDULE_CREATE_DATA
    } from "./ActionType";
    
    
    export const saveDataCreateSchedule = (dataSchedule) => {
      return {
        type: CREATE_SCHEDULE_CREATE_DATA,
        dataSchedule
      }
    }
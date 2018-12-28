import {
    CREATE_SCHEDULE_CREATE_DATA,
    CREATE_SCHEDULE_GEN_TIME
    } from "./ActionType";
    
    
    export const saveDataCreateSchedule = (dataSchedule) => {
      return {
        type: CREATE_SCHEDULE_CREATE_DATA,
        dataSchedule
      }
    }

    export const onGenerateTimeSchedule = (dataSchedule) => {
      return {
        type: CREATE_SCHEDULE_GEN_TIME,
        dataSchedule
      }
    }
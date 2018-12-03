import {
    WORK_SCHEDULE_LOAD_DATA,
    WORK_SCHEDULE_LOAD_ALL_PATIENTS
    } from "./ActionType";
    
    
  export const loadDataWorkSchedule = (date) => {
      return {
        type: WORK_SCHEDULE_LOAD_DATA,
        date
      }
  }

  export const loadAllPatients = () => {
    return {
      type: WORK_SCHEDULE_LOAD_ALL_PATIENTS,
      
    }
}
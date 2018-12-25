import {
    DOCTOR_INFO_MANAGER_DO_GET_DATA,
    DOCTOR_INFO_MANAGER_DO_UPDATE_DATA,
  } from "./ActionType";
  
  export const doGetDoctorInfo = () => {
    return {
      type: DOCTOR_INFO_MANAGER_DO_GET_DATA,
    }
  }
  
  export const doUpdateDoctorInfo = (doctorData) => {
    return {
      type: DOCTOR_INFO_MANAGER_DO_UPDATE_DATA,
      doctorData
    }
  }

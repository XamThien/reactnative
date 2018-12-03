import {
    APPOINTMENT_CLICK_ITEM_TIME,
    APPOINTMENT_CLICK_ITEM_CONSULT_TYPE,
    APPOINTMENT_SET_DATA_USERNAME,
    APPOINTMENT_SAVE_DATA_APPOINTMENT,
    APPOINTMENT_RESET_DATA,
    APPOINTMENT_GET_DATA_SCHEDULE,

    VIDEO_CALL_SEND_MESSAGE

  } from "./ActionType";

  export const onClickItemTime = (timeID, oldDataTimes) =>{
      return {
        type: APPOINTMENT_CLICK_ITEM_TIME,
        timeID,
        oldDataTimes
      }
  }

  export const onClickItemConsultType = (typeName, typeId) =>{
    return {
      type: APPOINTMENT_CLICK_ITEM_CONSULT_TYPE,
        typeName,
        typeId
    }
}

export const onSetDataUserName = (userName) =>{
  return {
    type: APPOINTMENT_SET_DATA_USERNAME,
    userName
  }
}

export const onSaveDataAppointment = (appointData) =>{
    return {
        type: APPOINTMENT_SAVE_DATA_APPOINTMENT,
        appointData
    }
}

export const onResetDataAppointment = (appointData) =>{
  return {
      type: APPOINTMENT_SAVE_DATA_APPOINTMENT,
      appointData
  }
}

export const onGetDataAppointmentSchedule = (doctor_id, date) =>{
  return {
    type: APPOINTMENT_GET_DATA_SCHEDULE,
    doctor_id,
    date
  }
}

export const onResetAllAppointment = () =>{
  return {
      type: APPOINTMENT_RESET_DATA
  }
}

export const onSendMessage = (userFriend, message) => {
  return {
    type: VIDEO_CALL_SEND_MESSAGE,
    userFriend, 
    message
  };
};
  
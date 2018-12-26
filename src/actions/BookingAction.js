import {
    BOOKING_CLICK_ITEM_TIME,
    BOOKING_CLICK_ITEM_CONSULT_TYPE,
    BOOKING_SET_DATA_USERNAME,
    BOOKING_SAVE_DATA_APPOINTMENT,
    BOOKING_RESET_DATA,
    BOOKING_GET_DATA_SCHEDULE,

    VIDEO_CALL_SEND_MESSAGE

  } from "./ActionType";

  export const onClickItemTime = (timeID, oldDataTimes) =>{
      return {
        type: BOOKING_CLICK_ITEM_TIME,
        timeID,
        oldDataTimes
      }
  }

  export const onClickItemConsultType = (typeName, typeId) =>{
    return {
      type: BOOKING_CLICK_ITEM_CONSULT_TYPE,
        typeName,
        typeId
    }
}

export const onSetDataUserName = (userName) =>{
  return {
    type: BOOKING_SET_DATA_USERNAME,
    userName
  }
}

export const onSaveDataAppointment = (appointData) =>{
    return {
        type: BOOKING_SAVE_DATA_APPOINTMENT,
        appointData
    }
}

export const onResetDataAppointment = (appointData) =>{
  return {
      type: BOOKING_SAVE_DATA_APPOINTMENT,
      appointData
  }
}

export const onGetDataAppointmentSchedule = (doctor_id, date) =>{
  return {
    type: BOOKING_GET_DATA_SCHEDULE,
    doctor_id,
    date
  }
}

export const onResetAllAppointment = () =>{
  return {
      type: BOOKING_RESET_DATA
  }
}

export const onSendMessage = (userFriend, message) => {
  return {
    type: VIDEO_CALL_SEND_MESSAGE,
    userFriend, 
    message
  };
};
  
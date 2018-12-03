import {
    SCHEDULE_LOAD_USER_FROFILE,
    EXAMINATION_SCHEDULE_LOAD_LIST_APPOINT,
    EXAMINATION_SCHEDULE_LOAD_USER_APPOINT,
    EXAMINATION_SCHEDULE_UPDATE_STATUS,
    VIDEO_CALL_SEND_MESSAGE
   
} from "./ActionType";


export const fetchUserProfile = () => {
    return {
        type: SCHEDULE_LOAD_USER_FROFILE
    }
}

export const loadListDataAppoint = (date, typeLoad) => {
    return {
        type: EXAMINATION_SCHEDULE_LOAD_LIST_APPOINT,
        date,
        typeLoad
    }
}

export const loadListUserAppoint = () => {
    return {
        type: EXAMINATION_SCHEDULE_LOAD_USER_APPOINT
    }
}

export const updateStatusAppoint = (appointment_id, status, date) => {
    return {
        type: EXAMINATION_SCHEDULE_UPDATE_STATUS,
        appointment_id,
        status,
        date
    }
}

export const onSendMessage = (userFriend, message) => {
    return {
      type: VIDEO_CALL_SEND_MESSAGE,
      userFriend, 
      message
    };
};



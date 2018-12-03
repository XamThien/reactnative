import {
    FETCH_ALL_DATA_SPECIALIZED,
    SCHEDULE_LOAD_USER_FROFILE,
    SCHEDULE_PRESS_SELECT_DATE,
    SCHEDULE_PRESS_SELECT_IMMEDIATELY,
    FIND_DOCTOR_BY_ID
} from "./ActionType";


export const fetchDataSpecialized = () => {
    return {
        type: FETCH_ALL_DATA_SPECIALIZED
    }
}


export const findDoctorByID = (specID,typeSearch ,timeStamp) => {
    return {
        type: FIND_DOCTOR_BY_ID,
        specID,
        typeSearch,
        timeStamp
    }
}

export const findDataByDate = (specID, date) => {
    return {
        type: SCHEDULE_PRESS_SELECT_DATE,
        specID,
        date
    }
}

export const findDataImmediately = (specID, date, time) => {
    return {
        type: SCHEDULE_PRESS_SELECT_IMMEDIATELY,
        specID,
        date,
        time
    }
}

export const fetchUserProfile = () => {
    return {
        type: SCHEDULE_LOAD_USER_FROFILE
    }
}



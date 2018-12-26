import {
    FETCH_ALL_DATA_SPECIALIZED,
    DOCTORLIST_LOAD_USER_FROFILE,
    DOCTORLIST_PRESS_SELECT_DATE,
    DOCTORLIST_PRESS_SELECT_IMMEDIATELY,
    FIND_DOCTOR_BY_SPEC_ID
} from "./ActionType";


export const fetchDataSpecialized = () => {
    return {
        type: FETCH_ALL_DATA_SPECIALIZED
    }
}


export const findDoctorBySpecID = (specID,typeSearch ,timeStamp) => {
    return {
        type: FIND_DOCTOR_BY_SPEC_ID,
        specID,
        typeSearch,
        timeStamp
    }
}

export const findDataByDate = (specID, date) => {
    return {
        type: DOCTORLIST_PRESS_SELECT_DATE,
        specID,
        date
    }
}

export const findDataImmediately = (specID, date, time) => {
    return {
        type: DOCTORLIST_PRESS_SELECT_IMMEDIATELY,
        specID,
        date,
        time
    }
}

export const fetchUserProfile = () => {
    return {
        type: DOCTORLIST_LOAD_USER_FROFILE
    }
}



import {
    FETCH_ALL_DATA_SPECIALIZED,
    FETCH_SPACIALIZED_SUCCESS,
    FETCH_DOCTOR_SUCCESS,
    FETCH_SPACIALIZED_FAIL,
    FETCH_DOCTOR_FAIL,
    SCHEDULE_LOAD_USER_FROFILE,
    SCHEDULE_LOAD_USER_FROFILE_SUCCESS,
    SCHEDULE_PRESS_SELECT_DATE,
    SCHEDULE_PRESS_SELECT_IMMEDIATELY,

    SCHEDULE_MESSAGE_EVENTS_CALLBACK,

} from "../actions/ActionType";

//Saga effects
import {put, takeLatest, all} from 'redux-saga/effects';
import {Api} from './Api';
import Constants from "../commons/Constants";
import {AsyncStorage} from "react-native";
import {convertDateToMillisecond, getCurrentDate, getCurrentTime} from  "../utils/Utils"
import {Translate} from "../utils/Language";
import DefineKey from "../config/language/DefineKey";
var defaulSpeciality= "TẤT CẢ CHUYÊN NGÀNH";

function* fetchAllSpecialized() {
    try {
        const response = yield Api.doGetSpecialityApi();
        if (response != null && response.data != null) {
            let firstSpecialized = {id: "1", name: defaulSpeciality};
            let dataRespone = response.data;
            dataRespone.unshift(firstSpecialized);
            console.log(`fetchAllSpecialized response data...${JSON.stringify(dataRespone)}`);

            yield put({ type: FETCH_SPACIALIZED_SUCCESS, dataSpecialized: dataRespone});
            yield put({type : SCHEDULE_PRESS_SELECT_IMMEDIATELY, specID: 1, typeSearch: 0, date: getCurrentDate(), time: getCurrentTime() });
        } else {
            let error =  Translate(DefineKey.Schedule_error_get_speciality)
            yield put({type: FETCH_SPACIALIZED_FAIL, lastError: error});
        }
    } catch (error) {
        yield put({type: FETCH_SPACIALIZED_FAIL, lastError:error});
    }
}

export function* watchFetchAllSpecialized() {
    yield takeLatest(FETCH_ALL_DATA_SPECIALIZED, fetchAllSpecialized);
}

//get data user profile, facebook, google, server
function* fetchUserProfiles() {
    try {
        const result = yield getUserProfile();
        console.log(`nvTien-data fetchUserProfiles.... ${JSON.stringify(result)}`);
        yield put({type: SCHEDULE_LOAD_USER_FROFILE_SUCCESS, userProfiles: result});
    } catch (error) {

    }
}

export function* watchFetchUserProfiles() {
    yield takeLatest(SCHEDULE_LOAD_USER_FROFILE, fetchUserProfiles);
}

function* findDataDoctorByDate(action) {
    let input = {...action, specID: 1, typeSearch: 1};
    const response = yield Api.doGetDataDoctorApi(input);
    if (response != null && response.data != null) {
        let dataRespone = response.data;
        //const result = yield all(getDataDoctorByDate(dataRespone, action.date));
        yield put({ type: FETCH_DOCTOR_SUCCESS, dataDoctor: dataRespone, specID: action.specID});
        yield put({ type: SCHEDULE_MESSAGE_EVENTS_CALLBACK, actionCallbackDoctor: "SCHEDULE_EVENT_LOAD_DOCTORS_SUCCESS"});
    } else {
        let error =  Translate(DefineKey.Deepcare_error_call_service);
        yield put({type: FETCH_DOCTOR_FAIL, lastError: error});
    }
}

export function* watchFindDoctorByDate() {
    yield takeLatest(SCHEDULE_PRESS_SELECT_DATE, findDataDoctorByDate);
}

function* findDataDoctorImmediately(action) {
    let input = {...action, specID: 1, typeSearch: 0};
    const response = yield Api.doGetDataDoctorImmediatelyApi(input);
    if (response != null && response.data != null) {
        let dataRespone = response.data;
        const result = yield all(getDataDoctorImmediately(dataRespone, action.date));
        yield put({ type: FETCH_DOCTOR_SUCCESS, dataDoctor: result, specID: action.specID});
        yield put({ type: SCHEDULE_MESSAGE_EVENTS_CALLBACK, actionCallbackDoctor: "SCHEDULE_EVENT_LOAD_DOCTORS_SUCCESS"});
    } else {
        let error =  Translate(DefineKey.Deepcare_error_call_service)
        yield put({type: FETCH_DOCTOR_FAIL, lastError: error});
    }
}

export function* watchFindDoctorImmediately() {
    yield takeLatest(SCHEDULE_PRESS_SELECT_IMMEDIATELY, findDataDoctorImmediately);
}


async function getUserProfile() {
    try {
        const value = await AsyncStorage.getItem(Constants.KEY_STORE_USER_PROFILE);
        let profiles = JSON.parse(value);
        return profiles;
    } catch (error) {
        console.log("Error retrieving data" + error);
        return {};
    }
}

function getDataDoctorByDate(responseDoctors, date) {
    //convert date to millisecond
    // get data doctor by id
    var arrDoctors = [];
    if (responseDoctors === undefined || responseDoctors.length == 0) {
        // array empty or does not exist
        return arrDoctors;
    }
    responseDoctors.map(object => {
        if (isExistScheduleDate(date, object)) {
            arrDoctors.push(object);
        }
    });
    return arrDoctors;
}

//check condition schedule date
function isExistScheduleDate(inputDate, objectData) {
    var result = false;
    if (objectData != null && objectData.schedule != null) {
        var schedule = objectData.schedule;
         if (schedule.date === inputDate) {
            result = true;
        }

    }
    return result;
}

//get data examination immediately
function getDataDoctorImmediately(responseDoctors, date) {
    // get data doctor by id
    var arrDoctors = [];
    responseDoctors.map(object => {
        arrDoctors.push(object);
    //    const result = isExistScheduleImmediately(date, object);
    //     if (result) {
    //         arrDoctors.push(object);
    //     }
    });
    return arrDoctors;
}

//check condition immediately
function isExistScheduleImmediately(inputDate, objectData) {
    var result = false;
    if (objectData != null && objectData.schedule != null) {
        var schedule = objectData.schedule;
        
        if (schedule.date === inputDate) {
            //return objectData != null && objectData.isOnline && schedule.isAvailable === true;
            return true;
        }
    }
    return result;
}





import {
    APPOINTMENT_SAVE_DATA_APPOINTMENT,
    APPOINTMENT_SAVE_DATA_SUCCESS,
    APPOINTMENT_SAVE_DATA_FAIL,
    APPOINTMENT_RESET_LOADING,

    APPOINTMENT_GET_DATA_SCHEDULE_SUCCESS,
    APPOINTMENT_GET_DATA_SCHEDULE_FAIL,
    APPOINTMENT_GET_DATA_SCHEDULE
} from "../actions/ActionType";
    //Saga effects
import { put, takeLatest, all } from 'redux-saga/effects';
import {Api} from './Api';
import {Translate} from "../utils/Language";
import DefineKey from "../config/language/DefineKey";


function* saveDataAppointment(action) {
    try {
        yield put({ type: APPOINTMENT_RESET_LOADING});
        const response = yield Api.doSaveDataAppointmentApi(action.appointData);
        console.log(`nvTien - saveDataAppointment data response: ${JSON.stringify(response)}`)
        if (response != null && response.data != null) {
            yield put({ type: APPOINTMENT_SAVE_DATA_SUCCESS, isAvailable: false });
        } else {
            let error =  Translate(DefineKey.Schedule_error_get_speciality)
            yield put({ type: APPOINTMENT_SAVE_DATA_FAIL, lastError: error });
        }
    } catch (error) {
        yield put({type: APPOINTMENT_SAVE_DATA_FAIL, lastError:error});
    }
}
export function* watchSaveDataAppointment() {
    yield takeLatest(APPOINTMENT_SAVE_DATA_APPOINTMENT, saveDataAppointment);
}

//lay thoi gian lich lam viec cua bac si theo ngay
function* loadNewDataAppointment(action) {
    try {
        console.log(`nvTien - loadNewDataAppointment data response.....`)
        yield put({ type: APPOINTMENT_RESET_LOADING});
        const response = yield Api.doGetAppointmentScheduleApi(action);
        console.log(`nvTien - loadNewDataAppointment data response: ${JSON.stringify(response)}`)
        if (response != null && response.data != null) {
            let dataSchedule = response.data;
            yield put({ type: APPOINTMENT_GET_DATA_SCHEDULE_SUCCESS, hasError: false , lastError: "", dataAppoints: dataSchedule});
        } else {
            let error =  Translate(DefineKey.Schedule_error_get_speciality)
            yield put({ type: APPOINTMENT_GET_DATA_SCHEDULE_FAIL, lastError: error, hasError: true, dataSchedule: [] });
        }
    } catch (error) {
        yield put({type: APPOINTMENT_GET_DATA_SCHEDULE_FAIL, lastError:error});
    }
}
export function* watchLoadNewDataAppointment() {
    yield takeLatest(APPOINTMENT_GET_DATA_SCHEDULE, loadNewDataAppointment);
}




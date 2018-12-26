import {
    BOOKING_SAVE_DATA_APPOINTMENT,
    BOOKING_SAVE_DATA_SUCCESS,
    BOOKING_SAVE_DATA_FAIL,
    BOOKING_RESET_LOADING,

    BOOKING_GET_DATA_SCHEDULE_SUCCESS,
    BOOKING_GET_DATA_SCHEDULE_FAIL,
    BOOKING_GET_DATA_SCHEDULE
} from "../actions/ActionType";
    //Saga effects
import { put, takeLatest, all } from 'redux-saga/effects';
import {Api} from './Api';
import {Translate} from "../utils/Language";
import DefineKey from "../config/language/DefineKey";

//lưu dữ liệu lịch đặt hẹn của bệnh nhân
function* saveDataAppointment(action) {
    try {
        yield put({ type: BOOKING_RESET_LOADING});
        const response = yield Api.doSaveDataBookingApi(action.appointData);
        console.log(`nvTien - saveDataAppointment data response: ${JSON.stringify(response)}`)
        if (response != null && response.data != null) {
            yield put({ type: BOOKING_SAVE_DATA_SUCCESS, isAvailable: false });
        } else {
            let error =  Translate(DefineKey.DoctorList_error_get_speciality)
            yield put({ type: BOOKING_SAVE_DATA_FAIL, lastError: error });
        }
    } catch (error) {
        yield put({type: BOOKING_SAVE_DATA_FAIL, lastError:error});
    }
}
export function* watchSaveDataAppointment() {
    yield takeLatest(BOOKING_SAVE_DATA_APPOINTMENT, saveDataAppointment);
}

//lấy lịch làm việc của bác sĩ theo ngày, người dùng chọn khám ngày khác
function* loadDataAppointment(action) {
    try {
        console.log(`nvTien - loadDataAppointment data response.....`)
        yield put({ type: BOOKING_RESET_LOADING});
        const response = yield Api.doGetDataBookingApi(action);
        console.log(`nvTien - loadDataAppointment data response: ${JSON.stringify(response)}`)
        if (response != null && response.data != null) {
            let dataSchedule = response.data;
            yield put({ type: BOOKING_GET_DATA_SCHEDULE_SUCCESS, hasError: false , lastError: "", dataAppoints: dataSchedule});
        } else {
            let error =  Translate(DefineKey.DoctorList_error_get_speciality)
            yield put({ type: BOOKING_GET_DATA_SCHEDULE_FAIL, lastError: error, hasError: true, dataSchedule: [] });
        }
    } catch (error) {
        yield put({type: BOOKING_GET_DATA_SCHEDULE_FAIL, lastError:error});
    }
}
export function* watchLoadNewDataAppointment() {
    yield takeLatest(BOOKING_GET_DATA_SCHEDULE, loadDataAppointment);
}




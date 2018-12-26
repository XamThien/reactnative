import {
    FETCH_ALL_DATA_SPECIALIZED,
    FETCH_SPACIALIZED_SUCCESS,
    FETCH_DOCTOR_SUCCESS,
    FETCH_SPACIALIZED_FAIL,
    FETCH_DOCTOR_FAIL,
    DOCTORLIST_PRESS_SELECT_DATE,
    DOCTORLIST_PRESS_SELECT_IMMEDIATELY,

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

//lấy tất cả danh sách các chuyên ngành hiện có
function* getAllSpecialized() {
    try {
        const response = yield Api.doGetSpecialityApi();
        if (response != null && response.data != null) {
            let firstSpecialized = {id: "1", name: defaulSpeciality};
            let dataRespone = response.data;
            dataRespone.unshift(firstSpecialized);
            console.log(`fetchAllSpecialized response data...${JSON.stringify(dataRespone)}`);

            yield put({ type: FETCH_SPACIALIZED_SUCCESS, dataSpecialized: dataRespone});
            yield put({type : DOCTORLIST_PRESS_SELECT_IMMEDIATELY, specID: 1, typeSearch: 0, date: getCurrentDate(), time: getCurrentTime() });
        } else {
            let error =  Translate(DefineKey.DOCTORLIST_error_get_speciality)
            yield put({type: FETCH_SPACIALIZED_FAIL, lastError: error});
        }
    } catch (error) {
        yield put({type: FETCH_SPACIALIZED_FAIL, lastError:error});
    }
}

export function* watchGetAllSpecialized() {
    yield takeLatest(FETCH_ALL_DATA_SPECIALIZED, getAllSpecialized);
}

//lấy danh sách bác sĩ theo ngày chọn
function* getDataDoctorByDate(action) {
    let input = {...action, specID: 1, typeSearch: 1};
    const response = yield Api.doGetDoctorByDateApi(input);
    if (response != null && response.data != null) {
        let dataRespone = response.data;
        yield put({ type: FETCH_DOCTOR_SUCCESS, dataDoctor: dataRespone, specID: action.specID});
    } else {
        let error =  Translate(DefineKey.Deepcare_error_call_service);
        yield put({type: FETCH_DOCTOR_FAIL, lastError: error});
    }
}

export function* watchGetDoctorByDate() {
    yield takeLatest(DOCTORLIST_PRESS_SELECT_DATE, getDataDoctorByDate);
}

//lấy danh sách bác sĩ khám ngay lập tức
function* getDataDoctorImmediately(action) {
    let input = {...action, specID: 1, typeSearch: 0};
    const response = yield Api.doGetDataDoctorImmediatelyApi(input);
    if (response != null && response.data != null) {
        let dataRespone = response.data;
        yield put({ type: FETCH_DOCTOR_SUCCESS, dataDoctor: dataRespone, specID: action.specID});
    } else {
        let error =  Translate(DefineKey.Deepcare_error_call_service)
        yield put({type: FETCH_DOCTOR_FAIL, lastError: error});
    }
}

export function* watchGetDoctorImmediately() {
    yield takeLatest(DOCTORLIST_PRESS_SELECT_IMMEDIATELY, getDataDoctorImmediately);
}





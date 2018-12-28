import {
    CREATE_SCHEDULE_CREATE_DATA,
    CREATE_SCHEDULE_CREATE_DATA_SUCCESS,
    CREATE_SCHEDULE_CREATE_DATA_FAIL,
    CREATE_SCHEDULE_RESET_DATA,
    CREATE_SCHEDULE_GEN_TIME,
    CREATE_SCHEDULE_GEN_TIME_SUCCESS,
    CREATE_SCHEDULE_GEN_TIME_FAIL,
    CREATE_SCHEDULE_GEN_TIME_RESET

} from "../actions/ActionType";
  //Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import Constants from "../commons/Constants";
import { AsyncStorage } from "react-native";
import {Translate} from "../utils/Language"
import DefineKey from "../config/language/DefineKey";

function* doCreateNewSchedule(action) {
    try {
        yield put({ type: CREATE_SCHEDULE_RESET_DATA});
        const response = yield Api.doCreateWeeklyScheduleApi(action.dataSchedule);
        if (response != null && response.result === Constants.TYPE_RESPONSE_API_CREATED) {
            let dataSchedule = response.data;
            yield put({ type: CREATE_SCHEDULE_CREATE_DATA_SUCCESS, hasError: false , lastError: "", dataSchedule: dataSchedule});
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: CREATE_SCHEDULE_CREATE_DATA_FAIL, lastError: error, hasError: true, dataSchedule: [] });
        }
    } catch (error) {
        let errorText =  Translate(DefineKey.Deepcare_error_call_service)
        yield put({ type: CREATE_SCHEDULE_CREATE_DATA_FAIL, lastError: errorText, hasError: true, dataSchedule: []  });
    }
}
export function* watchDoCreateNewSchedule() { 
    yield takeLatest(CREATE_SCHEDULE_CREATE_DATA, doCreateNewSchedule);
}

function* doGenerateTimeSchedule(action) {
    try {
        console.log(`CreateScheduleSaga - doGenerateTimeSchedule request data = ${JSON.stringify(action.dataSchedule)}`)
        yield put({ type: CREATE_SCHEDULE_GEN_TIME_RESET});
        const response = yield Api.doGenerateTimeScheduleApi(action.dataSchedule);
        if (response != null && response.data != null) {
            let dataTimes = response.data;
            yield put({ type: CREATE_SCHEDULE_GEN_TIME_SUCCESS, hasError: false , lastError: "", dataTimes: dataTimes});
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: CREATE_SCHEDULE_GEN_TIME_FAIL, lastError: error, hasError: true, dataSchedule: [] });
        }
    } catch (error) {
        let errorText =  Translate(DefineKey.Deepcare_error_call_service)
        yield put({ type: CREATE_SCHEDULE_GEN_TIME_FAIL, lastError: errorText, hasError: true, dataSchedule: []  });
    }
}
export function* watchDoGenerateTimeSchedule() { 
    yield takeLatest(CREATE_SCHEDULE_GEN_TIME, doGenerateTimeSchedule);
}








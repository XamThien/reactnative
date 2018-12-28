import {
    WORK_SCHEDULE_LOAD_DATA,
    WORK_SCHEDULE_LOAD_DATA_SUCCESS,
    WORK_SCHEDULE_LOAD_DATA_FAIL, 
    WORK_SCHEDULE_RESET_DATA,

} from "../actions/ActionType";
  //Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import Constants from "../commons/Constants";
import { AsyncStorage } from "react-native";
import {Translate} from "../utils/Language";
import DefineKey from "../config/language/DefineKey";
import {convertMilliToTime, convertDateToMillisecond, isEmptyObject} from "../utils/Utils";
var dataWorkScheduleGlobal = [];
var isLoadScheduleSuccess = false; //biến dùng để kiểm tra trạng thái service schedule, từ đó tắt loading tại service all patients

function* doGetWorkSchedule(action) {
    try {
        yield put({ type: WORK_SCHEDULE_RESET_DATA});
        let dataWorkLocal = loadDataFromLocal(action.date);
        if(!isEmptyObject(dataWorkLocal)) {
            yield put({ type: WORK_SCHEDULE_LOAD_DATA_SUCCESS, isLoading: false,hasError: false , lastError: "", dataWorkSchedule: dataWorkLocal});
            return;
        }
        isLoadScheduleSuccess = false;
        const response = yield Api.doGetWorkScheduleApi(action.date);
        console.log(`doGetWorkSchedule...data response = ${JSON.stringify(response)} `);
        isLoadScheduleSuccess = true;
        if (response != null && response.data != null) {
            let dataSchedule = response.data;
            dataWorkScheduleGlobal.push(dataSchedule);
            yield put({ type: WORK_SCHEDULE_LOAD_DATA_SUCCESS, hasError: false , isLoading: false, lastError: "", dataWorkSchedule: dataSchedule});          
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: WORK_SCHEDULE_LOAD_DATA_FAIL, isLoading: false, lastError: error, hasError: true, dataSchedule: [] });
        }
    } catch (error) {
        let errorText =  Translate(DefineKey.Deepcare_error_call_service)
        yield put({ type: WORK_SCHEDULE_LOAD_DATA_FAIL, isLoading: false, lastError: errorText, hasError: true, dataSchedule: []  });
    }
}
export function* watchDoGetWorkSchedule() { 
    yield takeLatest(WORK_SCHEDULE_LOAD_DATA, doGetWorkSchedule);
}

function loadDataFromLocal(date) {
    let dateMilli = convertDateToMillisecond(date);
    let objectWorkSchedule = {};
    if(dataWorkScheduleGlobal != null && dataWorkScheduleGlobal.length != 0) {
        for(let i = 0 ; i < dataWorkScheduleGlobal.length; i++) {
            let workSchedule = dataWorkScheduleGlobal[i];
            if(workSchedule.date === dateMilli) {
                objectWorkSchedule = workSchedule;
                break;
            }

        }
    } 
    return objectWorkSchedule;
}








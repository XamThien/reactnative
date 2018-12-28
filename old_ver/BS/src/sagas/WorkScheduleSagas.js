import {
    WORK_SCHEDULE_LOAD_DATA,
    WORK_SCHEDULE_LOAD_DATA_SUCCESS,
    WORK_SCHEDULE_LOAD_DATA_FAIL, 
    WORK_SCHEDULE_RESET_DATA,

    WORK_SCHEDULE_LOAD_ALL_PATIENTS,
    WORK_SCHEDULE_LOAD_ALL_PATIENTS_SUCCESS,
    WORK_SCHEDULE_LOAD_ALL_PATIENTS_FAIL,
    WORK_SCHEDULE_MESSAGE_EVENTS_CALLBACK

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
var isFirstGetPatients = false;
var isLoadScheduleSuccess = false; //biến dùng để kiểm tra trạng thái service schedule, từ đó tắt loading tại service all patients

function* doGetWorkSchedule(action) {
    try {
        yield put({ type: WORK_SCHEDULE_RESET_DATA});
        //find data from local, old request
        let dataWorkLocal = loadDataFromLocal(action.date);
        if(!isEmptyObject(dataWorkLocal)) {
            yield put({ type: WORK_SCHEDULE_LOAD_DATA_SUCCESS, isLoading: false,hasError: false , lastError: "", dataWorkSchedule: dataWorkLocal});
            return;
        }
        isLoadScheduleSuccess = false;
        const response = yield Api.doWorkScheduleApi(action.date);
        console.log(`doCreateDataSchedule...data response = ${JSON.stringify(response)} `);
        isLoadScheduleSuccess = true;
        if (response != null && response.data != null) {
            let dataSchedule = response.data;
            dataWorkScheduleGlobal.push(dataSchedule);
            yield put({ type: WORK_SCHEDULE_LOAD_DATA_SUCCESS, hasError: false , isLoading: !isFirstGetPatients, lastError: "", dataWorkSchedule: dataSchedule});          
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: WORK_SCHEDULE_LOAD_DATA_FAIL, isLoading: !isFirstGetPatients, lastError: error, hasError: true, dataSchedule: [] });
        }
    } catch (error) {
        let errorText =  Translate(DefineKey.Deepcare_error_call_service)
        yield put({ type: WORK_SCHEDULE_LOAD_DATA_FAIL, isLoading: !isFirstGetPatients, lastError: errorText, hasError: true, dataSchedule: []  });
    }
}
export function* watchDoGetWorkSchedule() { 
    yield takeLatest(WORK_SCHEDULE_LOAD_DATA, doGetWorkSchedule);
}

function* doAllPatients() {
    try {
        console.log("nvTien - WorkScheduleSaga doAllPatients...");
        //find data from local, old request
        const response = yield Api.doGetAllPatientApi();
        //console.log(`doAllPatients...data response = ${JSON.stringify(response)} `);
        isFirstGetPatients = true;
        var isShowLoading = false;
        if(isLoadScheduleSuccess) {
            isShowLoading = true;
        }
        if (response != null && response.data != null) {
            let dataResponse = response.data;
            yield put({ type: WORK_SCHEDULE_LOAD_ALL_PATIENTS_SUCCESS, dataPatients: dataResponse, isLoading: isShowLoading});
            yield put ({type: WORK_SCHEDULE_MESSAGE_EVENTS_CALLBACK, callbackPatient: "WORK_SCHEDULE_MESSAGE_UPDATE_PATIENTS"});
            console.log(`doAllPatients...end Send message WORK_SCHEDULE_MESSAGE_EVENTS_CALLBACK....  `);
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: WORK_SCHEDULE_LOAD_ALL_PATIENTS_FAIL, lastError: error, hasError: true, dataSchedule: [], isLoading: isShowLoading });
            console.log(`doAllPatients...error...  `);
        }
    } catch (error) {
        console.log(`doAllPatients...error catch...  ` + error);
        let isShowLoading = false;
        if(isLoadScheduleSuccess) {
            isShowLoading = true;
        }
        let errorText =  Translate(DefineKey.Deepcare_error_call_service)
        yield put({ type: WORK_SCHEDULE_LOAD_ALL_PATIENTS_FAIL, lastError: errorText, hasError: true, dataSchedule: [], isLoading: isShowLoading  });
    }
}
export function* watchAllPatients() { 
    yield takeLatest(WORK_SCHEDULE_LOAD_ALL_PATIENTS, doAllPatients);
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








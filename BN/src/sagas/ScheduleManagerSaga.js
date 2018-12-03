import {
    SCHEDULE_MANAGER_DELETE_APPOINT,
    SCHEDULE_MANAGER_GET_LIST_APPOINT,
    SCHEDULE_MANAGER_GET_LIST_APPOINT_SUCCESS,
    SCHEDULE_MANAGER_GET_LIST_APPOINT_FAIL,
    SCHEDULE_MANAGER_RESET_DATA
} from "../actions/ActionType";

    //Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import {Api} from './Api';

function* doGetListDataSchedule() {
    try {
        yield put({type: SCHEDULE_MANAGER_RESET_DATA});
        const response = yield Api.doGetAppointScheduleApi();
       // console.log(`nvTien - doGetListDataSchedule response data = ${JSON.stringify(response)}`);
        if (response != null && response.data != null) {
            let dataRespone = response.data;
            let responseDoctor = yield Api.doGetDoctorAppointScheduleApi();
            if (responseDoctor != null && responseDoctor.data != null) {
                let dataResponseDoctor = responseDoctor.data;
                let dataAppointSchedule = yield mergeDataAppointSchedule(dataRespone, dataResponseDoctor);
                console.log(`nvTien - ScheduleManagerSaga doGetListDataSchedule data AFTER MERGE... ${JSON.stringify(dataAppointSchedule)}`);
                yield put({ type: SCHEDULE_MANAGER_GET_LIST_APPOINT_SUCCESS, dataAppointSchedule: dataAppointSchedule }); 

            }
             
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: SCHEDULE_MANAGER_GET_LIST_APPOINT_FAIL, lastError: error });
        }
    } catch (error) {
        yield put({ type: SCHEDULE_MANAGER_GET_LIST_APPOINT_FAIL, lastError: error });
    }
}
export function* watchGetListDataSchedule() { 
    yield takeLatest(SCHEDULE_MANAGER_GET_LIST_APPOINT, doGetListDataSchedule);
}

//merge danh sách lịch hẹn bác sĩ với thông tin bác sĩ theo lịch hẹn
function mergeDataAppointSchedule(dataAppoint, dataDoctorAppoint) {
    console.log("nvTien - mergeDataAppointSchedule...");
    let arrAppointSchedule = [];
    if(dataAppoint.length != 0) {
        for(let i = 0 ; i < dataAppoint.length ; i ++) {
            let objectAppoint = dataAppoint[i];
            let objectInfoDoctor = loadDataDoctorAppoint(dataDoctorAppoint, objectAppoint.doctor_id);
            let objectDoctorAppoint = {
                dataAppoint: objectAppoint,
                dataDoctor: objectInfoDoctor
            }
            arrAppointSchedule.push(objectDoctorAppoint);
        }
    }
    return arrAppointSchedule;

}

//lấy dữ liệu bác sĩ theo doctor_id được get về từ lịch hẹn trước đó
function loadDataDoctorAppoint (dataDoctorAppoint, doctor_id) {
    let dataDoctor = {};
    if(dataDoctorAppoint.length != 0) {
        for(let i = 0 ; i < dataDoctorAppoint.length ; i ++) {
            let objectDoctor = dataDoctorAppoint[i];
            if (objectDoctor.doctor_id === doctor_id) {
                dataDoctor = objectDoctor;
            }
        }
    }
    return dataDoctor;

}




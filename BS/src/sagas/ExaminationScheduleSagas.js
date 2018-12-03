import {
    EXAMINATION_SCHEDULE_LOAD_LIST_APPOINT,
    EXAMINATION_SCHEDULE_LOAD_APPOINT_SUCCESS,
    EXAMINATION_SCHEDULE_LOAD_APPOINT_FAIL,
    EXAMINATION_SCHEDULE_RESET_LIST_APPOINT,
    EXAMINATION_SCHEDULE_LOAD_USER_APPOINT,
    EXAMINATION_SCHEDULE_RESET_LOADING,

    EXAMINATION_SCHEDULE_UPDATE_STATUS,
    EXAMINATION_SCHEDULE_UPDATE_STATUS_SUCCESS,
    EXAMINATION_SCHEDULE_UPDATE_STATUS_FAIL
    
} from "../actions/ActionType";

//Saga effects
import {put, takeLatest, all} from 'redux-saga/effects';
import {Api} from './Api';
import Constants from "../commons/Constants";
import {AsyncStorage} from "react-native";
import {convertDateToMillisecond, getCurrentDate, isEmptyObject} from  "../utils/Utils"
import {Translate} from "../utils/Language";
import DefineKey from "../config/language/DefineKey";

const TYPE_UPDATED = "updated";
const TYPE_UPDATE_STATUS_ACCEPTED = "accept";
const TYPE_UPDATE_STATUS_DECLINE = "cancel";
var dataAppointGlobal = [];

function* getListDataAppoint(action) {
    try {
        yield put({ type: EXAMINATION_SCHEDULE_RESET_LOADING, hasError: false , lastError: undefined});
        console.log("nvTien - ExaminationScheduleSaga getListDataAppoint date: " + action.date);
        //get data from data global, for call previous
        //if existed return result, else call new api
        let resultDataAppoint = yield getDataFromGrobal(action.date, action.typeLoad);
        if(!isEmptyObject(resultDataAppoint)) {
            console.log(`nvTien - ExaminationScheduleSaga getListDataAppoint get local data: ${JSON.stringify(resultDataAppoint)} ` + action.date);
            yield put({ type: EXAMINATION_SCHEDULE_LOAD_APPOINT_SUCCESS, hasError: false , 
                lastError: "", dataAppoint: resultDataAppoint});
            return;
        }
       // yield var dateMilli = convertDateToMillisecond(action.date);
        const response = yield Api.doGetListAppointApi(action.date);
        console.log(`getListDataAppoint...data response = ${JSON.stringify(response)} `);
        if (response != null && response.data != null) {
            let dataRespone = response.data;
            const responseUserAppoint = yield Api.doGetListUserAppointApi(action.date);
            if (responseUserAppoint != null && responseUserAppoint.data != null) {
                var dataUserRespone = responseUserAppoint.data;
                let dataMergeAppoint = yield mergeDataAppoint(dataRespone, dataUserRespone, action.date);
                
                yield put({ type: EXAMINATION_SCHEDULE_LOAD_APPOINT_SUCCESS, hasError: false , 
                lastError: "", dataAppoint: dataMergeAppoint});

            } else {
                let error =  Translate(DefineKey.Deepcare_error_call_service)
                yield put({ type: EXAMINATION_SCHEDULE_LOAD_APPOINT_FAIL, lastError: error, hasError: true });
            }
        } else {
            console.log("nvTien - ExaminationScheduleSaga error call api: ");
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: EXAMINATION_SCHEDULE_LOAD_APPOINT_FAIL, lastError: error, hasError: true });
        }
    } catch (error) {
        console.log("nvTien - ExaminationScheduleSaga error catch: " + error);
        let errorText =  Translate(DefineKey.Deepcare_error_call_service)
        yield put({ type: EXAMINATION_SCHEDULE_LOAD_APPOINT_FAIL, lastError: errorText, hasError: true  });
    }
}

export function* watchGetListDataAppoint() {
    yield takeLatest(EXAMINATION_SCHEDULE_LOAD_LIST_APPOINT, getListDataAppoint);
}

function* updateStatusAppoint(action) {
    try {
        yield put({ type: EXAMINATION_SCHEDULE_RESET_LOADING, hasError: false , lastError: undefined});
       
       // yield var dateMilli = convertDateToMillisecond(action.date);
        const response = yield Api.doUpdateStatusAppointApi(action);
        console.log(`updateStatusAppoint...data response = ${JSON.stringify(response)} `);
        if (response != null && response.result != null && response.result === TYPE_UPDATED) {
            let responseAppoint = yield getDataGrobalUpdateStatus(action.date, action.appointment_id, action.status);
            yield put({ type: EXAMINATION_SCHEDULE_LOAD_APPOINT_SUCCESS, hasError: false , 
                lastError: "", dataAppoint: responseAppoint});
            
        } else {
            //get old data for reload list
            let resultDataAppoint = yield getDataFromGrobal(action.date);
            if(!isEmptyObject(resultDataAppoint)) {
                console.log(`nvTien - ExaminationScheduleSaga getListDataAppoint get local data: ${JSON.stringify(resultDataAppoint)} ` + action.date);
                yield put({ type: EXAMINATION_SCHEDULE_LOAD_APPOINT_SUCCESS, hasError: false , 
                    lastError: "", dataAppoint: resultDataAppoint});
            }

            console.log("nvTien - ExaminationScheduleSaga error call api: ");
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: EXAMINATION_SCHEDULE_LOAD_APPOINT_FAIL, lastError: error, hasError: true });
        }
    } catch (error) {
        console.log("nvTien - ExaminationScheduleSaga error catch: " + error);
        let errorText =  Translate(DefineKey.Deepcare_error_call_service)
        yield put({ type: EXAMINATION_SCHEDULE_LOAD_APPOINT_FAIL, lastError: errorText, hasError: true  });
    }
}

export function* watchUpdateStatusAppoint() {
    yield takeLatest(EXAMINATION_SCHEDULE_UPDATE_STATUS, updateStatusAppoint);
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

function getDataFromGrobal(inputDate, typeLoad) {
    let dateMilli = convertDateToMillisecond(inputDate);
    let objectResult = {};
    if(typeLoad === Constants.TYPE_REFRESH_DATA_APPOINT) {
        return objectResult;
    }
    if (dataAppointGlobal != null && dataAppointGlobal != undefined && dataAppointGlobal.length != 0) {
        for (let i = 0 ; i < dataAppointGlobal.length ; i++) {
            let dataAppoint = dataAppointGlobal[i];
            if(dataAppoint.date === dateMilli) {
               objectResult = dataAppoint;
               break; 
            }
        }
    }
    return objectResult;

}

//update trạng thái của dữ liệu cũ, sau khi gọi service update status thành công
function getDataGrobalUpdateStatus(inputDate, appointment_id, status) {
    let convertStatus = Constants.TYPE_CALL_NOW;
    if(status === Constants.TYPE_UPDATE_STATUS_ACCEPTED) {
        convertStatus =  Constants.TYPE_CALL_NOW;
    } else {
        convertStatus =  Constants.TYPE_DECLINE;
    }
    console.log("nvTien - getDataGrobalUpdateStatus status: " + status + " convertStatus: " + convertStatus);

    let dateMilli = convertDateToMillisecond(inputDate);
    let objectResult = {};
    if (dataAppointGlobal != null && dataAppointGlobal != undefined && dataAppointGlobal.length != 0) {
        for (let i = 0 ; i < dataAppointGlobal.length ; i++) {
            let dataAppoint = dataAppointGlobal[i];
            if(dataAppoint.date === dateMilli) { 
               objectResult = dataAppoint;
               break;
            }
        }
    }
    console.log(`nvTien - getDataGrobalUpdateStatus data before convert: ${JSON.stringify(objectResult)}`)
    let result = updateStatusLocal(convertStatus, appointment_id, objectResult.dataAppoint);
    objectResult = {...objectResult, dataAppoint: result};
    console.log(`nvTien - getDataGrobalUpdateStatus data after convert: ${JSON.stringify(objectResult)}`)
    pushDataToGlobal(objectResult, inputDate);
    return objectResult;

}

function updateStatusLocal(statusUpdate, appointment_id, dataAppoint) {
    if (dataAppoint != null && dataAppoint != undefined && dataAppoint.length != 0) {
        for (let i = 0 ; i < dataAppoint.length ; i++) {
            let objectAppoint = dataAppoint[i];
            if(objectAppoint.appointment_id === appointment_id) { 
                dataAppoint[i].status = statusUpdate;
               break; 
            }
        }
    }
    return dataAppoint;
}

 function mergeDataAppoint(dataAppoint, dataUserAppoint, inputDate) {
    var mergeDataAppoint = [];
    if(dataAppoint != null && dataAppoint != undefined && dataAppoint.length != 0) {
        for(let i = 0 ; i < dataAppoint.length ; i++) {
            let objectAppoint = dataAppoint[i];
            let objectUser = findUserFromList(dataUserAppoint, objectAppoint.user_id);
            objectAppoint = {...objectAppoint, dataUser: objectUser};
            mergeDataAppoint.push(objectAppoint);
        }
    }
    let objectTime = dataUserAppoint[0];
    var datAppointModel = {
        dataAppoint: mergeDataAppoint,
        start_time_am: objectTime.start_time_am,
        end_time_am: objectTime.end_time_am,
        start_time_pm: objectTime.start_time_pm,
        end_time_pm: objectTime.end_time_pm,
        date: convertDateToMillisecond(inputDate)

    };
    pushDataToGlobal(datAppointModel, inputDate);
    console.log(`nvTien-mergeDataAppoint dataAppointGlobal ... = ${JSON.stringify(dataAppointGlobal)} `)
    return datAppointModel;
}

//cập nhật dữ liệu mới lấy về vào mảng local, nếu id đã tồn tại thì update, nếu id mới thì push mới vào.
function pushDataToGlobal(dataAppoint, date) {
    if(dataAppointGlobal == null || dataAppointGlobal.length == 0) {
        dataAppointGlobal.push(dataAppoint);
    } else {
        let resultAppoint = dataAppoint;
        let dateMilli = convertDateToMillisecond(date);
        //kiem tra sự tồn tại của dữ liệu trong mảng global, nếu tồn tại thì xoá cái cũ và update
        for(let i = 0 ; i < dataAppointGlobal.length ; i++) {
            let objectAppoint = dataAppointGlobal[i];
            if (objectAppoint.date === dateMilli) {
                //xoá dữ liệu trong mảng
                dataAppointGlobal.splice(i,1);
            }
        }
        dataAppointGlobal.push(dataAppoint);
    }
    console.log(`nvTien-mergeDataAppoint pushDataToGlobal ... = ${JSON.stringify(dataAppointGlobal)} `)

}



function findUserFromList(dataUserAppoint, inputUserId) {
    let resultUserAppoint = {};
    if(dataUserAppoint != null && dataUserAppoint != undefined && dataUserAppoint.length >= 2) {
        for(let i = 1 ; i < dataUserAppoint.length ; i++) {
            let userAppoint = dataUserAppoint[i];
            //console.log("nvTien - findUserFromList...inputUserId = " + inputUserId + " user_id = " + userAppoint.user_id);
            if(userAppoint.user_id === inputUserId) {
                resultUserAppoint = userAppoint;
                break;
            }
        }
    }
    return resultUserAppoint;

}





import {
    SELECT_NAME_FETCH_NAME,
    SELECT_NAME_FETCH_NAME_SUCCESS,
    SELECT_NAME_FETCH_NAME_FAIL,
    SELECT_NAME_RESET_OLD_DATA
} from "../actions/ActionType";
import {Api} from './Api';
    //Saga effects
import { put, takeLatest, all } from 'redux-saga/effects';
import {Translate} from "../utils/Language";
import DefineKey from "../config/language/DefineKey";

//lấy danh sách thành viên gia đình
function* fetchDataNamesSaga(action) {
    try {
        yield put({type: SELECT_NAME_RESET_OLD_DATA});
        const response = yield Api.doGetListFamilyApi(action.userId);
        console.log(`nvTien -  SelectName saga fetchDataNamesSaga - ${JSON.stringify(response)}`);
        if (response != null && response.data != null) {
            let dataRespone = yield all(formatDataName(response.data));
            console.log(`nvTien -  SelectName saga fetchDataNamesSaga after format - ${JSON.stringify(response)}`);
            yield put({ type: SELECT_NAME_FETCH_NAME_SUCCESS, dataNames: dataRespone});
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service);
            yield put({type: SELECT_NAME_FETCH_NAME_FAIL, lastError: error});
        }
    } catch (error) {
        yield put({type: SELECT_NAME_FETCH_NAME_FAIL, lastError: error});
    }
}

//format dữ liệu trả về, để xử lí hiển thị dưới app
function formatDataName(arrResponse) {
    var arrOutput = [];
    if (arrResponse != null && arrResponse.length !== 0) {
        for (let i = 0 ; i < arrResponse.length ;i ++) {
            let object = arrResponse[i];
            const result = {
                ...object, userName: object.first_name + " " + object.last_name,selected: false
            };
            arrOutput.push(result);
        }
    }
    return arrOutput;
}

export function* watchGetDataNames() { 
    yield takeLatest(SELECT_NAME_FETCH_NAME, fetchDataNamesSaga);
}



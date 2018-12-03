import {
    MODAL_NAME_FETCH_NAME,
    MODAL_NAME_FETCH_NAME_SUCCESS,
    MODAL_NAME_FETCH_NAME_FAIL,
    MODAL_NAME_RESET_OLD_DATA
} from "../actions/ActionType";

import {Api} from './Api';
    //Saga effects
import { put, takeLatest, all } from 'redux-saga/effects';
import {Translate} from "../utils/Language";
import DefineKey from "../config/language/DefineKey";


function* fetchDataNamesSaga(action) {
    try {
        //const response = yield Api.doGetListFamilyApi(action.userId);
        yield put({type: MODAL_NAME_RESET_OLD_DATA});
        const response = yield Api.doGetListFamilyApi(action.userId);
        if (response != null && response.data != null) {
            let dataRespone = yield all(addUserName(response.data));
            yield put({ type: MODAL_NAME_FETCH_NAME_SUCCESS, dataNames: dataRespone});
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service);
            yield put({type: MODAL_NAME_FETCH_NAME_FAIL, lastError: error});
        }
    } catch (error) {
        yield put({type: MODAL_NAME_FETCH_NAME_FAIL, lastError: error});
    }
}

function addUserName(arrResponse) {
    var arrOutput = [];
    if (arrResponse != null && arrResponse.length !== 0) {
        for (let i = 0 ; i < arrResponse.length ;i ++) {
            let object = arrResponse[i];
            const result = {
                ...object, userName: object.firstName + " " + object.lastName,selected: false
            };
            arrOutput.push(result);
        }
    }
    return arrOutput;
}

export function* watchGetDataNames() { 
    yield takeLatest(MODAL_NAME_FETCH_NAME, fetchDataNamesSaga);
}



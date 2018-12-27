import {
    CREATE_SCHEDULE_CREATE_DATA,
    CREATE_SCHEDULE_CREATE_DATA_SUCCESS,
    CREATE_SCHEDULE_CREATE_DATA_FAIL,
    CREATE_SCHEDULE_RESET_DATA,
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
        const response = yield Api.doCreateNewScheduleApi(action.dataSchedule);
        if (response != null && response.data != null && response.result === Constants.TYPE_RESPONSE_API_CREATED) {
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








import {
    // LOGIN_DO_LOGIN,
    // LOGIN_SUCCESS,
    // LOGIN_FAIL,
    // LOGIN_RESET_LOGIN,
    RESET_PASSWORD_DO_RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_DO_RESET
} from "../actions/ActionType";
  //Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import Constants from "../commons/Constants";
import { AsyncStorage } from "react-native";
import {Translate} from "../utils/Language"
import DefineKey from "../config/language/DefineKey";

function* doResetPassword(action) {
    try {
        yield put({ type: RESET_PASSWORD_DO_RESET, hasError: false , lastError: undefined});
        const response = yield Api.doResetPasswordApi(action.userMail);
        if (response.result === "updated") {
            let sucsess =  Translate(DefineKey.RESET_PASSWORD_SUCCSESS_TEXT);
            yield put({ type: RESET_PASSWORD_SUCCESS, hasError: false , lastError: "", messageSuccess: sucsess});
        } else {
            let error =  Translate(DefineKey.RESET_PASSWORD_FALSE_TEXT)
            yield put({ type: RESET_PASSWORD_FAIL, lastError: error, hasError: true });
        }
    } catch (error) {
        let errorText =  Translate(DefineKey.ERROR_CONNECT)
        yield put({ type: RESET_PASSWORD_FAIL, lastError: errorText, hasError: true  });
    }

}
export function* watchDoResetPassword() { 
    yield takeLatest(RESET_PASSWORD_DO_RESET_PASSWORD, doResetPassword);
}



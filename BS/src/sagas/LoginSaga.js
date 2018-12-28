import {
    LOGIN_DO_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_RESET_LOGIN,
} from "../actions/ActionType";
  //Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import Constants from "../commons/Constants";
import { AsyncStorage } from "react-native";
import {Translate} from "../utils/Language"
import DefineKey from "../config/language/DefineKey";

function* doLoginUserData(action) {
    try {
        yield put({ type: LOGIN_RESET_LOGIN, hasError: false , lastError: undefined});
        const response = yield Api.doLoginApi(action.userData);
        console.log(`LoginSaga doLoginUserData...data response = ${JSON.stringify(response)} `);
        if (response != null && response.token != null) {
            yield saveUserProfileLogin(response)
            yield put({ type: LOGIN_SUCCESS, lastError: "", userProfile: response.user});
        } else {
            let error =  Translate(DefineKey.Login_text_login_fail)
            yield put({ type: LOGIN_FAIL, lastError: error, hasError: true });
        }
    } catch (error) {
        let errorText =  Translate(DefineKey.Login_text_login_error_connect)
        yield put({ type: LOGIN_FAIL, lastError: errorText  });
    }

}
export function* watchDoLoginUserData() { 
    yield takeLatest(LOGIN_DO_LOGIN, doLoginUserData);
}

async function saveUserProfileLogin(responseProfile) {
    if(responseProfile !== null) {
        let userProfile = responseProfile.user;
        let token = responseProfile.token;

        saveDataStorage(Constants.KEY_STORE_TOKEN, token);
        saveDataStorage(Constants.KEY_DOCTOR_ID, userProfile.doctor_id); 
        saveDataStorage(Constants.KEY_STORE_USER_PROFILE, JSON.stringify(userProfile));
    
    } 
}

async function saveDataStorage(key,value) {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }







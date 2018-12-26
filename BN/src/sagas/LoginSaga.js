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
        let user = responseProfile.user;
        let token = responseProfile.token;
        let date_birth = user.date_birth == null ? "" : user.date_birth;
        let avata = user.avata == null ? "" : user.avata;

        var profile = {
            userName: user.last_name + " " + user.first_name,
            email: user.email,
            user_id: user.user_id,
            token: token,
            relation:'',
            expire: responseProfile.expires,
            image:"",
            phoneNumber: responseProfile.phone,
            lastName: user.last_name,
            firstName: user.first_name,
            sex: user.sex,
            date_birth: date_birth,
            avata: avata
        }
        saveDataStorage(Constants.KEY_STORE_TOKEN, token);
        saveDataStorage(Constants.KEY_USER_ID, user.user_id); 
        saveDataStorage(Constants.KEY_STORE_USER_PROFILE, JSON.stringify(profile));
    
    } 
}

async function saveDataStorage(key,value) {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }







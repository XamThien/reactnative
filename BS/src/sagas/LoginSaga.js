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
            yield saveUserProfileLogin(response);
            yield put({ type: LOGIN_SUCCESS, hasError: false , lastError: "", userProfile: response.user});
        } else {
            let error =  Translate(DefineKey.Login_text_login_fail)
            yield put({ type: LOGIN_FAIL, lastError: error, hasError: true });
        }
    } catch (error) {
        let errorText =  Translate(DefineKey.Login_text_login_error_connect)
        yield put({ type: LOGIN_FAIL, lastError: errorText, hasError: true  });
    }

}
export function* watchDoLoginUserData() { 
    yield takeLatest(LOGIN_DO_LOGIN, doLoginUserData);
}

async function saveUserProfileLogin(responseProfile) {
    if(responseProfile !== null) {
        let user = responseProfile.user;
        let token = responseProfile.token;
        var profile = {
            first_name:user.first_name,
            last_name: user.last_name,
            userName: user.name,
            age: user.age,
            education: user.education,
            email: user.email,
            id: user.doctor_id,
            token: token,
            expire: responseProfile.expires,
            image:"",
            phoneNumber: user.phone
        }
        saveDataStorage(Constants.KEY_STORE_TOKEN, token);
        saveDataStorage(Constants.KEY_DOCTOR_ID, user.doctor_id);
        //let gettoken = getDataStorage(Constants.KEY_STORE_TOKEN);  
        // let getToken = await AsyncStorage.getItem(Constants.KEY_STORE_TOKEN);  
        // console.log(`saveUserProfileLogin token...` + getToken);   
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

// async function getDataStorage(key) {
//     try {
//         const value = await AsyncStorage.getItem(key);
//         return value;
//     } catch (error) {
//         console.log("Error retrieving data" + error);
//         return {};
//     }
// }





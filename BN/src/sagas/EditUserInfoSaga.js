import {
  USER_MANAGER_UPDATE_USER,
  USER_MANAGER_UPDATE_USER_SUCCESS,
  USER_MANAGER_UPDATE_USER_FAIL,
  USER_MANAGER_UPDATE_USER_RESET,
  EDIT_USER_SUCCESS
} from "../actions/ActionType";

//Saga effects
import { put, takeLatest } from "redux-saga/effects";
import { Api } from "./Api";
import { AsyncStorage } from "react-native";
import Constants from "../commons/Constants";

function* editUserInfo(action) {
  try {
    const response = yield Api.doUpdateUserInfoApi(action.dataNewUser);
    // alert(`from saga ${JSON.stringify(response)}`);
    if (response.result === "updated") {
      yield put({
        type: USER_MANAGER_UPDATE_USER_SUCCESS,
        messageSuccess: "Success"
      });
      const user_new_profile = yield saveUserProfile(action.dataNewUser,action.userOldInfo);
    //   alert(`from saga ${user_new_profile}`);

      yield put({
        type: EDIT_USER_SUCCESS,
        hasError: false,
        lastError: "",
        userProfile: user_new_profile
      });
    } else {
      let error = Translate(DefineKey.Deepcare_error_call_service);
      yield put({ type: USER_MANAGER_UPDATE_USER_FAIL, lastError: error });
    }
  } catch (error) {
    yield put({ type: USER_MANAGER_UPDATE_USER_FAIL, lastError: error });
  }
}
export function* watchUpdateUser() {
  yield takeLatest(USER_MANAGER_UPDATE_USER, editUserInfo);
}

async function saveDataStorage(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error saving data" + error);
  }
}

async function getDataStorage(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("Error getting data" + error);
  }
}

async function saveUserProfile(dataNewUser,userOldInfo) {
  
  var profile = {
    userName: dataNewUser.last_name + " " + dataNewUser.first_name,
    last_name: dataNewUser.last_name,
    first_name: dataNewUser.first_name,
    password: userOldInfo.password,
    email: userOldInfo.email,
    id: userOldInfo.id,
    token: userOldInfo.token,
    relation: "",
    expire: userOldInfo.expires,
    image: dataNewUser.avata,
    phoneNumber: dataNewUser.phone,
    date_birth: dataNewUser.date_birth
  };

  saveDataStorage(Constants.KEY_STORE_USER_PROFILE, JSON.stringify(profile));
  return JSON.stringify(profile);
}

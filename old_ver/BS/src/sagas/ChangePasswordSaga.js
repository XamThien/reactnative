import {
    CHANGE_PASSWORD_DO_CHANGE,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_DO_RESET
  } from "../actions/ActionType";
  //Saga effects
  import { put, takeLatest } from "redux-saga/effects";
  import { Api } from "./Api";
  import Constants from "../commons/Constants";
  import { AsyncStorage } from "react-native";
  import { Translate } from "../utils/Language";
  import DefineKey from "../config/language/DefineKey";
  
  function* doChangePassword(action) {
    try {
      yield put({
        type: CHANGE_PASSWORD_DO_RESET,
        hasError: false,
        lastError: undefined
      });
  
      const response = yield Api.doChangePasswordApi( action.newPassword, action.oldPassword );
      if (response.result === "updated") {
        let sucsess = Translate(DefineKey.CHANGE_PASSWORD_SUCCSESS_TEXT);
        removeDataStorage(Constants.KEY_STORE_TOKEN);
        removeDataStorage(Constants.KEY_DOCTOR_ID);
        removeDataStorage(Constants.KEY_STORE_USER_PROFILE);
        yield put({
          type: CHANGE_PASSWORD_SUCCESS,
          hasError: false,
          lastError: "",
          messageSuccess: sucsess
        });
      } else {
        let error = Translate(DefineKey.CHANGE_PASSWORD_FALSE_TEXT);
        yield put({
          type: CHANGE_PASSWORD_FAIL,
          lastError: error,
          hasError: true
        });
      }
    } catch (error) {
      let errorText = Translate(DefineKey.ERROR_CONNECT);
      yield put({
        type: CHANGE_PASSWORD_FAIL,
        lastError: errorText,
        hasError: true
      });
    }
  }
  export function* watchDoChangePassword() {
    yield takeLatest(CHANGE_PASSWORD_DO_CHANGE, doChangePassword);
  }
  
  async function removeDataStorage(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error removeing data" + error);
    }
  }
  
  async function getDataStorage(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      // Error retrieving data
      console.log("error... " + error.message);
      return null;
    }
  }
  
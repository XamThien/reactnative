import {
    FAMILY_MANAGER_DO_DELETE,
    FAMILY_MANAGER_SUCCESS_DELETE,
    FAMILY_MANAGER_ERROR_DELETE,
    FAMILY_MANAGER_RESERT_DELETE,

    FAMILY_MANAGER_DO_UPDATE,
    FAMILY_MANAGER_SUCCESS_DUPDATE,
    FAMILY_MANAGER_ERROR_UPDATE,
    FAMILY_MANAGER_RESERT_UPDATE
  } from "../actions/ActionType";
  //Saga effects
  import { put, takeLatest } from "redux-saga/effects";
  import { Api } from "./Api";
  import Constants from "../commons/Constants";
  import { AsyncStorage } from "react-native";
  import { Translate } from "../utils/Language";
  import DefineKey from "../config/language/DefineKey";
  
  function* doDeleteMember(action) {
    try {
      yield put({
        type: FAMILY_MANAGER_RESERT_DELETE,
        hasError: false,
        lastError: undefined
      });
  
      const response = yield Api.doDeleteFamilyMemberApi(action.memberID);
      if (response.result === "deleted") {
        let sucsess = Translate(DefineKey.FAMILY_MANAGER_SUCCESS_DELETE_MEMBER_TEXT);

        yield put({
          type: FAMILY_MANAGER_SUCCESS_DELETE,
          hasError: false,
          lastError: "",
          messageSuccess: sucsess
        });
      } else {
        let error = Translate(DefineKey.FAMILY_MANAGER_ERROR_DELETE_MEMBER_TEXT);
        yield put({
          type: FAMILY_MANAGER_ERROR_DELETE,
          lastError: error,
          hasError: true
        });
      }
    } catch (error) {
      let errorText = Translate(DefineKey.ERROR_CONNECT);
      yield put({
        type: FAMILY_MANAGER_ERROR_DELETE,
        lastError: errorText,
        hasError: true
      });
    }
  }
  export function* watchDoDeleteMember() {
    yield takeLatest(FAMILY_MANAGER_DO_DELETE, doDeleteMember);
  }
  
  function* doUpdateMember(action) {
    try {
      yield put({
        type: FAMILY_MANAGER_RESERT_UPDATE,
        hasError: false,
        lastError: undefined
      });
      // alert('saga: '+JSON.stringify(action.dataMember));
      const response = yield Api.doUpdateFamilyMemberApi(action.dataMember);
      if (response.result === "updated") {
        let sucsess = Translate(DefineKey.FAMILY_MANAGER_SUCCESS_UPDATE_MEMBER_TEXT);

        yield put({
          type: FAMILY_MANAGER_SUCCESS_DUPDATE,
          hasError: false,
          lastError: "",
          messageSuccess: sucsess
        });
      } else {
        let error = Translate(DefineKey.FAMILY_MANAGER_ERROR_UPDATE_MEMBER_TEXT);
        yield put({
          type: FAMILY_MANAGER_ERROR_UPDATE,
          lastError: error,
          hasError: true
        });
      }
    } catch (error) {
      let errorText = Translate(DefineKey.ERROR_CONNECT);
      yield put({
        type: FAMILY_MANAGER_ERROR_UPDATE,
        lastError: errorText,
        hasError: true
      });
    }
  }
  export function* watchDoUpdateMember() {
    yield takeLatest(FAMILY_MANAGER_DO_UPDATE, doUpdateMember);
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
  
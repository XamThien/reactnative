import {
  SETTING_NOTIFICATION_GET_DATA,
  SETTING_NOTIFICATION_GET_DATA_SUCCESS,
  SETTING_NOTIFICATION_GET_DATA_FAIL,
  SETTING_NOTIFICATION_SAVE_DATA,
  SETTING_NOTIFICATION_SAVE_DATA_SUCCESS,
  SETTING_NOTIFICATION_SAVE_DATA_FAIL
} from "../actions/ActionType";
//Saga effects
import { put, takeLatest } from "redux-saga/effects";
import { Api } from "./Api";
import Constants from "../commons/Constants";
import { AsyncStorage } from "react-native";
import { Translate } from "../utils/Language";
import DefineKey from "../config/language/DefineKey";

// =====================================get Time setting notification ==============================
function* getTimeSettingSaga(action) {
  try {
    var setting_notify = yield getDataStorage(
      Constants.KEY_STORE_SETTING_NOTIFICATION
    );
    // if (setting_notify !== null) {
    //   yield put({
    //     type: SETTING_NOTIFICATION_GET_DATA_SUCCESS,
    //     setting_notify: JSON.parse(setting_notify)
    //   });
    // } else {
      const response = yield Api.doGetTimeSettingNotificationApi();
      if (response !== null && response.data !== null) {
        let dataResponse = response.data;
        var time = dataResponse[0].notify;
        var setting_notify = {};
        if (time === null) {
          setting_notify = { status: true, time: 5 };
        }
        else {
          setting_notify = { status: true, time: (time / 60000) };
        }
        yield saveDataStorage(Constants.KEY_STORE_SETTING_NOTIFICATION,JSON.stringify(setting_notify));
        alert("From setting notifiy saga:"+JSON.stringify(setting_notify));
        yield put({
          type: SETTING_NOTIFICATION_GET_DATA_SUCCESS,
          setting_notify: setting_notify,
          messageSuccess:""
        });
      } else {
        let error = Translate(DefineKey.ERROR_CONNECT);
        yield put({
          type: SETTING_NOTIFICATION_GET_DATA_FAIL,
          lastError: error
        });
      }
    // }
  } catch (error) {
    yield put({ type: SETTING_NOTIFICATION_GET_DATA_FAIL, lastError: error });
  }
}

export function* watchGetTimeSettingNotification() {
  yield takeLatest(SETTING_NOTIFICATION_GET_DATA, getTimeSettingSaga);
}
// ===================== update time setting notification =============================================
function* updateTimeSettingNotification(action) {
  try {
    const response = yield Api.doUpdateTimeSettingNotificationApi(action.time);
    if (response != null && response.result !== "updated") {
      var setting_notify = {status: action.checked, time: action.time};
      yield saveDataStorage(
        Constants.KEY_STORE_SETTING_NOTIFICATION,
        JSON.stringify(setting_notify)
      );
      
      yield put({
        type: SETTING_NOTIFICATION_SAVE_DATA_SUCCESS,
        messageSuccess: Translate(
          DefineKey.SETTING_NOTIFICATION_SUCCESS_MESSAGE
        ),
        setting_notify: setting_notify,
      });
    } else {
      let error = Translate(DefineKey.SETTING_NOTIFICATION_ERROR_MESSAGE);
      yield put({
        type: SETTING_NOTIFICATION_SAVE_DATA_FAIL,
        lastError: error
      });
    }
  } catch (error) {
    yield put({
      type: SETTING_NOTIFICATION_SAVE_DATA_FAIL,
      lastError: Translate(DefineKey.SETTING_NOTIFICATION_ERROR_MESSAGE)
    });
  }
}
export function* watchUpdateTimeSettingNotification() {
  yield takeLatest(
    SETTING_NOTIFICATION_SAVE_DATA,
    updateTimeSettingNotification
  );
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
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    // Error retrieving data
    console.log("error... " + error.message);
    return null;
  }
}

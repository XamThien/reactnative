import {
    PROFILE_DO_LOGOUT,
} from "../actions/ActionType";

//Saga effects
import {put, takeLatest, all} from 'redux-saga/effects';
import {Api} from './Api';
import Constants from "../commons/Constants";
import {AsyncStorage} from "react-native";


function* doLogoutApp() {
    saveKey("")
}

export function* watchDoLogoutApp() {
    yield takeLatest(PROFILE_DO_LOGOUT, doLogoutApp);
}

async function saveKey(value) {
    try {
        await AsyncStorage.setItem(
            Constants.KEY_STORE_USER_PROFILE,
            JSON.stringify(value)
        );
    } catch (error) {
        console.log("Error saving data" + error);
    }
}




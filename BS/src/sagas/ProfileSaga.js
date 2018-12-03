import {
    PROFILE_DO_LOGOUT,
    PROFILE_LOAD_USER_PROFILE,
    PROFILE_LOAD_USER_PROFILE_SUCCESS
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

//get data user profile, facebook, google, server
function* fetchUserProfiles() {
    try {
        const result = yield getUserProfile();
        yield put({type: PROFILE_LOAD_USER_PROFILE_SUCCESS, userProfiles: result});
    } catch (error) {

    }
}

export function* watchFetchUserProfiles() {
    yield takeLatest(PROFILE_LOAD_USER_PROFILE, fetchUserProfiles);
}

async function getUserProfile() {
    try {
        const value = await AsyncStorage.getItem(Constants.KEY_STORE_USER_PROFILE);
        let profiles = JSON.parse(value);
        return profiles;
    } catch (error) {
        console.log("Error retrieving data" + error);
        return {};
    }
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




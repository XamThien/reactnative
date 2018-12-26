import {
    REGISTER_DO_REGISTER,
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    REGISTER_RESET_REGISTER
  } from "../actions/ActionType";

  //Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import {Translate} from "../utils/Language"
import DefineKey from "../config/language/DefineKey";

function* doRegisterNewMember(action) {
    try {
        yield put({ type: REGISTER_RESET_REGISTER, hasError: false , lastError: undefined});
        console.log("nvTien - Registersaga doregister...");
        const response = yield Api.doRegisterApi(action.userData);
        console.log(`Api doLoginUserData response = ${JSON.stringify(response)}`)
        if (response != null && response.data != null) {
            yield put({ type: REGISTER_SUCCESS, hasError: false , lastError: ""});
        } else {
            let error =  Translate(DefineKey.Register_text_fail_username)
            yield put({ type: REGISTER_FAIL, lastError: error, hasError: true });
        }
    } catch (error) {
        let errorText =  Translate(DefineKey.Register_text_register_fail)
        yield put({ type: REGISTER_FAIL, lastError: errorText, hasError: true });
    }
}


export function* watchDoRegisterNewMember() { 
    yield takeLatest(REGISTER_DO_REGISTER, doRegisterNewMember);
}





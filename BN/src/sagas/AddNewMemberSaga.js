import {
    MODAL_NAME_ADD_NEW_MEMBER,
    MODAL_NAME_ADD_NEW_MEMBER_SUCCESS,
    MODAL_NAME_ADD_NEW_MEMBER_FAIL,
    MODAL_NAME_ADD_NEW_MEMBER_RESET, MODAL_NAME_RESET_OLD_DATA
} from "../actions/ActionType";

    //Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import {Api} from './Api';

function* addNewMember(action) {
    try {
        const response = yield Api.doAddNewMemberFamilyApi(action.dataNewUser);
        if (response != null && response.data != null) {
            let dataRespone = response.data;
            // alert(JSON.stringify(dataRespone));
            yield put({ type: MODAL_NAME_ADD_NEW_MEMBER_SUCCESS, dataNewUser: dataRespone }); 
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: MODAL_NAME_ADD_NEW_MEMBER_FAIL, lastError: error });
        }
    } catch (error) {
        yield put({ type: MODAL_NAME_ADD_NEW_MEMBER_FAIL, lastError: error });
    }
}
export function* watchAddNewMember() { 
    yield takeLatest(MODAL_NAME_ADD_NEW_MEMBER, addNewMember);
}



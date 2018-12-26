import {
    ADD_MEMBER_FAMILY,
    ADD_MEMBER_FAMILY_SUCCESS,
    ADD_MEMBER_FAMILY_FAIL
} from "../actions/ActionType";
    //Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import {Api} from './Api';

function* addMemberFamily(action) {
    try {
        console.log("nvTien - AddMember family saga....")
        const response = yield Api.doAddMemberFamilyApi(action.dataNewUser);
        if (response != null && response.data != null) {
            let dataRespone = response.data;
            yield put({ type: ADD_MEMBER_FAMILY_SUCCESS, dataNewUser: dataRespone }); 
        } else {
            let error =  Translate(DefineKey.Deepcare_error_call_service)
            yield put({ type: ADD_MEMBER_FAMILY_FAIL, lastError: error });
        }
    } catch (error) {
        yield put({ type: ADD_MEMBER_FAMILY_FAIL, lastError: error });
    }
}
export function* watchAddMemberFamily() { 
    yield takeLatest(ADD_MEMBER_FAMILY, addMemberFamily);
}



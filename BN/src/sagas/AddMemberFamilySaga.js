import {
  ADD_MEMBER_FAMILY,
  ADD_MEMBER_FAMILY_SUCCESS,
  ADD_MEMBER_FAMILY_FAIL,

  FAMILY_MANAGER_ADD_NEW_MEMBER_SUCCESS

} from "../actions/ActionType";
//Saga effects
import { put, takeLatest } from "redux-saga/effects";
import Constants from "../commons/Constants";
import { Api } from "./Api";

function* addMemberFamily(action) {
  try {
    console.log("nvTien - AddMember family saga....");
    const response = yield Api.doAddMemberFamilyApi(action.dataNewUser);
    if (response != null && response.data != null) {
      let dataRespone = response.data;
      yield put({ type: ADD_MEMBER_FAMILY_SUCCESS, dataNewUser: dataRespone });
      yield put({ type: FAMILY_MANAGER_ADD_NEW_MEMBER_SUCCESS, dataNewUser: dataRespone }); 
    } else {
      let error = Translate(DefineKey.Deepcare_error_call_service);
      yield put({ type: ADD_MEMBER_FAMILY_FAIL, lastError: error });
    }

    // yield put({ type: FAMILY_MANAGER_LOAD_ALL_RESET_OLD_DATA });
    

  } catch (error) {
    yield put({ type: ADD_MEMBER_FAMILY_FAIL, lastError: error });
  }
}
export function* watchAddMemberFamily() {
  yield takeLatest(ADD_MEMBER_FAMILY, addMemberFamily);
}

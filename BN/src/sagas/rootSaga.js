import { fork, all } from "redux-saga/effects";
import {watchDoLoginUserData} from "./LoginSaga";
import {watchDoRegisterNewMember} from "./RegisterSaga";
import {watchGetAllSpecialized, watchGetDoctorImmediately, watchGetDoctorByDate} from "./DoctorListSagas";
import {watchSaveDataAppointment, watchLoadNewDataAppointment} from "./BookingSaga";
import {watchGetDataNames} from "./SelectNameSaga";
import {watchAddMemberFamily} from "./AddMemberFamilySaga";
import {watchDoDeleteMember, watchDoUpdateMember, watchFamilyAddNewMember, watchGetFamilyMember} from "./FamilyManagerSaga";
import {watchUpdateUser} from "./EditUserInfoSaga";
import {watchDoResetPassword} from "./ResetPasswordSaga";
import {watchDoChangePassword} from "./ChangePasswordSaga";

export default function* rootSaga() {
  yield all([
    fork(watchDoLoginUserData),
    fork(watchDoRegisterNewMember),
    fork(watchGetAllSpecialized),
    fork(watchGetDoctorByDate),
    fork(watchGetDoctorImmediately),
    fork(watchSaveDataAppointment),
    fork(watchLoadNewDataAppointment),
    fork(watchGetDataNames),
    fork(watchAddMemberFamily),
    fork(watchDoDeleteMember),
    fork(watchDoUpdateMember),
    fork(watchFamilyAddNewMember), 
    fork(watchGetFamilyMember),
    fork(watchUpdateUser),
    fork(watchDoResetPassword),
    fork(watchDoChangePassword),
      
  ]);
 
}

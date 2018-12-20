import { fork, all } from "redux-saga/effects";
import {
  watchFetchAllSpecialized,
  watchFetchUserProfiles,
  watchFindDoctorByDate,
  watchFindDoctorImmediately
} from "./ScheduleSagas";
import {watchSaveDataAppointment, watchLoadNewDataAppointment} from "./AppointmentSaga";
import {watchGetDataNames} from "./ModalNameSaga";
import {watchAddNewMember} from "./AddNewMemberSaga";
import {watchLoginFacebookSaga,watchConfigLoginGoogleSaga, watchLoginGoogleSaga} from "./StartScreenSaga";
import {watchDoLogoutApp} from "./ProfileSaga";
import {watchDoLoginUserData} from "./LoginSaga";
import {watchDoRegisterNewMember} from "./RegisterSaga";
import {watchGetListDataSchedule} from "./ScheduleManagerSaga";
import {watchOnCreateSocketRTC, watchOnMakeCall, watchOnFinishCall, 
  watchOnReceiverCall, watchOnChangeLocalStream, watchOnSendMessage, watchOnAddNewFriends,
  watchOnSwitchCamera, watchOnCameraControl, watchOnMicControl, watchOnSoundControl} from "./VideoCallSagas";
import {watchDoResetPassword} from "./ResetPasswordSaga";
import {watchDoChangePassword} from "./ChangePasswordSaga";
import {watchDoDeleteMember, watchDoUpdateMember, watchFamilyAddNewMember, watchGetFamilyMember} from "./FamilyManagerSaga";
import {watchUpdateUser} from "./EditUserInfoSaga";





export default function* rootSaga() {
  yield all([
      fork(watchFetchAllSpecialized),
      fork(watchFetchUserProfiles),
      fork(watchSaveDataAppointment),
      fork(watchLoadNewDataAppointment),
      fork(watchGetDataNames),
      fork(watchAddNewMember),
      fork(watchLoginFacebookSaga),
      fork(watchConfigLoginGoogleSaga),
      fork(watchLoginGoogleSaga),
      fork(watchDoLogoutApp),
      fork(watchDoLoginUserData),
      fork(watchDoRegisterNewMember),
      fork(watchFindDoctorByDate),
      fork(watchFindDoctorImmediately),
      fork(watchGetListDataSchedule),
      fork(watchOnCreateSocketRTC),
      fork(watchOnMakeCall),
      fork(watchOnFinishCall),
      fork(watchOnReceiverCall),
      fork(watchOnChangeLocalStream),
      fork(watchOnSendMessage),
      fork(watchOnAddNewFriends),
      fork(watchOnSwitchCamera),
      fork(watchOnCameraControl),
      fork(watchOnMicControl),
      fork(watchOnSoundControl),
      fork(watchDoResetPassword),
      fork(watchDoChangePassword),
      fork(watchDoDeleteMember),
      fork(watchDoUpdateMember),
      fork(watchFamilyAddNewMember), 
      fork(watchGetFamilyMember),
      fork(watchUpdateUser),



      
  ]);
 
}

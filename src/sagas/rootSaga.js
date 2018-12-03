import { fork, all } from "redux-saga/effects";
import {watchDoLogoutApp, watchFetchUserProfiles} from "./ProfileSaga";
import {watchDoLoginUserData} from "./LoginSaga";
import {watchDoSaveDataSchedule} from "./CreateScheduleSaga";
import {watchGetListDataAppoint, watchUpdateStatusAppoint} from "./ExaminationScheduleSagas";
import {watchDoGetWorkSchedule, watchAllPatients} from "./WorkScheduleSagas";
import {watchOnCreateSocketRTC, watchOnMakeCall, watchOnFinishCall, 
  watchOnReceiverCall, watchOnChangeLocalStream, watchOnSendMessage, watchOnAddNewFriends} from "./VideoCallSagas";


export default function* rootSaga() {
  yield all([
      fork(watchFetchUserProfiles),
      fork(watchDoLogoutApp),
      fork(watchDoLoginUserData),
      fork(watchDoSaveDataSchedule),
      fork(watchGetListDataAppoint),
      fork(watchUpdateStatusAppoint),
      fork(watchDoGetWorkSchedule),
      fork(watchOnCreateSocketRTC),
      fork(watchOnMakeCall),
      fork(watchOnFinishCall),
      fork(watchOnReceiverCall),
      fork(watchOnChangeLocalStream),
      fork(watchOnSendMessage),
      fork(watchOnAddNewFriends),
      fork(watchAllPatients),

      
  ]);
 
}

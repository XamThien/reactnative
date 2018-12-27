import { fork, all } from "redux-saga/effects";
import {watchDoLoginUserData} from "./LoginSaga";
import {watchDoGetWorkSchedule} from "./WorkScheduleSagas";
import {watchDoCreateNewSchedule} from "./CreateScheduleSaga";
import {watchDoGetDoctorInfo, watchDoUpdateDoctorInfo} from "./DoctorInfoManagerSaga";
import {watchGetTimeSettingNotification, watchUpdateTimeSettingNotification} from "./SettingNotificationSaga";


export default function* rootSaga() {
  yield all([
      fork(watchDoLoginUserData),
      fork(watchDoGetWorkSchedule),
      fork(watchDoCreateNewSchedule),
      fork(watchDoGetDoctorInfo),
      fork(watchDoUpdateDoctorInfo),
      fork(watchGetTimeSettingNotification),
      fork(watchUpdateTimeSettingNotification),
     
  ]);
 
}

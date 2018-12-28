import { fork, all } from "redux-saga/effects";
import {watchDoLoginUserData} from "./LoginSaga";
import {watchDoGetWorkSchedule} from "./WorkScheduleSagas";
import {watchDoCreateNewSchedule} from "./CreateScheduleSaga";
import {watchDoGetDoctorInfo, watchDoUpdateDoctorInfo} from "./DoctorInfoManagerSaga";
import {watchGetTimeSettingNotification, watchUpdateTimeSettingNotification} from "./SettingNotificationSaga";
import {watchDoResetPassword} from "./ResetPasswordSaga";
import {watchDoChangePassword} from "./ChangePasswordSaga";
import {watchDoGenerateTimeSchedule} from "./CreateScheduleSaga";
import {watchDoLogoutApp, watchFetchUserProfiles} from "./ProfileSaga";

export default function* rootSaga() {
  yield all([
      fork(watchDoLoginUserData),
      fork(watchDoGetWorkSchedule),
      fork(watchDoCreateNewSchedule),
      fork(watchDoGetDoctorInfo),
      fork(watchDoUpdateDoctorInfo),
      fork(watchGetTimeSettingNotification),
      fork(watchUpdateTimeSettingNotification),
      fork(watchDoResetPassword),
      fork(watchDoChangePassword),
      fork(watchDoGenerateTimeSchedule),
      fork(watchFetchUserProfiles),
      fork(watchDoLogoutApp),


  ]);
 
}

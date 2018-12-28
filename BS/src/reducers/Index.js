import { combineReducers } from "redux";
import {loginReducer} from "./LoginReducer";
import {workScheduleReducers} from "./WorkScheduleReducers";
import {createScheduleReducers} from "./CreateScheduleReducers";
import {doctorInfoManagerReducer} from "./DoctorInfoMangerReducer";
import { settingNotificationReducer } from "./SettingNotificationReducer";
import { resetPasswordReducer } from "./ResetPasswordReducer";
import { changePasswordReducer } from "./ChangePasswordReducer";
import {getProfilesReducers} from "./ProfileReducer";

const allReducers = combineReducers({
    loginReducer,
    workScheduleReducers,
    createScheduleReducers,
    doctorInfoManagerReducer,
    settingNotificationReducer,
    changePasswordReducer,
    resetPasswordReducer,
    getProfilesReducers,

});
export default allReducers;

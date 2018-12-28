import { combineReducers } from "redux";
import {loginReducer} from "./LoginReducer";
import {workScheduleReducers} from "./WorkScheduleReducers";
import {createScheduleReducers} from "./CreateScheduleReducers";
import {doctorInfoManagerReducer} from "./DoctorInfoMangerReducer";
import { settingNotificationReducer } from "./SettingNotificationReducer";
import { resetPasswordReducer } from "./ResetPasswordReducer";
import { changePasswordReducer } from "./ChangePasswordReducer";

const allReducers = combineReducers({
    loginReducer,
    workScheduleReducers,
    createScheduleReducers,
    doctorInfoManagerReducer,
    settingNotificationReducer,
    changePasswordReducer,
    resetPasswordReducer,

});
export default allReducers;

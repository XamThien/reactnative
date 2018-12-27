import { combineReducers } from "redux";
import {loginReducer} from "./LoginReducer";
import {workScheduleReducers} from "./WorkScheduleReducers";
import {createScheduleReducers} from "./CreateScheduleReducers";
import {resultDoctorInfoManagerReducer} from "./DoctorInfoMangerReducer";
import { settingNotificationReducer } from "./SettingNotificationReducer";

const allReducers = combineReducers({
    loginReducer,
    workScheduleReducers,
    createScheduleReducers,
    resultDoctorInfoManagerReducer,
    settingNotificationReducer

});
export default allReducers;

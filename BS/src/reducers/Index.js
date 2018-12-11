import { combineReducers } from "redux";
import {getListAppointReducer } from "./ExaminationScheduleReducers";
import {resultLoginReducer} from "./LoginReducer";
import {createScheduleReducers} from "./CreateScheduleReducers";
import {getProfilesReducers} from "./ProfileReducer";
import {loadWorkScheduleReducers} from "./WorkScheduleReducers";
import {listenerVideocallReducers} from "./VideoCallReducer";
import {resultResetPasswordReducer} from "./ResetPasswordReducer";
import { resultChangePasswordReducer } from "./ChangePasswordReducer";


const allReducers = combineReducers({
    getProfilesReducers,
    getListAppointReducer,
    resultLoginReducer,
    createScheduleReducers,
    loadWorkScheduleReducers,
    listenerVideocallReducers,
    resultResetPasswordReducer,
    resultChangePasswordReducer,

});
export default allReducers;

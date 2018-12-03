import { combineReducers } from "redux";
import {getListAppointReducer } from "./ExaminationScheduleReducers";
import {resultLoginReducer} from "./LoginReducer";
import {createScheduleReducers} from "./CreateScheduleReducers";
import {getProfilesReducers} from "./ProfileReducer";
import {loadWorkScheduleReducers} from "./WorkScheduleReducers";
import {listenerVideocallReducers} from "./VideoCallReducer";


const allReducers = combineReducers({
    getProfilesReducers,
    getListAppointReducer,
    resultLoginReducer,
    createScheduleReducers,
    loadWorkScheduleReducers,
    listenerVideocallReducers

});
export default allReducers;

import { combineReducers } from "redux";
import { specializedReducers, getProfilesReducers } from "./ScheduleReducers";
import {
    saveDataAppointReducer
} from "./AppointmentReducers";
import { getDatatypeReducer } from "./ConsultantTypeReducer";
import {getDataNameReducer} from "./ModalNameReducer";
import {addNewMemberReducer} from "./AddNewMemberReducer";
import {loginSocialReducers} from "./StartScreenReducer";
import {resultLoginReducer} from "./LoginReducer";
import {resultRegisterReducer} from "./RegisterReducer";
import {scheduleManagerReducer} from "./ScheduleManagerReducer";
import {listenerVideocallReducers} from "./VideoCallReducer";

const allReducers = combineReducers({
    specializedReducers,
    getProfilesReducers,
    saveDataAppointReducer,
    getDatatypeReducer,
    getDataNameReducer,
    addNewMemberReducer,
    loginSocialReducers,
    resultLoginReducer,
    resultRegisterReducer,
    scheduleManagerReducer,
    listenerVideocallReducers,

});
export default allReducers;

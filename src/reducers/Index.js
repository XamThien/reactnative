import { combineReducers } from "redux";
import {loginReducer} from "./LoginReducer";
import {registerReducer} from "./RegisterReducer";
import {doctorListReducers} from "./DoctorListReducers";
import {bookingReducers} from "./BookingReducers";
import {addMemberFamilyReducer} from "./AddMemberFamilyReducer";
import {selectDiseaseReducer} from "./SelectDiseaseReducer";
import {selectNameReducer} from "./SelectNameReducer";
import { settingNotificationReducer } from "./SettingNotificationReducer";
import { familyManagerReducer } from "./FamilyManagerReducer";
import {editUserInfoReducer} from "./EditUserInfoReducer.js";
import {resetPasswordReducer} from "./ResetPasswordReducer";
import { changePasswordReducer } from "./ChangePasswordReducer";

const allReducers = combineReducers({
    loginReducer,
    registerReducer,
    doctorListReducers,
    bookingReducers,
    addMemberFamilyReducer,
    selectDiseaseReducer,
    selectNameReducer,
    settingNotificationReducer,
    familyManagerReducer,
    editUserInfoReducer,
    resetPasswordReducer,
    changePasswordReducer,

});
export default allReducers;

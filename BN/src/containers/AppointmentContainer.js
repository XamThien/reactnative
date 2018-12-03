import { connect } from "react-redux";
import Appointment from "../screen/home/appointment/Appointment";
import {
  onSaveDataAppointment,
   onClickItemTime,
   onResetAllAppointment,
   onGetDataAppointmentSchedule,
   onSendMessage
} from "../actions/AppointmentAction";
import {
    fetchUserProfile,
  } from "../actions/ScheduleAction";


const mapStateToProps = (state) => {
    return {
        dataTimes: state.saveDataAppointReducer.dataTimes,
        dataAppoints: state.saveDataAppointReducer.dataAppoints,
        dataType: state.getDatatypeReducer,
        selectName: state.getDataNameReducer.selectName,
        image: state.getProfilesReducers.image,
        isLoading: state.saveDataAppointReducer.isLoading,
        isSaveSuccess: state.saveDataAppointReducer.isSaveSuccess,

    }
};


const mapDispatchToProps = (dispatch) => {
    return {    
        onSaveData: (dataAppointment) => {
            dispatch(onSaveDataAppointment(dataAppointment));
        }, 
        onClickTimeAvailable: (timeId, oldDataTimes) => {
            dispatch(onClickItemTime(timeId, oldDataTimes));
        },
        loadDataProfile:() => {
            dispatch(fetchUserProfile());
        },
        onResetInitAppointment: () => {
            dispatch(onResetAllAppointment());
        },
        onGetDataAppointmentSchedule: (doctor_id, date) => {
            dispatch(onGetDataAppointmentSchedule(doctor_id, date))
        },
        onSendMessage: (userFriend, message) => {
            dispatch(onSendMessage(userFriend, message));
        }

    };
}
const AppointmentContainer = connect(mapStateToProps, mapDispatchToProps)(Appointment);
export default AppointmentContainer;

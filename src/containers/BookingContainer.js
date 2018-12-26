import { connect } from "react-redux";
import Booking from "../screen/main/booking/Booking";
import {
  onSaveDataAppointment,
  onClickItemTime,
  onResetAllAppointment,
  onGetDataAppointmentSchedule,
  onSendMessage
} from "../actions/BookingAction";

const mapStateToProps = state => {
  return {
    userProfile: state.loginReducer.userProfile,
    dataTimes: state.bookingReducers.dataTimes,
    dataAppoints: state.bookingReducers.dataAppoints,
    dataType: state.selectDiseaseReducer,
    selectName: state.selectNameReducer.selectName,
    isLoading: state.bookingReducers.isLoading,
    isSaveSuccess: state.bookingReducers.isSaveSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveData: (dataAppointment) => {
      dispatch(onSaveDataAppointment(dataAppointment));
    },
    onClickTimeAvailable: (timeId, oldDataTimes) => {
      dispatch(onClickItemTime(timeId, oldDataTimes));
    },
    onResetInitAppointment: () => {
      dispatch(onResetAllAppointment());
    },
    onGetDataAppointmentSchedule: (doctor_id, date) => {
      dispatch(onGetDataAppointmentSchedule(doctor_id, date));
    },
    onSendMessage: (userFriend, message) => {
      dispatch(onSendMessage(userFriend, message));
    }
  };
};
const BookingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Booking);
export default BookingContainer;

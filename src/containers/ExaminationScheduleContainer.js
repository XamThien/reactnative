import {connect} from "react-redux";
import ExaminationSchedule from "../screen/home/schedule/ExaminationSchedule";
import {
    fetchUserProfile,
    loadListDataAppoint, loadListUserAppoint,updateStatusAppoint, onSendMessage
} from "../actions/ExaminationScheduleAction";


const mapStateToProps = (state) => {
    console.log("nvTien - mapStateToProps isLoading...: " + state.getListAppointReducer.isLoading);
    return {
        isLoading: state.getListAppointReducer.isLoading,
        dataAppoint: state.getListAppointReducer.dataAppoint
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onFetchUserProfile: () => {
            dispatch(fetchUserProfile());
        },
        onLoadListDataAppoint: (date, typeLoad) => {
            dispatch(loadListDataAppoint(date, typeLoad));
        },
        onLoadListUserAppoint: () => {
            dispatch(loadListUserAppoint());
        },
        onUpdateStatusAppoint: (appointment_id, status, date) => {
            dispatch(updateStatusAppoint(appointment_id, status, date));
        },
        onSendMessage: (userFriend, message) => {
            dispatch(onSendMessage(userFriend, message));
        }
    };
}
const ExaminationScheduleContainer = connect(mapStateToProps, mapDispatchToProps)(ExaminationSchedule);
export default ExaminationScheduleContainer;

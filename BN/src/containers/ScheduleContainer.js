import {connect} from "react-redux";
import Schedule from "../screen/home/schedule/Schedule";
import {
    fetchDataSpecialized,
    findDoctorByID,
    fetchUserProfile,
    findDataByDate,
    findDataImmediately
} from "../actions/ScheduleAction";
import {onCreateSocketRTC, onAddNewDoctors} from "../actions/VideoCallAction";


const mapStateToProps = (state) => {
    return {
        dataSpeciality: state.specializedReducers.specializedData,
        doctors: state.specializedReducers.dataDoctors,
        userProfile: state.getProfilesReducers,
        isLoading: state.specializedReducers.isLoading,
        dataDoctorSelected: state.specializedReducers.doctorSelected,
        actionCallback: state.listenerVideocallReducers.actionCallback,
        userFriends: state.listenerVideocallReducers.userFriends,
        actionCallbackDoctor: state.specializedReducers.actionCallbackDoctor,
        
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onCreateSocketRTC: (dataUser, dataFriends) => {
            dispatch(onCreateSocketRTC(dataUser, dataFriends));
        },
        onFetchAllSpecialized: () => {
            dispatch(fetchDataSpecialized());
        },
        onFetchDoctor: (specID) => {
            dispatch(fetchDataDoctor(specID));
        },
        onFindDoctorByID: (specID) => {
            dispatch(findDoctorByID(specID));
        },
        onFetchUserProfile: () => {
            dispatch(fetchUserProfile());
        },
        onclickGetdoctorByDate: (specID, date) => {
            dispatch(findDataByDate(specID, date));
        },
        onclickGetdoctorImmediately: (specID, date, time) => {
            dispatch(findDataImmediately(specID, date, time));
        },
        onAddNewDoctors: (dataDoctors) => {
            dispatch(onAddNewDoctors(dataDoctors))
        }
    };
}
const ScheduleContainer = connect(mapStateToProps, mapDispatchToProps)(Schedule);
export default ScheduleContainer;

import {connect} from "react-redux";
import DoctorList from "../screen/main/doctorlist/DoctorList";
import {
    fetchDataSpecialized,
    findDoctorBySpecID,
    findDataByDate,
    findDataImmediately
} from "../actions/DoctorListAction";


const mapStateToProps = (state) => {
    return {
        userProfile: state.loginReducer.userProfile,
        dataSpeciality: state.doctorListReducers.specializedData,
        doctors: state.doctorListReducers.dataDoctors,
        isLoading: state.doctorListReducers.isLoading,
        dataDoctorSelected: state.doctorListReducers.doctorSelected,
        actionCallbackDoctor: state.doctorListReducers.actionCallbackDoctor,
        
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAllSpecialized: () => {
            dispatch(fetchDataSpecialized());
        },
        onFindDoctorByID: (specID) => {
            dispatch(findDoctorBySpecID(specID));
        },
        onFindDoctorByDate: (specID, date) => {
            dispatch(findDataByDate(specID, date));
        },
        onFindDoctorImmediately: (specID, date, time) => {
            dispatch(findDataImmediately(specID, date, time));
        },
    };
}
const DoctorListContainer = connect(mapStateToProps, mapDispatchToProps)(DoctorList);
export default DoctorListContainer;

import { connect } from "react-redux";
import UpdateDoctorInfoScr from "../screen/profile/DoctorProfileManager/UpdateInformation/UpdateDoctorInfoScr";
import {
    doUpdateDoctorInfo,
} from "../actions/DoctorInfoManagerAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.doctorInfoManagerReducer.hasError,
        lastError: state.doctorInfoManagerReducer.lastError,
        showLoading: state.doctorInfoManagerReducer.isLoading,
        doctorData: state.doctorInfoManagerReducer.doctorData,
        userProfile: state.loginReducer.userProfile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        doUpdateDoctorProfile: (doctorData) => {                        
            dispatch(doUpdateDoctorInfo(doctorData));
        },
    };
}
const ShowDoctorProfileContainer =  connect(mapStateToProps, mapDispatchToProps)(UpdateDoctorInfoScr);
export default ShowDoctorProfileContainer;

import { connect } from "react-redux";
import ShowDoctorInfoSrc from "../screen/profile/DoctorProfileManager/ShowInfomation/ShowDoctorInfoSrc";
import {
    doGetDoctorInfo,
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
        doGetDoctorProfile: () => {                        
            dispatch(doGetDoctorInfo());
        },
    };
}
const ShowDoctorProfileContainer =  connect(mapStateToProps, mapDispatchToProps)(ShowDoctorInfoSrc);
export default ShowDoctorProfileContainer;

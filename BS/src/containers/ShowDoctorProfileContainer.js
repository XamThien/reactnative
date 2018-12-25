import { connect } from "react-redux";
import ShowDoctorInfoSrc from "../screen/profile/DoctorProfileManager/ShowInfomation/ShowDoctorInfoSrc";
import {
    doGetDoctorInfo,
} from "../actions/DoctorInfoManagerAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.resultDoctorInfoManagerReducer.hasError,
        lastError: state.resultDoctorInfoManagerReducer.lastError,
        showLoading: state.resultDoctorInfoManagerReducer.isLoading,
        doctorData: state.resultDoctorInfoManagerReducer.doctorData,
        userProfile: state.resultLoginReducer.userProfile
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

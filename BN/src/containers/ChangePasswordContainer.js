import { connect } from "react-redux";
import ChangePasswordScr from "../screen/changePassword/ChangePasswordScr";
// import {
//     doLoginUserName,
// } from "../actions/LoginAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.resultLoginReducer.hasError,
        lastError: state.resultLoginReducer.lastError,
        showLoading: state.resultLoginReducer.isLoading
        // userProfile: state.resultLoginReducer.userProfile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        doResetPassword: (userID, newPassword) => {                        
            // dispatch(doLoginUserName(userData));
        },
    };
}
const ChangePasswordContainer =  connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScr);
export default ChangePasswordContainer;

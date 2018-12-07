import { connect } from "react-redux";
import ResetPasswordScr from "../screen/resetpassword/ResetPasswordScr";
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
        doResetPassword: (userID, userMail) => {                        
            // dispatch(doLoginUserName(userData));
        },
    };
}
const ResetPasswordContainer =  connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScr);
export default ResetPasswordContainer;

import { connect } from "react-redux";
import ResetPassword from "../screen/resetpassword/ResetPassword";
import {
    doResetPassWord,
} from "../actions/ResetPasswordAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.resetPasswordReducer.hasError,
        lastError: state.resetPasswordReducer.lastError,
        showLoading: state.resetPasswordReducer.isLoading,
        messageSuccess: state.resetPasswordReducer.messageSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        doResetPassword: (userMail) => {                        
            dispatch(doResetPassWord(userMail));
        },
    };
}
const ResetPasswordContainer =  connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
export default ResetPasswordContainer;

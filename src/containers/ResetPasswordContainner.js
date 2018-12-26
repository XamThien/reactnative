import { connect } from "react-redux";
import ResetPassword from "../screen/resetpassword/ResetPassword";
import {
    doResetPassWord,
} from "../actions/ResetPasswordAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.resultResetPasswordReducer.hasError,
        lastError: state.resultResetPasswordReducer.lastError,
        showLoading: state.resultResetPasswordReducer.isLoading,
        messageSuccess: state.resultResetPasswordReducer.messageSuccess
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

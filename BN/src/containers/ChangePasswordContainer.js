import { connect } from "react-redux";
import ChangePassword from "../screen/profile/changepassword/ChangePassword";
import {
    doChangePassword,
} from "../actions/ChangePasswordAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.changePasswordReducer.hasError,
        lastError: state.changePasswordReducer.lastError,
        showLoading: state.changePasswordReducer.isLoading,
        messageSuccess: state.changePasswordReducer.messageSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        doChangePassWord: (newPassword,old_password) => {                        
            dispatch(doChangePassword(newPassword,old_password));
        },
    };
}
const ChangePasswordContainer =  connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
export default ChangePasswordContainer;

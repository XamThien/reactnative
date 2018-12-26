import { connect } from "react-redux";
import ChangePassword from "../screen/changepassword/ChangePassword";
import {
    doChangePassword,
} from "../actions/ChangePasswordAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.resultChangePasswordReducer.hasError,
        lastError: state.resultChangePasswordReducer.lastError,
        showLoading: state.resultChangePasswordReducer.isLoading,
        messageSuccess: state.resultChangePasswordReducer.messageSuccess
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

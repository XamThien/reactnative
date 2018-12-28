import { connect } from "react-redux";
import LoginScr from "../screen/login/LoginScr";
import {
    doLoginUserName,
} from "../actions/LoginAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.loginReducer.hasError,
        lastError: state.loginReducer.lastError,
        showLoading: state.loginReducer.isLoading,
        userProfile: state.loginReducer.userProfile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        doLogin: (userData) => {                        
            dispatch(doLoginUserName(userData));
        },
    };
}
const LoginContainer =  connect(mapStateToProps, mapDispatchToProps)(LoginScr);
export default LoginContainer;

import { connect } from "react-redux";
import Login from "../screen/login/Login";
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
const LoginContainer =  connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;

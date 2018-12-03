import { connect } from "react-redux";
import LoginScr from "../screen/login/LoginScr";
import {
    doLoginUserName,
} from "../actions/LoginAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.resultLoginReducer.hasError,
        lastError: state.resultLoginReducer.lastError,
        showLoading: state.resultLoginReducer.isLoading,
        userProfile: state.resultLoginReducer.userProfile
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

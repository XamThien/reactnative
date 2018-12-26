import { connect } from "react-redux";
import Register from "../screen/register/Register";
import {
    doRegister,
} from "../actions/RegisterAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.registerReducer.hasError,
        lastError: state.registerReducer.lastError,
        showLoading: state.registerReducer.isLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        doRegister: (userData) => {                        
            dispatch(doRegister(userData));
        },
    };
}
const RegisterContainer =  connect(mapStateToProps, mapDispatchToProps)(Register);
export default RegisterContainer;

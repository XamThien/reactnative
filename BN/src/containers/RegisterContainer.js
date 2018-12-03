import { connect } from "react-redux";
import Register from "../screen/register/Register";
import {
    doRegister,
} from "../actions/RegisterAction";

const mapStateToProps = (state) => {
    console.log("mapStateToProps: " + state.resultLoginReducer.hasError);
    return {
        hasError: state.resultRegisterReducer.hasError,
        lastError: state.resultRegisterReducer.lastError,
        showLoading: state.resultRegisterReducer.isLoading
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

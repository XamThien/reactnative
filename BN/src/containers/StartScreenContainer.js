import { connect } from "react-redux";
import StartScreen from "../screen/startScreen/StartScreen";
import {
    doLoginFacebook,
    doLoginGoogle,
    configLoginGoogle
  } from "../actions/StartScreenAction";


const mapStateToProps = (state) => {
    return {
        facebookProfile: state.loginSocialReducers.userProfiles,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {    
        doLoginFacebook: () => {         
            dispatch(doLoginFacebook());
        },
        doLoginGoogle:() => {
            dispatch(doLoginGoogle());
        },
        configLoginGoogle:() => {
            dispatch(configLoginGoogle());
        }
        
    };
}
 const StartScreenContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(StartScreen);
export default StartScreenContainer;

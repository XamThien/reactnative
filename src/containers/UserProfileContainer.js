import { connect } from "react-redux";
import UserProfile from "../screen/profile/UserProfile";
import {logOutApp} from "../actions/UserProfileAction";


const mapStateToProps = (state) => {
    return {
        userProfile: state.loginReducer.userProfile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        doLogoutApp:() => {
            dispatch(logOutApp());
        },
    };
}
 const UserProfileContainer =  connect(mapStateToProps, mapDispatchToProps)(UserProfile);
export default UserProfileContainer;

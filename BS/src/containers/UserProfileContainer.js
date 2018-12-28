import { connect } from "react-redux";
import Profile from "../screen/profile/Profile";
import {logOutApp,fetchUserProfile} from "../actions/UserProfileAction";


const mapStateToProps = (state) => {
    console.log(`nvTien - UserProfile data = ${JSON.stringify(state.loginReducer.userProfile)}`)
    return {
        userProfile: state.loginReducer.userProfile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadDataProfile:() => {
            dispatch(fetchUserProfile());
        },
        doLogoutApp:() => {
            dispatch(logOutApp());
        }
    };
}
 const ProfileContainer =  connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;

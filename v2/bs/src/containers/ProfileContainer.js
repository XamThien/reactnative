import { connect } from "react-redux";
import Profile from "../screen/profile/Profile";
import {logOutApp, fetchUserProfile} from "../actions/ProfileAction";


const mapStateToProps = (state) => {
    return {
        userName: state.getProfilesReducers.userName,
        image: state.getProfilesReducers.image
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

import { connect } from "react-redux";
import UserProfile from "../screen/profile/UserProfile";
import {logOutApp} from "../actions/UserProfileAction";


const mapStateToProps = (state) => {
    console.log(`nvTien - UserProfile data = ${JSON.stringify(state.loginReducer.userProfile)}`)
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

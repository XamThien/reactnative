import { connect } from "react-redux";
import UserManager from "../screen/profile/userManager/UserManager";

const mapStateToProps = (state) => {

    return {
        //
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        //

    };
}
const UserManagerContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(UserManager);
export default UserManagerContainer;

import { connect } from "react-redux";
import UserManager from "../screen/profile/usermanager/UserManager";

const mapStateToProps = (state) => {

    return {
        // dataNames: state.resultFamilyManagerReducer.dataNames,
        // userProfile: state.getProfilesReducers,
        // dataNewMember: state.resultFamilyManagerReducer.dataNewUser,
        // showLoading: state.resultFamilyManagerReducer.isLoading,
        // error: state.resultFamilyManagerReducer.lastError,

        // hasErrorDelete: state.resultFamilyManagerReducer.hasError,
        // lastErrorDelete: state.resultFamilyManagerReducer.lastError,
        // showLoadingDelete: state.resultFamilyManagerReducer.isLoading,
        // messageSuccessDelete: state.resultFamilyManagerReducer.messageSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        // onFetchAllDataNames: (userId) => {
        //     dispatch(doLoadAllFamilyMember(userId));
        // }, 

    };
}
const UserManagerContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(UserManager);
export default UserManagerContainer;

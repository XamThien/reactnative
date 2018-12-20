import { connect } from "react-redux";
import userManagerScr from "../screen/profile/userManager/userManagerScr";

// import { doDeleteMember,doLoadAllFamilyMember,addNewMember } from '../actions/FamilyManagerAction';

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

        // onDeleteMember: (memberID) => {
        //     dispatch(doDeleteMember(memberID));
        // },

        
    };
}
const UserManagerContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(userManagerScr);
export default UserManagerContainer;

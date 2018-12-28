import { connect } from "react-redux";
import FamilyManager from "../screen/profile/familiymanager/FamilyManager";

import { doDeleteMember,doLoadAllFamilyMember,addNewMember } from '../actions/FamilyManagerAction';

const mapStateToProps = (state) => {
    return {
        dataNames: state.familyManagerReducer.dataNames,
        userProfile: state.getProfilesReducers,
        dataNewMember: state.familyManagerReducer.dataNewUser,
        showLoading: state.familyManagerReducer.isLoading,
        error: state.familyManagerReducer.lastError,

        hasErrorDelete: state.familyManagerReducer.hasError,
        lastErrorDelete: state.familyManagerReducer.lastError,
        showLoadingDelete: state.familyManagerReducer.isLoading,
        messageSuccessDelete: state.familyManagerReducer.messageSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        onFetchAllDataNames: (userId) => {
            dispatch(doLoadAllFamilyMember(userId));
        }, 

        onDeleteMember: (memberID) => {
            dispatch(doDeleteMember(memberID));
        },
        // onUpdateMember: (memberID) => {
        //     // dispatch(deleteMember(memberID));
        // },
        
    };
}
const ModalNameContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(FamilyManager);
export default ModalNameContainer;

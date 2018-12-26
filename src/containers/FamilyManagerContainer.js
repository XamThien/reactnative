import { connect } from "react-redux";
import FamilyManager from "../screen/profile/familymanager/FamilyManager";

import { doDeleteMember,doLoadAllFamilyMember,addNewMember } from '../actions/FamilyManagerAction';

const mapStateToProps = (state) => {
    return {
        dataNames: state.resultFamilyManagerReducer.dataNames,
        userProfile: state.getProfilesReducers,
        dataNewMember: state.resultFamilyManagerReducer.dataNewUser,
        showLoading: state.resultFamilyManagerReducer.isLoading,
        error: state.resultFamilyManagerReducer.lastError,

        hasErrorDelete: state.resultFamilyManagerReducer.hasError,
        lastErrorDelete: state.resultFamilyManagerReducer.lastError,
        showLoadingDelete: state.resultFamilyManagerReducer.isLoading,
        messageSuccessDelete: state.resultFamilyManagerReducer.messageSuccess
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
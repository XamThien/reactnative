import { connect } from "react-redux";
import familyManagerScr from "../screen/profile/familyManager/familyManagerScr";
// import {
//     fetchDataModalName,
// } from "../actions/ModalNameAction";

import { doDeleteMember,doLoadAllFamilyMember,addNewMember } from '../actions/FamilyManagerAction';

const mapStateToProps = (state) => {
    // alert(`From container dataNames: ${JSON.stringify(state.resultFamilyManagerReducer.dataNames)}`);
    // alert(`From container dataNewUser: ${JSON.stringify(state.resultFamilyManagerReducer.dataNewUser)}`);
    // alert(`From container state.getProfilesReducers: ${JSON.stringify(state.getProfilesReducers)}`);
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
const ModalNameContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(familyManagerScr);
export default ModalNameContainer;

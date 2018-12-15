import { connect } from "react-redux";
import familyManagerScr from "../screen/profile/familyManager/familyManagerScr";
import {
    fetchDataModalName,
} from "../actions/ModalNameAction";

import { doDeleteMember } from '../actions/FamilyManagerAction';

const mapStateToProps = (state) => {
    return {
        dataNames: state.getDataNameReducer.dataNames,
        dataNewMember: state.addNewMemberReducer.dataNewUser,
        userProfile: state.getProfilesReducers,
        showLoading: state.getDataNameReducer.isLoading,
        error: state.getDataNameReducer.lastError,

        hasErrorDelete: state.resultDeleteMemberReducer.hasError,
        lastErrorDelete: state.resultDeleteMemberReducer.lastError,
        showLoadingDelete: state.resultDeleteMemberReducer.isLoading,
        messageSuccessDelete: state.resultDeleteMemberReducer.messageSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        onFetchAllDataNames: (userId) => {
            dispatch(fetchDataModalName(userId));
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

import { connect } from "react-redux";
import EditMember from "../screen/profile/familymanager/editMemberInfor/EditMember";
import {
    doUpdateMember,

} from "../actions/FamilyManagerAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.familyManagerReducer.hasError,
        lastError: state.familyManagerReducer.lastError,
        showLoading: state.familyManagerReducer.isLoading,
        error: state.familyManagerReducer.lastError,
        messageSuccess: state.familyManagerReducer.messageSuccess

    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        onUpdateMember: (dataUser) => {
            dispatch(doUpdateMember(dataUser));
        }
    };
}
const EditFamilyMemberContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EditMember);
export default EditFamilyMemberContainer;

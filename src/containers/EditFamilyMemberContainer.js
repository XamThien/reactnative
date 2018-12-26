import { connect } from "react-redux";
import EditMember from "../screen/profile/familymanager/editmemberinfor/editMember";
import {
    doUpdateMember,

} from "../actions/FamilyManagerAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.resultFamilyManagerReducer.hasError,
        lastError: state.resultFamilyManagerReducer.lastError,
        showLoading: state.resultFamilyManagerReducer.isLoading,
        error: state.resultFamilyManagerReducer.lastError,
        messageSuccess: state.resultFamilyManagerReducer.messageSuccess

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

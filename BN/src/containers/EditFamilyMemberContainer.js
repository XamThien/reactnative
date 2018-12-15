import { connect } from "react-redux";
import editMemberScr from "../screen/profile/familyManager/editMemberInfor/editMemberScr";
import {
    doUpdateMember,

} from "../actions/FamilyManagerAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.resultUpdateMemberReducer.hasError,
        lastError: state.resultUpdateMemberReducer.lastError,
        showLoading: state.resultUpdateMemberReducer.isLoading,
        error: state.resultUpdateMemberReducer.lastError,
        messageSuccess: state.resultUpdateMemberReducer.messageSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        onUpdateMember: (dataMember) => {
            dispatch(doUpdateMember(dataMember));
        }, 
        // onClickItem :(userId, selectName) =>{
        //     dispatch(onClickItem(userId, selectName));
        // },
        
    };
}
const EditFamilyMemberContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(editMemberScr);
export default EditFamilyMemberContainer;

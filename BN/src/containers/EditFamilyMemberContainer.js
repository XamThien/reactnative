import { connect } from "react-redux";
import editMemberScr from "../screen/profile/familyManager/editMemberInfor/editMemberScr";
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
        }, 
        // onClickItem :(userId, selectName) =>{
        //     dispatch(onClickItem(userId, selectName));
        // },
        
    };
}
const EditFamilyMemberContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(editMemberScr);
export default EditFamilyMemberContainer;

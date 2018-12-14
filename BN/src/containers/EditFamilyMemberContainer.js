import { connect } from "react-redux";
import editMemberScr from "../screen/profile/familyManager/editMemberInfor/editMemberScr";
// import {
//     fetchDataModalName,
//     onClickItem,

// } from "../actions/ModalNameAction";

const mapStateToProps = (state) => {
    return {
        dataNames: state.getDataNameReducer.dataNames,
        dataNewMember: state.addNewMemberReducer.dataNewUser,
        // userProfile: state.getProfilesReducers,
        showLoading: state.getDataNameReducer.isLoading,
        error: state.getDataNameReducer.lastError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        // onFetchAllDataNames: (userId) => {
        //     dispatch(fetchDataModalName(userId));
        // }, 
        // onClickItem :(userId, selectName) =>{
        //     dispatch(onClickItem(userId, selectName));
        // },
        
    };
}
const EditFamilyMemberContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(editMemberScr);
export default EditFamilyMemberContainer;

import { connect } from "react-redux";
import familyManagerScr from "../screen/profile/familyManager/familyManagerScr";
import {
    fetchDataModalName,
    onClickItem,

} from "../actions/ModalNameAction";

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
        onFetchAllDataNames: (userId) => {
            dispatch(fetchDataModalName(userId));
        }, 
        // onClickItem :(userId, selectName) =>{
        //     dispatch(onClickItem(userId, selectName));
        // },
        
    };
}
const ModalNameContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(familyManagerScr);
export default ModalNameContainer;

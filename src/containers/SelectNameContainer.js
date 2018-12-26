import { connect } from "react-redux";
import SelectName from "../screen/main/booking/selectname/SelectName";
import {
    fetchDataModalName,
    onClickItem,

} from "../actions/SelectNameAction";

const mapStateToProps = (state) => {
     return {
        dataNames: state.selectNameReducer.dataNames,
        dataNewMember: state.addMemberFamilyReducer.dataNewUser,
        userProfile: state.loginReducer.userProfile,
        showLoading: state.selectNameReducer.isLoading,
        error: state.selectNameReducer.lastError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        onFetchAllDataNames: (userId) => {
            dispatch(fetchDataModalName(userId));
        }, 
        onClickItem :(userId, selectName) =>{
            dispatch(onClickItem(userId, selectName));
        },
        
    };
}
const SelectNameContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SelectName);
export default SelectNameContainer;

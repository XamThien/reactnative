import { connect } from "react-redux";
import AddMemberFamily from "../screen/main/booking/addmemberfamily/AddMemberFamily";
import {addNewMember,} from "../actions/AddMemberFamilyAction";

const mapStateToProps = (state) => {
    return {
        isLoading: state.addMemberFamilyReducer.isLoading,
        isDissmissDialog: state.addMemberFamilyReducer.isDissmiss,

    }   
};

const mapDispatchToProps = (dispatch) => {
    return {    
        addNewMember: (dataUser) => {                        
            dispatch(addNewMember(dataUser));
        },
        
    };
}
 const AddMemberFamilyContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AddMemberFamily);
export default AddMemberFamilyContainer;

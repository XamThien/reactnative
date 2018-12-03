import { connect } from "react-redux";
import AddNewMemberModal from "../screen/home/appointment/dialogAddMember/AddNewMemberModal";
import {addNewMember,
} from "../actions/AddNewMemberAction";

const mapStateToProps = (state) => {
    return {
        isLoading: state.addNewMemberReducer.isLoading,
        isDissmissDialog: state.addNewMemberReducer.isDissmiss,

    }   
};

const mapDispatchToProps = (dispatch) => {
    return {    
        addNewMember: (dataUser) => {                        
            dispatch(addNewMember(dataUser));
        },
        
    };
}
 const AddNewMemberContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AddNewMemberModal);
export default AddNewMemberContainer;

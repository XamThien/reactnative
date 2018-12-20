import { connect } from "react-redux";
import EditUserInfoModal from "../screen/profile/userManager/dialogEditUserInfo/editUserInfoModal";
import {doUpdateUser
} from "../actions/EditUserInfoAction";

const mapStateToProps = (state) => {
    return {
        isLoading: state.editUserInfoReducer.isLoading,
        isDissmissDialog: state.editUserInfoReducer.isDissmiss,
        messageSuccess: state.editUserInfoReducer.messageSuccess

    }   
};

const mapDispatchToProps = (dispatch) => {
    return {    
        editUserInfo: (dataNewUser,userOldInfo) => {                        
            dispatch(doUpdateUser(dataNewUser,userOldInfo));
        },
        
    };
}
 const EditUserInfoContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EditUserInfoModal);
export default EditUserInfoContainer;

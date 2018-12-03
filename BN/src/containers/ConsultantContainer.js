import { connect } from "react-redux";
import ConsultantModal from "../screen/home/appointment/dialogconsultant/ConsultantModal";
import {
    onClickItem,

} from "../actions/ConsultantAction";
import {
    onClickItemConsultType,
  } from "../actions/AppointmentAction";


const mapStateToProps = (state) => {
    return {

    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onClickItem :(typeId, dataTypes) =>{
            dispatch(onClickItem(typeId, dataTypes));
        },
        setDataConsultantType:(typeName, typeId) => {
            dispatch(onClickItemConsultType(typeName, typeId));
        }
        
    };
}
 const ConsultantModalContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ConsultantModal);
export default ConsultantModalContainer;

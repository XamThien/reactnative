import { connect } from "react-redux";
import SelectDisease from "../screen/main/booking/selectdisease/SelectDisease";
import {
    onClickItem,onPushDataToBooking
} from "../actions/SelectDiseaseAction";


const mapStateToProps = (state) => {
    return {

    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onClickItem :(typeId, dataTypes) =>{
            dispatch(onClickItem(typeId, dataTypes));
        },
        onPushDataToBooking:(typeName, typeId) => {
            dispatch(onPushDataToBooking(typeName, typeId));
        }
        
    };
}
  
const SelectDiseaseContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SelectDisease);
export default SelectDiseaseContainer;

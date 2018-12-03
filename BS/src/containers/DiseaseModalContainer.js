import { connect } from "react-redux";
import DiseaseModal from "../screen/home/workcalendar/diseasemodal/DiseaseModal";
import { loadDataDisease} from "../actions/DiseaseModalAction";


const mapStateToProps = (state) => {
    return {
        //userName: state.getProfilesReducers.userName,
     
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadDataDisease:(dataDiseases) => {
            dispatch(loadDataDisease(dataDiseases));
        },
        
    };
}
 const DiseaseModalContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(DiseaseModal);
export default DiseaseModalContainer;

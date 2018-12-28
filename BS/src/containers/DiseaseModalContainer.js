import { connect } from "react-redux";
import DiseaseModal from "../screen/main/workschedule/diseasemodal/DiseaseModal";
import { loadDataDisease} from "../actions/DiseaseModalAction";

const mapStateToProps = (state) => {
    return {
     
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

import { connect } from "react-redux";
import CreateScheduleModal from "../screen/main/workschedule/createschedule/CreateScheduleModal";
import { saveDataCreateSchedule} from "../actions/CreateScheduleAction";


const mapStateToProps = (state) => {
    return {
        dataSchedule: state.createScheduleReducers.dataSchedule,
        lastError: state.createScheduleReducers.lastError,
        isLoadingDialog: state.createScheduleReducers.isLoading
     
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveDataSchedule:(dataSchedule) => {
            dispatch(saveDataCreateSchedule(dataSchedule));
        },
        
    };
}
 const CreateScheduleContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(CreateScheduleModal);
export default CreateScheduleContainer;

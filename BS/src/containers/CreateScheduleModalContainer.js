import { connect } from "react-redux";
import CreateScheduleModal from "../screen/home/workcalendar/createschedule/CreateScheduleModal";
import { saveDataSchedule} from "../actions/CreateScheduleAction";


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
            dispatch(saveDataSchedule(dataSchedule));
        },
        
    };
}
 const CreateScheduleModalContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(CreateScheduleModal);
export default CreateScheduleModalContainer;

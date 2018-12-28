import { connect } from "react-redux";
import CreateScheduleModal from "../screen/main/workschedule/createschedule/CreateScheduleModal";
import { saveDataCreateSchedule, onGenerateTimeSchedule} from "../actions/CreateScheduleAction";


const mapStateToProps = (state) => {
    return {
        dataSchedule: state.createScheduleReducers.dataSchedule,
        lastError: state.createScheduleReducers.lastError,
        isLoading: state.createScheduleReducers.isLoading,
        dataTimes: state.createScheduleReducers.dataTimes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveDataSchedule:(dataSchedule) => {
            dispatch(saveDataCreateSchedule(dataSchedule));
        },
        onGenerateTimeSchedule: (dataSchedule) => {
            dispatch(onGenerateTimeSchedule(dataSchedule));
        }
    };
}
 const CreateScheduleContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(CreateScheduleModal);
export default CreateScheduleContainer;

import {connect} from "react-redux";
import WorkSchedule from "../screen/main/workschedule/WorkSchedule";
import {loadDataWorkSchedule} from "../actions/WorkScheduleAction";


const mapStateToProps = (state) => {
    return {
       isLoading: state.workScheduleReducers.isLoading,
       dataNewSchedule: state.createScheduleReducers.dataSchedule,
       dataWorkSchedule: state.workScheduleReducers.dataWorkSchedule,
       
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadDataWorkSchedule: (date) => {
            dispatch(loadDataWorkSchedule(date));
        }
    };
}

const WorkScheduleContainer = connect(mapStateToProps, mapDispatchToProps)(WorkSchedule);
export default WorkScheduleContainer;

import {connect} from "react-redux";
import WorkCalendar from "../screen/home/workcalendar/WorkCalendar";
import {
    loadDataWorkSchedule,loadAllPatients
} from "../actions/WorkScheduleAction";
import {
    onCreateSocketRTC,onAddNewPatients
  } from "../actions/VideoCallAction";


const mapStateToProps = (state) => {
    return {
       isLoading: state.loadWorkScheduleReducers.isLoading,
       dataNewSchedule: state.createScheduleReducers.dataSchedule,
       dataWorkSchedule: state.loadWorkScheduleReducers.dataWorkSchedule,
       dataPatients: state.loadWorkScheduleReducers.dataPatients,
       callbackPatient : state.loadWorkScheduleReducers.callbackPatient,

       userFriends: state.listenerVideocallReducers.userFriends,
       actionCallback: state.listenerVideocallReducers.actionCallback,
       
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadDataWorkSchedule: (date) => {
            dispatch(loadDataWorkSchedule(date));
        },
        onCreateSocketRTC: (dataUser, dataFriends) => {
            dispatch(onCreateSocketRTC(dataUser, dataFriends));
        },
        onLoadAllPatients: () => {
            dispatch(loadAllPatients());
        },
        onAddNewPatients: (dataPatients) => {
            dispatch(onAddNewPatients(dataPatients))
          }
    };
}
const WorkCalendarContainer = connect(mapStateToProps, mapDispatchToProps)(WorkCalendar);
export default WorkCalendarContainer;

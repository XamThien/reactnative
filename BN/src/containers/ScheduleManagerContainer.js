import {connect} from "react-redux";
import ScheduleManager from "../screen/schedule/ScheduleManager";
import {
    doDeleteAppoint,
    doGetListDataAppoint
} from "../actions/ScheduleManagerAction";


const mapStateToProps = (state) => {
    return {
        idAppoint: state.scheduleManagerReducer.idAppoint,
        isShowLoading: state.scheduleManagerReducer.isLoading,
        dataAppointSchedule: state.scheduleManagerReducer.dataAppointSchedule
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteDataAppoint: (dataAppoint) => {
            dispatch(doDeleteAppoint(dataAppoint));
        },
        doGetListDataAppoint: () => {
            dispatch(doGetListDataAppoint());
        }
    };
}
const ScheduleManagerContainer = connect(mapStateToProps, mapDispatchToProps)(ScheduleManager);
export default ScheduleManagerContainer;

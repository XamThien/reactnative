import { connect } from "react-redux";
import SettingNotification from "../screen/profile/settingnotification/SettingNotification";
import {
    updateTimeSettingNotification, doGetTimeSettingNotification
} from "../actions/SettingNotificationAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.resultSettingNotificationReducer.hasError,
        lastError: state.resultSettingNotificationReducer.lastError,
        showLoading: state.resultSettingNotificationReducer.isLoading,
        setting_notify: state.resultSettingNotificationReducer.setting_notify,
        messageSuccess: state.resultSettingNotificationReducer.messageSuccess,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        doUpdateTimeSetting: (time,checked) => {                        
            dispatch(updateTimeSettingNotification(time,checked));
        },
        doGetTimeSetting: () => {
            dispatch(doGetTimeSettingNotification());
        }
    };
}
const LoginContainer =  connect(mapStateToProps, mapDispatchToProps)(SettingNotification);
export default LoginContainer;

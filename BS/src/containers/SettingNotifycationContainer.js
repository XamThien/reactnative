import { connect } from "react-redux";
import SettingNotification from "../screen/profile/settingnotification/SettingNotification";
import {
    updateTimeSettingNotification, doGetTimeSettingNotification
} from "../actions/SettingNotificationAction";

const mapStateToProps = (state) => {
    return {
        hasError: state.settingNotificationReducer.hasError,
        lastError: state.settingNotificationReducer.lastError,
        showLoading: state.settingNotificationReducer.isLoading,
        setting_notify: state.settingNotificationReducer.setting_notify,
        messageSuccess: state.settingNotificationReducer.messageSuccess,
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

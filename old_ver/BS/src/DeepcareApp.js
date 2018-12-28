import React, { Component } from "react";
import { StyleSheet, ScrollView, Vibration, AsyncStorage, Alert } from "react-native";
import { createStackNavigator, NavigationActions } from "react-navigation";
import LoginContainer from "./containers/LoginContainer";
import Help from "./screen/help/Help";
import TermOfService from "./screen/term/TermOfService";
import ProfileContainer from "./containers/ProfileContainer";
import Main from './screen/main/Main';
import PatientProfile from "./screen/home/schedule/profile/PatientProfile";
import VideoCallContainer from "./containers/VideoCallContainer";
import ResetPasswordContainer from "./containers/ResetPasswordContainner";
import ChangePasswordContainer from "./containers/ChangePasswordContainer";
import ShowDoctorProfileContainer from "./containers/ShowDoctorProfileContainer";
import UpdateDoctorInfoContainer from "./containers/UpdateDoctorInfoContainer";
import SettingNotifycationContainer from "./containers/SettingNotifycationContainer";





import NotifService from './lib/NotifService';
import {Translate} from "./utils/Language";
import DefineKey from "./config/language/DefineKey";
import ScreenName from './commons/ScreenName';
import Sound from 'react-native-sound';
import { isEmptyObject } from "./utils/Utils";
import Constants from "./commons/Constants";

const STEP_TIMEOUT = 1000;
var initTimer = 0;
const DURATION = 10000;
const PATTERN = [1000, 2000, 3000];
const USER_TYPE = 1;

// import { RNNotificationBanner } from 'react-native-notification-banner';
//import Icon from 'react-native-vector-icons/FontAwesome'

export default class DeepcareApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  componentWillMount = () => {
    
  };
  

  componentDidMount() {
   
  };

  componentWillReceiveProps(props) {
    this.handleActionCallback(props.actionCallback, props);
  
  }

  handleActionCallback(callbackType, props) {
    console.log("nvTien - DeepcareApp handleActionCallback actionType " + callbackType);
    if(callbackType === Constants.VIDEOCALL_LISTENER_START_CALL_SUCCESS) {
      console.log("nvTien - DeepcareApp handleActionCallback change state call success ");
       
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_DISCONNECT_FRIEND) {

    } else if(callbackType === Constants.VIDEOCALL_LISTENER_ENDCALL_CB) {
      console.log("nvTien - DeepcareApp handleActionCallback change state end call cb ");
     
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_NEW_CALL_CB) {
      console.log("nvTien - DeepcareApp handleActionCallback change state new call cb ");
     // this.doVideocallScreen();
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_NEW_MESSAGE_CB) {
      this.handleNewMessage(props.newMessage);
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_BUSY_CB) {
      
    } else if(callbackType === Constants.VIDEO_CALL_ONCONNECT_SOCKET){
      
    } else if(callbackType === Constants.VIDEO_CALL_DISCONNECT_SOCKET){
            
    }
  }  

  doVideocallScreen() {
    //this.navigator && this.navigator.dispatch(NavigationActions.navigate({ routeName: ScreenName.Screen_VideoCall }));
  }

  handleNewMessage(newMessage) {
    console.log(`nvTien - newMessage: ${JSON.stringify(newMessage)}`);
    if(newMessage.message == null && newMessage.message === "") {
        return;
    }
    let title = "Thông Báo";
    let content = "";
    let typeMsg = newMessage.message.typeMsg;
    let objectMsg = newMessage.message.content;
    console.log(`nvTien - newMessage typeMsg `+ typeMsg + ` objectMsg: ${JSON.stringify(objectMsg)}`);
    if(typeMsg === Constants.VIDEOCALL_SEND_MSG_REQ_APPOINT) {
      content = this.loadContentReqAppoint(objectMsg.patientName, objectMsg.time, objectMsg.date);
    } else {
      return;
    }
    this.showNotifycation(title, content);
    this.playVibrationMsg();
  }

  loadContentReqAppoint(patientName, time, date) {
    let result = "Bạn vừa nhận được yêu cầu khám từ bệnh nhân ";
    result = result + patientName + " đặt hẹn lúc "
    + time + " ngày " + date + " vui lòng vào lịch khám bệnh để biết thêm chi tiết và xác nhận cuộc hẹn.";
    return result;

  }

  loadContentDeclinecall(doctorName, time, date) {
    let result = Translate(DefineKey.Notifycation_doctor_decline_call_01);
    result = result + doctorName + Translate(DefineKey.Notifycation_doctor_decline_call_02) + time + Translate(DefineKey.Notifycation_doctor_decline_call_03) + date;
    return result;
  }

  showNotifycation(title, content){
    this.notif.localNotif(title, content);
  }

  clearTimer() {
    clearInterval(this.state.timer);
  }

  playVibrationMsg() {
    Vibration.vibrate(PATTERN)
  }

  cancelVibration() {
    Vibration.cancel();
  }

  componentWillUnmount() {
    //this.clearTimer();
    
  }

  render() {
    return (
        <RootStack ref={nav => { this.navigator = nav; }}/>
    );
  }
}


export const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginContainer,
      navigationOptions: {
        title: Translate(DefineKey.AppNavigation_title_login),
        headerBackTitle: null
      }
    },
    // VideoCall: {
    //   screen: VideoCall
    // },
    Help: {
      navigationOptions: {
        title: Translate(DefineKey.Help_title),
        headerBackTitle: null
      },
      screen: Help
    },
    TermOfService: {
      navigationOptions: {
        title: Translate(DefineKey.AppNavigation_title_term_service)
      },
      screen: TermOfService
    },
    Profile: {
      navigationOptions: {
        title: Translate(DefineKey.Profile_head_title),
        headerBackTitle: null,
        
      },
      screen: ProfileContainer
    },
    Main: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: Main
    },
    PatientProfile: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: PatientProfile
    },
    VideoCallContainer: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: VideoCallContainer
    },
    ResetPassword: {
      screen: ResetPasswordContainer,
      navigationOptions: {
        title: Translate(DefineKey.RESET_PASSWORD_HEADER_TITLE),
        headerBackTitle: null
      }
    },
    ChangePassword: {
      screen: ChangePasswordContainer,
      navigationOptions: {
        title: Translate(DefineKey.CHANGE_PASSWORD_HEADER_TITLE),
        headerBackTitle: null
      }
    },
    DoctorProfile:{
      screen: ShowDoctorProfileContainer,
      navigationOptions: {
        title: Translate(DefineKey.DOCTOR_PROFILE_HEADER_TITLE),
        headerBackTitle: null
      }
    },
    UpdateDoctorProfile:{
      screen: UpdateDoctorInfoContainer,
      navigationOptions: {
        title: Translate(DefineKey.Doctor_Info_Update_Header_Title),
        headerBackTitle: null
      }
    },
   SettingNotification:{
      screen: SettingNotifycationContainer,
      navigationOptions: {
      title: Translate(DefineKey.SETTING_NOTIFICATION_HEADER_TITLE),
      headerBackTitle: null
      }
    },


    



  },
  {
    initialRouteName: ScreenName.Screen_Login
    //initialRouteName: ScreenName.Screen_Appointment
    //initialRouteName: "VideoCallContainer"
    // initialRouteName: ScreenName.Screen_Profile
  }
);




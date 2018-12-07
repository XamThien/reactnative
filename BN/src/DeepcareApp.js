import React, { Component } from "react";
import { StyleSheet, ScrollView, Vibration, AsyncStorage, Alert } from "react-native";
import { createStackNavigator, NavigationActions } from "react-navigation";
import ResetPasswordContainer from "./containers/ResetPasswordContainner";
import ChangePasswordContainer from "./containers/ChangePasswordContainer";
import LoginContainer from "./containers/LoginContainer";
import VideoCallContainer from "./containers/VideoCallContainer";
import StartScreenContainer from "./containers/StartScreenContainer";
import Help from "./screen/help/Help";
import TermOfService from "./screen/term/TermOfService";
import RegisterContainer from "./containers/RegisterContainer";
import HomePages from "./navigation/HomeNavigationTabs";
import AppointmentContainer from "./containers/AppointmentContainer";
import ProfileContainer from "./containers/ProfileContainer";
import Main from './screen/main/Main';
import ScheduleManager from './screen/schedule/ScheduleManager';
import WaitingBooking from "./screen/home/schedule/booking/WaitingBookingModal";
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

import { RNNotificationBanner } from 'react-native-notification-banner';
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
      this.doVideocallScreen();
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_NEW_MESSAGE_CB) {
      this.handleNewMessage(props.newMessage);
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_BUSY_CB) {
      
    } else if(callbackType === Constants.VIDEO_CALL_ONCONNECT_SOCKET){

    } else if(callbackType === Constants.VIDEO_CALL_DISCONNECT_SOCKET){
      
    }
  }  

  doVideocallScreen() {
    this.navigator && this.navigator.dispatch(NavigationActions.navigate({ routeName: ScreenName.Screen_VideoCall }));
  }

  handleNewMessage(newMessage) {
    console.log(`nvTien - newMessage: ${JSON.stringify(newMessage)}`);
    if(newMessage.message == null && newMessage.message === "") {
        return;
    }
    let title = Translate(DefineKey.Notifycation_title);
    let content = "";
    let typeMsg = newMessage.message.typeMsg;
    let objectMsg = newMessage.message.content;
    console.log(`nvTien - newMessage typeMsg `+ typeMsg + ` objectMsg: ${JSON.stringify(objectMsg)}`);
    if(typeMsg === Constants.VIDEOCALL_SEND_MSG_CONFIRM_CALL) {
      content = this.loadContentAcceptcall(objectMsg.doctorName, objectMsg.time, objectMsg.date);
    } else if(typeMsg === Constants.VIDEOCALL_SEND_MSG_DECLINE_CALL) {
      content = this.loadContentDeclinecall(objectMsg.doctorName, objectMsg.time, objectMsg.date);
    } else {
      return;
    }
    this.showNotifycation(title, content);
    this.playVibrationMsg();
  }

  loadContentAcceptcall(doctorName, time, date) {
    let result = Translate(DefineKey.Notifycation_doctor_accepted_call_01);
    result = result + doctorName + Translate(DefineKey.Notifycation_doctor_accepted_call_02) 
    + time + Translate(DefineKey.Notifycation_doctor_accepted_call_03) + date + Translate(DefineKey.Notifycation_doctor_accepted_call_04);
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
    StartScreen: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: StartScreenContainer
    },
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
    Register: {
      navigationOptions: {
        title: Translate(DefineKey.AppNavigation_title_register),
        headerBackTitle: null
      },
      screen: RegisterContainer
    },
    HomePages: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: HomePages
    },
    Appointment: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: AppointmentContainer
    },
    Profile: {
      navigationOptions: {
        title: Translate(DefineKey.Profile_head_title),
        headerBackTitle: null,
        
      },
      screen: ProfileContainer
    },
    ScheduleManager: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: ScheduleManager
    },
    Main: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: Main
    },
    VideoCallContainer: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: VideoCallContainer
    },

    WaitingBooking: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: WaitingBooking
    },
    ResetPassword: {
      screen: ResetPasswordContainer,
      navigationOptions: {
        title: 'Reset Password',
        headerBackTitle: null
      }
    },
    ChangePassword: {
      screen: ChangePasswordContainer,
      navigationOptions: {
        title: 'Change Password',
        headerBackTitle: null
      }
    },

















  

  },
  {
    initialRouteName: ScreenName.Screen_ChangePassword
    //initialRouteName: ScreenName.Screen_Appointment
    //initialRouteName: "ScheduleManager"
    //initialRouteName: "WaitingBooking"












    
  }
);




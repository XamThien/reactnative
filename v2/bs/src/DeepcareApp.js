import React, { Component } from "react";
import { StyleSheet, ScrollView, Vibration, AsyncStorage, Alert } from "react-native";
import { createStackNavigator, NavigationActions } from "react-navigation";
import LoginContainer from "./containers/LoginContainer"; 
import Help from "../src/screen/help/Help";
import TermOfService from "../src/screen/term/TermOfService";
import MainScreen from "./navigation/MainNavigationTabs";
import UserProfileContainer from "./containers/UserProfileContainer";
import ShowDoctorProfileContainer from "./containers/ShowDoctorProfileContainer";
import UpdateDoctorInfoContainer from "./containers/UpdateDoctorInfoContainer";
import SettingNotifycationContainer from "./containers/SettingNotifycationContainer";
import ResetPasswordContainer from "./containers/ResetPasswordContainner";
import ChangePasswordContainer from "./containers/ChangePasswordContainer";
import ProfileContainer from "./containers/ProfileContainer";

import {Translate} from "./utils/Language";
import DefineKey from "./config/language/DefineKey";
import ScreenName from './commons/ScreenName';
import { isEmptyObject } from "./utils/Utils";
import Constants from "./commons/Constants";

const STEP_TIMEOUT = 1000;
var initTimer = 0;
const DURATION = 10000;
const PATTERN = [1000, 2000, 3000];
const USER_TYPE = 1;

export default class DeepcareApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    
  }

  

  componentWillMount = () => {
    
  };
  

  componentDidMount() {
   
  };

  componentWillReceiveProps(props) {
    
  
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
   
    LoginScreen: {
      screen: LoginContainer,
      navigationOptions: {
        title: Translate(DefineKey.Header_title_login),
        headerBackTitle: null
      }
    },
    HelpScreen: {
      screen: Help,
      navigationOptions: {
        title: Translate(DefineKey.Header_title_help),
        headerBackTitle: null
      }
    },
    MainScreen: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: MainScreen
    },
    UserProfileScreen: {
      screen: UserProfileContainer,
      navigationOptions: {
        title: Translate(DefineKey.Header_title_user_profile),
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
    Profile: {
      navigationOptions: {
        title: Translate(DefineKey.Profile_head_title),
        headerBackTitle: null,
        
      },
      screen: ProfileContainer
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
  
  },
  {
    initialRouteName: ScreenName.Screen_LoginScreen

    
  }
);




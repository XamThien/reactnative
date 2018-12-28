import React, { Component } from "react";
import { StyleSheet, ScrollView, Vibration, AsyncStorage, Alert } from "react-native";
import { createStackNavigator, NavigationActions } from "react-navigation";
import StartScreen from "../src/screen/startscreenn/StartScreen";
import LoginContainer from "./containers/LoginContainer"; 
import RegisterContainer from "./containers/RegisterContainer";
import FamilyManagerContainer from "./containers/FamilyManagerContainer";
import EditFamilyMemberContainer from "./containers/EditFamilyMemberContainer";
import UserManagerContainer from "./containers/UserManagerContainer";
import Help from "../src/screen/help/Help";
import TermOfService from "../src/screen/term/TermOfService";
import MainScreen from "./navigation/MainNavigationTabs";
import BookingContainer from "./containers/BookingContainer";
import UserProfileContainer from "./containers/UserProfileContainer";
import SettingNotifycationContainer from "./containers/SettingNotifycationContainer";

import ResetPasswordContainer from "./containers/ResetPasswordContainner";
import ChangePasswordContainer from "./containers/ChangePasswordContainer";

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
   
    StartScreen: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: StartScreen
    },
    LoginScreen: {
      screen: LoginContainer,
      navigationOptions: {
        title: Translate(DefineKey.Header_title_login),
        headerBackTitle: null
      }
    },
    RegisterScreen: {
      screen: RegisterContainer,
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
    TermOfServiceScreen: {
      screen: TermOfService,
      navigationOptions: {
        title: Translate(DefineKey.Header_title_term_of_service),
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
    BookingScreen: {
      screen: BookingContainer,
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
    },
    UserProfileScreen: {
      screen: UserProfileContainer,
      navigationOptions: {
        title: Translate(DefineKey.Header_title_user_profile),
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
  
    FamilyManger: {
      screen: FamilyManagerContainer,
      navigationOptions: {
        title: Translate(DefineKey.FAMILY_MANAGER_HEADER_TITLE),
        headerBackTitle: null
      }
    },
    EditFamilyMember: {
      screen: EditFamilyMemberContainer,
      navigationOptions: {
      title: Translate(DefineKey.FAMILY_MANAGER_HEADER_EDIT_TITLE),
      headerBackTitle: null
      }
    },
    UserManager:{
      screen: UserManagerContainer,
      navigationOptions: {
      title: Translate(DefineKey.USER_PROFILE_HEADER_TITLE),
      headerBackTitle: null
      }
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
    initialRouteName: ScreenName.Screen_StartScreen
    
  }
);




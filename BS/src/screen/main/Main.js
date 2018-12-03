import React, { Component } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
// import App from './App';
//Components
import HomePages from "../../navigation/HomeNavigationTabs";
import InfoComponent from "./InfoComponent";
import SettingsComponent from "./SettingsComponent";
import CloudComponent from "./CloudComponent";
//Screen names
import { Home, Info, Settings, Cloud } from "./screenNames";
import DrawerMenu from './DrawerMenu';
//Screen size
var { height, width } = Dimensions.get("window");

const Main = createDrawerNavigator(
  {
    Home: HomePages,
    Info: InfoComponent,
    Settings: SettingsComponent,
    Cloud: CloudComponent
  },
  {
    contentComponent: props => <DrawerMenu {...props}/>,
    contentOptions: {
      activeTintColor: "red",
      activeBackgroundColor : 'purple',
      
    },
    drawerWidth: width*0.8,
  }
);
export default Main;

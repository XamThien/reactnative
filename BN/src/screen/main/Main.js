import React, { Component } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text
} from "react-native";
import { createDrawerNavigator, DrawerItems,createStackNavigator } from "react-navigation";
// import App from './App';
//Components
import HomePages from "../../navigation/HomeNavigationTabs";
//Screen names
import { Home, ScheduleMenu, Help, Term,Info } from "./screenNames";
import DrawerMenu from './DrawerMenu';
//Screen size
var { height, width } = Dimensions.get("window");

const Main = createDrawerNavigator(
  {
    Home: HomePages,
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

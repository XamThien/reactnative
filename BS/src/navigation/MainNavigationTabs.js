import React from "react";
import { StyleSheet, Dimensions,Platform,PixelRatio  } from "react-native";
import { createMaterialTopTabNavigator  } from "react-navigation";
import StartScreen from "../screen/main/startscreen/StartScreen";
import WorkScheduleContainer from "../containers/WorkScheduleContainer";

import Icon from "react-native-vector-icons/Ionicons";
import {Translate} from "../utils/Language"
import DefineKey from "../config/language/DefineKey";

const MainNavigationTabs = createMaterialTopTabNavigator(
  
  {
    WorkSchedule: {
      screen: WorkScheduleContainer,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.MainNavigation_tab_work_schedule),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-calendar" color={tintColor} size={40} />
        )
      }
    },
    StartScreen2: {
      screen: StartScreen,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.MainNavigation_tab_examination_schedule),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-list-box" color={tintColor} size={40} />
        )
      }
    },
    StartScreen3: {
      screen: StartScreen,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.MainNavigation_tab_user_note),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-list" color={tintColor} size={40} />
        )
      }
    },
    StartScreen4: {
      screen: StartScreen,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.MainNavigation_tab_statistic),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-book" color={tintColor} size={40} />
        )
      }
    },
  },
  {
    initialRouteName: "WorkSchedule",
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnable: true,
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "white",
      showIcon: true,
      upperCaseLabel: false,
      style: {
        height: normalize(80),
        backgroundColor: "#48adc4",
        paddingTop: 0,
        margin: 0
      },
      iconStyle: {
        width: normalize(120),
        height: normalize(40) //Padding 0 here
      },
      indicatorStyle: {
        backgroundColor: "transparent"
        //backgroundColor: "red"
      },
      labelStyle: {
        fontSize: normalize(12),
        width: normalize(180),
      },
      tabStyle: {}
    }
  }
);

export default MainNavigationTabs;

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
  }
}

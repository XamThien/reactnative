import React from "react";
import {
  Image
} from "react-native";
import { createMaterialTopTabNavigator  } from "react-navigation";
import WorkCalendarContainer from "../containers/WorkCalendarContainer";
import ExaminationScheduleContainer from "../containers/ExaminationScheduleContainer";
import ExaminationContainer from "../containers/ExaminationContainer";
import StatisticContainer from "../containers/StatisticContainer";
import Icon from "react-native-vector-icons/Ionicons";
import {Translate} from "../utils/Language"
import DefineKey from "../config/language/DefineKey";

const HomePages = createMaterialTopTabNavigator(
   
  {
    WorkCalendarContainer: {
      screen: WorkCalendarContainer,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.HomeNavigation_title_work_calendar),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-calendar" color={tintColor} size={40} />
        )
      }
    },
  
    ExaminationScheduleContainer: {
      screen: ExaminationScheduleContainer,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.HomeNavigation_title_examination_schedule),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contact" color={tintColor} size={40} />
        )
      }
    },
    ExaminationContainer: {
      screen: ExaminationContainer,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.HomeNavigation_title_examination),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-list" color={tintColor} size={40} />
        )
      }
    },
    StatisticContainer: {
      screen: StatisticContainer,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.HomeNavigation_title_statistic),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-book" color={tintColor} size={40} />
        )
      }
    }
  },
  {
    initialRouteName: "WorkCalendarContainer",
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnable: true,
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "white",
      showIcon: true,
      upperCaseLabel: false,
      style: {
        height: 80,
        backgroundColor: "#48adc4",
        paddingTop: 0,
        margin: 0
      },
      iconStyle: {
        width: 120,
        height: 40 //Padding 0 here
      },
      indicatorStyle: {
        backgroundColor: "transparent"
        //backgroundColor: "red"
      },
      labelStyle: {
        fontSize: 12,
        width: 180,
      },
      tabStyle: {}
    },
   
  }
);


export default HomePages;

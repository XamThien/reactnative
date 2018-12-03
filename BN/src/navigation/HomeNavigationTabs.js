import React from "react";
import { createMaterialTopTabNavigator  } from "react-navigation";
import ScheduleManagerContainer from "../containers/ScheduleManagerContainer";
import Schedule from "../containers/ScheduleContainer";
import Note from "../screen/home/note/Note";
import BookExaminationContainer from "../containers/BookExaminationContainer";
import Icon from "react-native-vector-icons/Ionicons";
import {Translate} from "../utils/Language"
import DefineKey from "../config/language/DefineKey";

const HomePages = createMaterialTopTabNavigator(
  
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.HomeNavigation_title_shedule),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-calendar" color={tintColor} size={40} />
        )
      }
    },
    ScheduleManagerContainer: {
      screen: ScheduleManagerContainer,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.HomeNavigation_title_schedule_manager),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-list-box" color={tintColor} size={40} />
        )
      }
    },
    Note: {
      screen: Note,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.HomeNavigation_title_note),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-list" color={tintColor} size={40} />
        )
      }
    },
    BookExamination: {
      screen: BookExaminationContainer,
      navigationOptions: {
        tabBarLabel: Translate(DefineKey.HomeNavigation_title_book_exami),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-book" color={tintColor} size={40} />
        )
      }
    }
  },
  {
    initialRouteName: "Schedule",
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
    }
  }
);

export default HomePages;

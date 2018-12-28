import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import styles from "./StatisticStyle";
import HeaderComponent from "../../main/HeaderComponent";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";

export default class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _gotoProfile() {
    alert("Screen Profile");
  }

  componentDidMount = () => {
    this.props.loadDataProfile();
  }

  onWillFocus() {
    console.log("nvTien - Statistic will focus");
  }

  onDidFocus() {
    console.log("nvTien - Statistic did focus");
  }

  onWillBlur() {
    console.log("nvTien - Statistic will blur");
  }

  onDidBlur() {
    console.log("nvTien - Statistic did blur");
  }

  render() {
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <NavigationEvents
            onWillFocus={payload => {
              this.onWillFocus();
            }}
            onDidFocus={payload => {
              this.onDidFocus();
            }}
            onWillBlur={payload => {
              this.onWillBlur();
            }}
            onDidBlur={payload => {
              this.onDidBlur();
            }}
          />
          <View style={styles.layoutWrapContent}>
            <HeaderComponent {...this.props}  title={Translate(DefineKey.Statistic_title)}/>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}



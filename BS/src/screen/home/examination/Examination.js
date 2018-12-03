import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-navigation";
import styles from "./ExaminationStyle";
import CustomHeader from "../header/CustomHeader";
import HeaderComponent from "../../main/HeaderComponent";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";

export default class Examination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _gotoProfile() {
    alert("Screen Profile");
  }

  onWillFocus() {
    console.log("nvTien - Examination will focus");
  }

  onDidFocus() {
    console.log("nvTien - Examination did focus");
  }

  onWillBlur() {
    console.log("nvTien - Examination will blur");
  }

  onDidBlur() {
    console.log("nvTien - Examination did blur");
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
            <HeaderComponent {...this.props}  title={Translate(DefineKey.Examination_title)}/>
            
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

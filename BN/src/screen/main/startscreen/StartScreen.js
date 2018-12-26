import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./StartScreenStyle";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";

export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _gotoProfile() {
    alert("Screen Profile");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text>Hello World</Text>
        </View>
      </SafeAreaView>
    );
  }
}

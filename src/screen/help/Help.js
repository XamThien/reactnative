import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import styles from "./HelpStyle";
import {Translate} from "../../utils/Language"
import DefineKey from "../../config/language/DefineKey";

export class Help extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <View style={styles.layoutTop}>
              <Image
              resizeMode="contain"
                source={require("../../../assets/icon_start.png")}
                style={styles.imageTop}
              />
              <Text style={styles.textTop}>{Translate(DefineKey.Help_title)}</Text>
            </View>

            <View style={styles.layoutContent} />

            <View style={styles.layoutFooter} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default Help;

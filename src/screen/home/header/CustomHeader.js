import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./CustomHeaderStyle";
import ScreenName from '../../../commons/ScreenName';

import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";

export default class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowBtnBack: this.props.isShowBack
    };
  }

  redirectToProfileScreen() {
    this.props.navigation.navigate(ScreenName.Screen_Profile);
  }

  redirectToHelpScreen() {
    this.props.navigation.navigate(ScreenName.Screen_Help)
  }

  onPressBack() {
    this.props.navigation.pop();
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapContent}>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={() => this.onPressBack()}>
              <Image
                style={
                  !this.state.isShowBtnBack
                    ? styles.imgBackHide
                    : styles.imgBack
                }
                source={require("../../../../assets/icon_back_white.png")}
              />
            </TouchableOpacity>
            <Text style={styles.txtTitleHead}>{this.props.titleHead}</Text>
          </View>
          <View style={styles.rightHeader}>
            <View style={styles.viewInfo}>
              <TouchableOpacity style={styles.viewInfo} onPress={() => this.redirectToProfileScreen()}>
                <View style={styles.layoutLeftFooter}>
                  <Image
                    source={require("../../../../assets/icon_user_profile.png")}
                    style={styles.imageAcount}
                  />

                  <Text style={styles.textTitleAcount}>{Translate(DefineKey.CustomHeader_title)}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.viewHelp}>
              <TouchableOpacity
                onPress={() => this.redirectToHelpScreen()}
              >
                <Image
                  source={require("../../../../assets/icon_help_white.png")}
                  style={styles.imageHelp}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}


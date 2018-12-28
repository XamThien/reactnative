import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { StyleSheet, Platform, PixelRatio } from "react-native";
import Colors from "../../commons/Colors";
import Dimens from "../../commons/Dimensions";
import Fonts from "../../commons/Fonts";
import ScreenName from "../../commons/ScreenName";
import DefineKey from "../../config/language/DefineKey";
import { Translate } from "../../utils/Language";

export default class HeaderComponent extends Component {
  onOpenNavMenu() {
    console.log("nvTien - navigation..." + this.props.navigation);
    this.props.navigation.openDrawer();
  }
  onOpenProfile() {
    this.props.navigation.navigate(ScreenName.Screen_Profile);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button_nav}
          onPress={() => {
            this.onOpenNavMenu();
          }}
        >
          <Image
            style={styles.image_nav}
            source={require("../../../assets/icons/menu-icon.png")}
          />
        </TouchableOpacity>
        <View style={styles.layout_title}>
          <Text style={styles.txt_title}>{this.props.title}</Text>
        </View>

        <TouchableOpacity
          style={styles.button_profile}
          onPress={() => {
            this.onOpenProfile();
          }}
        >
          <View>
            <Image
              style={styles.image_nav}
              source={require("../../../assets/icon_user_profile.png")}
            />
          </View>
          <Text style={styles.text_profile}>
            {Translate(DefineKey.Profile_head_title)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    height: Dimens.height_header,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.defaultHeader
  },
  button_nav: {
    marginLeft: normalize(10),
    marginTop: normalize(20),
    position: "absolute"
  },
  text_profile: {
    color: Colors.white,
    fontSize: Dimens.size_12,
    textAlign: "center",
    fontFamily: Fonts.RobotoRegular
  },
  button_profile: {
    marginRight: normalize(10),
    // marginTop: normalize(15),
    position: "absolute",
    top: 5,
    right: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center"
  },
  image_nav: {
    width: normalize(30),
    height: normalize(30),
    flexDirection: "row",
    justifyContent: "center"
  },
  layout_title: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  txt_title: {
    fontSize: Dimens.size_20,
    fontWeight: "bold",
    color: Colors.white,
    alignSelf: "center"
  }
});

export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}

/**
 * author: nv HuyTV

param: Doctor Info Item
  title, 
  content

 */

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  PixelRatio
} from "react-native";
import Colors from "../commons/Colors";
import Dimens from "../commons/Dimensions";
import Fonts from "../commons/Fonts";

export default class DoctorInfoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.onPressShow = this.onPressShow.bind(this);
    this.showIcon = this.showIcon.bind(this);
  }

  componentDidMount() {
    // console.log('will mount');
    // alert('will mout');
  }
  onPressShow() {
    var show = this.state.show;
    if (show === true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
    return this.showIcon();
  }
  showIcon() {
    var show = this.state.show;
    if (show === true) {
      return require("../../assets/arrow_down.png");
    } else {
      return require("../../assets/arrow_right.png");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Image
            style={styles.info}
            source={require("../../assets/information.png")}
          />
          <Text style={styles.text_title} onPress={() => this.onPressShow()}>
            {this.props.title}
          </Text>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => this.onPressShow()}
          >
            <Image style={styles.icon_arrow} source={this.showIcon()} />
          </TouchableOpacity>
        </View>
        <View
          style={this.state.show === true ? styles.content : styles.hideContent}
        >
          <Text style={styles.text_content}>
            {
              this.props.content
            }
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: Dimens.size_10,
    alignItems: "center",
    width: Dimensions.get("screen").width
  },
  title: {
    flexDirection: "row",
    width: Dimensions.get("screen").width,
    backgroundColor: Colors.white,
    marginBottom: 1,
    height: normalize(50),
    alignItems: "center",
    alignSelf: "center"
  },
  info: {
    flexDirection: "column",
    alignSelf: "center",
    // marginTop: Dimens.size_10,
    marginRight: Dimens.size_10,
    marginLeft: Dimens.size_10,
    height: normalize(20),
    width: normalize(20)
    // alignSelf: "flex-start",
    // borderColor: "gray",
    // borderWidth: 1,
  },
  arrow: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: Dimens.size_10
    // borderColor: "gray",
    // borderWidth: 1,
  },
  icon_arrow: {
    height: normalize(20),
    width: normalize(20)
  },
  text_title: {
    flex: 2,
    fontSize: Dimens.size_20,
    color: Colors.black,
    flexDirection: "column",
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular
    // borderColor: "gray",
    // borderWidth: 1,
  },
  content: {
    width: Dimensions.get("screen").width,
    flexDirection:"row",
    justifyContent:"flex-start",
    paddingLeft: Dimens.size_10,
    paddingRight: Dimens.size_10,
    backgroundColor: Colors.white,
    paddingTop: Dimens.size_10,
    paddingBottom: Dimens.size_15,
  },
  text_content:{
    fontStyle: 'italic',
  },
  hideContent: {
    width: 0,
    height: 0,
    paddingLeft: Dimens.size_10,
    backgroundColor: Colors.white
  }
});
export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}

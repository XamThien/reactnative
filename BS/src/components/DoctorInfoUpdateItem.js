/**
 * author: nv HuyTV

param: Doctor Update Info Item card view
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
  PixelRatio,
  TextInput,
  KeyBoard
} from "react-native";
import Colors from "../commons/Colors";
import Dimens from "../commons/Dimensions";
import Fonts from "../commons/Fonts";

export default class DoctorInfoUpdateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      input_value:""
    };
    this.onPressShow = this.onPressShow.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.showIcon = this.showIcon.bind(this);
  }

  componentDidMount() {
    // console.log('will mount');
    // alert('will mout');
    this.setState({input_value: this.props.content});
    // alert('From item update: '+this.props.content);
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
  onChangeValue(value) {
    this.setState({ input_value: value});
    this.props.onChange(value);
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          
          <Text style={styles.text_title} onPress={() => this.onPressShow()}>
            {this.props.title+":"}
          </Text>
          
        </View>
        <View
          style={this.state.show === true ? styles.content : styles.hideContent}
        >
          {/* <Text style={styles.text_content}>{this.props.content}</Text> */}
          <TextInput
            style={styles.textInput}
            placeholder={
              this.props.title +
              "..."
            }
            autoCapitalize="none"
            editable={this.props.editable}
            autoCorrect={false}
            autoFocus={true}
            multiline={true}
            keyboardType="default"
            onSubmitEditing={() => KeyBoard.dismiss()}
            value={this.state.input_value}
            onChangeText={text => {
              this.onChangeValue(text.trim())
               }}
          />
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
    paddingBottom: 1,
    height: normalize(20),
    alignItems: "center",
    alignSelf: "center",

  },
 
  text_title: {
    flex: 2,
    marginLeft: Dimens.size_10,
    fontSize: Dimens.size_15,
    color: Colors.black,
    flexDirection: "column",
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular
  },
  content: {
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: Colors.white,
    // paddingTop: Dimens.size_10,
    paddingBottom: Dimens.size_15
  },
  text_content: {
    fontStyle: "italic"
  },
  hideContent: {
    width: 0,
    height: 0,
    paddingLeft: Dimens.size_10,
    backgroundColor: Colors.white
  },
  textInput: {
    width: '100%',
    borderRadius: Dimens.size_10,
    fontSize: Dimens.size_15,
    fontFamily: Fonts.RobotoRegular,
    borderColor: "gray",
    borderWidth: 1,
    textAlign:"left",
  },
});
export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}

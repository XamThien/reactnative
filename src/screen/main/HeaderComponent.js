import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { StyleSheet, Platform,PixelRatio } from "react-native";
import Colors from "../../commons/Colors";
import Dimens from "../../commons/Dimensions";
import Fonts from "../../commons/Fonts";

export default class HeaderComponent extends Component {

  onOpenNavMenu() {
    console.log("nvTien - navigation..." + this.props.navigation)
    this.props.navigation.openDrawer();
  }

  render() {
    return (
      <View style={styles.container}>
      <View style = {styles.layout_title}>
          <Text style ={styles.txt_title}>{this.props.title}</Text>
        </View>
        <TouchableOpacity style = {styles.button_nav} onPress = {() => {
            this.onOpenNavMenu();
        }}>
          <Image
            style={styles.image_nav}
            source={require("../../../assets/icons/menu-icon.png")}
          />
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
     position: 'absolute'
  },
  image_nav:{
    width: normalize(30), 
    height: normalize(30) 
  },
  layout_title:{
    width: "100%",
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  txt_title:{
    fontSize: Dimens.size_20,
    fontWeight: 'bold',
    color: Colors.white,
    alignSelf: 'center',
    
  }

});

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
  }
}

import React, { Component } from "react";
import { StyleSheet, Text, Image, View, Dimensions } from "react-native";

export default class BackgroundImage extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
          <Image style={styles.image}
            source={{ uri: this.props.image }}/>
        </View> 
        <View>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImagex: {
    // position:"absolute",
    // resizeMode: "cover",
    backgroundColor: 'transparent',
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: 'center',
    backgroundColor: "powderblue",
    justifyContent: "center"
  },
  imageContainer:{
    position: 'absolute', 
    top: 0, 
    left: 0, 
    height: Dimensions.get('screen').height ,
    width: Dimensions.get('screen').width 
  },
  image:{
    flex: 1, 
    resizeMode: "cover",
  }
});
// export default BackgroundImage;
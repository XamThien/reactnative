import { StyleSheet, Platform,PixelRatio } from "react-native";
import Colors from "../../commons/Colors";
import Dimens from "../../commons/Dimensions";
import Fonts from "../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center"
  },
  layoutWrapContent: {
    flex: 1,
    flexDirection: "column"
  },


});

export default styles;
export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
  }
}

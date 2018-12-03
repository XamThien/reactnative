import { StyleSheet } from "react-native";
import Colors from "./Colors";
import Dimens from "./Dimensions";
import Fonts from "./Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  commonButtonLogin: {
    width: normalize(150),
    height: normalize(45),
    backgroundColor: "#04a4f4",
    justifyContent: "center",
    margin: Dimens.size_10,
    borderRadius:Dimens.size_5
  },

  commonTextButtonLogin: {
    color: Colors.white,
    fontSize: Dimens.size_20,
    textAlign: "center",
    fontFamily: Fonts.RobotoRegular,
  },
  commonInput:{

  },
  commotTextInput:{
      
  }
});

export default styles;

export function normalize(size) {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}

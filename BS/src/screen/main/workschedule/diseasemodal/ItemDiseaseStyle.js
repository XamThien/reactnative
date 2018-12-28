import { StyleSheet, Platform, PixelRatio } from "react-native";
import Colors from "../../../../commons/Colors";
import Dimens from "../../../../commons/Dimensions";
import Fonts from "../../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  wrapContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: normalize(15),
    paddingBottom: normalize(10),
    paddingVertical: normalize(10),
    backgroundColor: Colors.colorItem,
    marginBottom: normalize(3)
    
  },
  layout_name: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "center"
  },
  name: {
    fontSize: Dimens.size_15,
    color: Colors.black,
    justifyContent: "center",
    fontFamily: Fonts.RobotoRegular
  },
  layout_check: {
    flex: 1.2,
  },
  check_type: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: Colors.colorItem,
    
  },

});

export default styles;

export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}

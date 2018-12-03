import { StyleSheet, Dimensions, Platform, PixelRatio } from "react-native";
import Colors from "../../../../commons/Colors";
import Dimens from "../../../../commons/Dimensions";
import Fonts from "../../../../commons/Fonts";
var { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  //style layout wrapper
  wrapContent: {
    width: width - 40,
    flexDirection: "column",
    borderRadius: Dimens.size_10,
    backgroundColor: Colors.baseBackground,
    flexWrap: "wrap",
    height: height / 2
  },
  viewLine: {
    marginTop: 0.2,
    height: 0.8,
    backgroundColor: Colors.gray
  },
  hideView:{
    width: 0,
    height: 0
  },
  //style layout content
  layout_content:{
    flex: 1,
    flexDirection: 'column',
    paddingBottom: normalize(60),
    backgroundColor:'red'
  },

  //style layout buttom accept call, decline call
  layoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    height: normalize (60),
    position: 'absolute',
    bottom:0,
   
  },
  btnFindDoctorDefault: {
    width: normalize(150),
    height: normalize(45),
    backgroundColor: Colors.button_default,
    justifyContent: "center",
    margin: Dimens.size_10,
    borderRadius: Dimens.size_5
  },
  textButton: {
    color: Colors.white,
    fontSize: Dimens.size_20,
    textAlign: "center",
    fontFamily: Fonts.RobotoBold
  }
});

export default styles;

export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}

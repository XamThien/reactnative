import { StyleSheet, Platform,PixelRatio } from "react-native";
import Colors from "../../../commons/Colors";
import Dimens from "../../../commons/Dimensions";
import Fonts from "../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.baseBackground,
    justifyContent: "center"
  },
  layoutWrapContent: {
    flex: 9,
    flexDirection: "column"
  },

  //style footer
  layoutContent: {
    flex: 1,
    flexDirection: "column"
  },
  layoutTopIcon: {
    flex: 3,
    flexDirection: "column"
  },
  //layout avata
  avataContainer: {
    flexDirection: "column",
    alignSelf: "center",
    marginTop: Dimens.size_8
  },
  avata: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: normalize(80) / 2,
    alignSelf: "center"
  },
  userNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: normalize(40),
    marginTop: Dimens.size_5
  },
  textUserName: {
    fontSize: Dimens.size_25,
    color: Colors.black,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular,
  },
  userArrow: {
    height: normalize(40),
    width: normalize(40),
    paddingBottom: Dimens.size_10
  },
  //layout all button
  wrapperButton: {
    flex: 8
  },
  layoutButton: {
    flexDirection: "row",
    marginLeft: Dimens.size_20,
    marginRight: Dimens.size_20
  },
  buttonLeft: {
    flex: 1,
    height: normalize(50),
    marginTop: Dimens.size_8,
    marginBottom: Dimens.size_8,
    marginRight: Dimens.size_8,
    backgroundColor: Colors.button_default,
    justifyContent: "center",
    borderRadius: Dimens.size_5
  },
  buttonRight: {
    flex: 1,
    height: normalize(50),
    marginTop: Dimens.size_8,
    marginBottom: Dimens.size_8,
    marginLeft: Dimens.size_8,
    backgroundColor: Colors.button_default,
    justifyContent: "center",
    borderRadius: Dimens.size_5
  },
  textButton: {
    fontSize: Dimens.size_15,
    color: Colors.white,
    alignItems: "center",
    alignSelf: "center",
    fontFamily: Fonts.RobotoBold,
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

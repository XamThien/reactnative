import { StyleSheet, Dimensions, Platform, PixelRatio } from "react-native";
import Dimens from "../../../../commons/Dimensions";
import Colors from "../../../../commons/Colors";
import Fonts from "../../../../commons/Fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "powderblue"
    // justifyContent: "center"
  },
  //style layout top
  layoutTop: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    // flex: 3,
  },
  imageTop: {
    width: normalize(80),
    height: normalize(80),
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimens.size_5
  },
  textTop: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: Dimens.size_25,
    marginTop: Dimens.size_5,
    fontFamily: Fonts.RobotoRegular
  },

  //style layout content
  layoutContent: {
    flexDirection: "column",
    flex: 8,
    width: normalize(300),
    alignSelf: "center"
  },
  textTitleInput: {
    fontSize: Dimens.size_15,
    marginTop: Dimens.size_10,
    fontFamily: Fonts.RobotoRegular
  },
  layoutInput: {
    width: normalize(300),
    height: normalize(40),
    backgroundColor: Colors.white,
    borderColor: "blue",
    marginBottom: Dimens.size_10,
    padding: Dimens.size_10,
    marginTop: Dimens.size_5,
    alignSelf: "center",
    color: "blue",
    flexDirection: "row"
  },
  input: {
    width: normalize(260),
    alignSelf: "center",
    height: normalize(40),
    color: "blue"
  },
  imageInput: {
    width: normalize(20),
    height: normalize(20),
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  //style button login default
  btnLogin: {
    width: normalize(120),
    height: normalize(45),
    backgroundColor: "#04a4f4",
    justifyContent: "center",
    alignSelf: "center",
    margin: Dimens.size_10,
    borderRadius: Dimens.size_5
  },
  textButton: {
    color: Colors.white,
    fontSize: Dimens.size_20,
    fontFamily: Fonts.RobotoRegular,
    textAlign: "center"
  },
  viewError: {
    flex: 1,
    flexDirection: "row"
  },
  hideViewError: {
    width: 0,
    height: 0
  },
  textError: {
    fontSize: Dimens.size_15,
    color: Colors.red,
    fontFamily: Fonts.RobotoRegular
  },
  textRegister: {
    alignSelf: "center",
    fontSize: Dimens.size_16,
    marginTop: Dimens.size_10,
    textDecorationLine: "underline",
    fontFamily: Fonts.RobotoRegular
  },
  //style button facebook, google

  //style layout footer
  layoutFooter: {
    flex: 1.3,
    flexDirection: "row"
  },
  layoutFooterHelp: {
    flexDirection: "column",
    width: normalize(80)
  },
  imageHelp: {
    width: normalize(40),
    height: normalize(40),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  textTitleHelp: {
    fontSize: Dimens.size_15,
    textAlign: "center"
  },
  //indicator loading
  indicatorLoading: {
    position: "absolute",
    zIndex: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center"
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

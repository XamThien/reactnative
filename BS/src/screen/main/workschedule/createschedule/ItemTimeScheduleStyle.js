import { StyleSheet, Platform, PixelRatio } from "react-native";
import Dimens from "../../../../commons/Dimensions";
import Colors from "../../../../commons/Colors";
import Fonts from "../../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(2)
  },
  layout_text_head: {
    flexDirection: "row",
    padding: normalize(10),
    backgroundColor: Colors.defaultHeader
  },
  text_header: {
    fontSize: Dimens.size_15,
    fontWeight: "bold",
    color: Colors.white
  },
  hideView: {
    width: 0,
    height: 0
  },
  wrap_content_white: {
    flexDirection: "row",
    backgroundColor: "#86c2d1",
    height: normalize(40),
    width: normalize(250),
    alignItems: "center",
    paddingLeft: normalize(10),
    paddingRight: normalize(10)
  },
  wrap_content_blue: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dae3f2",
    height: normalize(40),
    width: normalize(250),
    paddingLeft: normalize(10),
    paddingRight: normalize(10)
  },
  text_time_schedule: {
    flex: 3,
    color: Colors.black,
    fontSize: Dimens.size_15,
    alignSelf: 'center',
    fontFamily: Fonts.RobotoCondensedBold,
  },
  layout_wrap_checkbox:{
    flex:1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
  },
  layout_select_status: {
    marginRight: normalize(5),
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

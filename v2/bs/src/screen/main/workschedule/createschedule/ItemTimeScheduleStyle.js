import { StyleSheet, Platform, PixelRatio } from "react-native";
import Dimens from "../../../../commons/Dimensions";
import Colors from "../../../../commons/Colors";
import Fonts from "../../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flex: 1,
    flexDirection: "column",
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
    backgroundColor: "#dae3f2",
    height: normalize(40),
    alignItems: "center",
    paddingLeft: normalize(10),
    paddingRight: normalize(10)
  },
  wrap_content_blue: {
    flexDirection: "row",
    backgroundColor: Colors.gray_02,
    height: normalize(40),
    alignItems: "center",
    paddingLeft: normalize(10),
    paddingRight: normalize(10)
  },
  text_time_schedule: {
    color: Colors.black,
    fontSize: Dimens.size_15
  },
  layout_select_status: {
    width: normalize(120),
    height: normalize(30),
    backgroundColor: Colors.defaultHeader,
    position: "absolute",
    right: 0
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

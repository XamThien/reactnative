import { StyleSheet, Platform, PixelRatio } from "react-native";
import Colors from "../../../../commons/Colors";
import Dimens from "../../../../commons/Dimensions";
import Fonts from "../../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  wrapContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    paddingBottom: normalize(6),
    paddingVertical: normalize(6),
    borderBottomColor: Colors.gray,
    borderBottomWidth: normalize(1),
  },
  //style layout name
  layout_wrap_name: {
    flex: 7,
    alignItems: "center",
    flexDirection:'row',
  },
  text_time: {
    fontSize: Dimens.size_14,
    color: Colors.black
  },
  text_name: {
    fontSize: Dimens.size_14,
    color: Colors.black,
    fontWeight: "bold",
    marginLeft: normalize(6),
    flex: 1,
    flexWrap: 'wrap'
  },
  //style layout button status
  button_status_confirm: {
    flex: 3,
    flexDirection: 'row',
    width: normalize(60),  
    height: normalize(30),
    backgroundColor: Colors.button_default,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    borderRadius: Dimens.size_5
  },
  button_status_decline: {
    flex: 3,
    flexDirection: 'row',
    width: normalize(60),  
    height: normalize(30),
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    borderRadius: Dimens.size_5
  },
  button_status_call_now: {
    flex: 3,
    flexDirection: 'row',
    width: normalize(60),  
    height: normalize(30),
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    borderRadius: Dimens.size_5
  },
  text_btn_status: {
    color: Colors.white,
    fontSize: Dimens.size_14,
    fontFamily: Fonts.RobotoRegular,
    textAlign: "center"
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

import { StyleSheet, Dimensions,Platform,PixelRatio  } from "react-native";
import Colors from "../../../../commons/Colors";
import Dimens from "../../../../commons/Dimensions";
import Fonts from "../../../../commons/Fonts";

var screen = Dimensions.get("window");
const styles = StyleSheet.create({
  //style layout wrapper
  wrapContent: {
    width: screen.width - normalize(40),
    flexDirection: "column",
    borderRadius: Dimens.size_10,
    backgroundColor: Colors.baseBackground,
    flexWrap: 'wrap',
    height:normalize(280)
  },
  layoutFlatlist: {
    flexDirection: "column",
    minHeight: normalize(50),
    maxHeight: normalize(220),
  },
  flatlist:{
    flexGrow: 1, 
  },
  viewLine: {
    marginTop: 0.2,
    height: 0.8,
    backgroundColor: Colors.gray
  },

  //style layout button add
  layoutButtonAdd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avataContainer: {
    flex: 2,
    flexDirection: "column",
    alignSelf: "center",
    margin: Dimens.size_10
  },
  avata: {
    height: normalize(35),
    width: normalize(35),
    borderRadius: normalize(35) / 2,
    alignSelf: "center"
  },
  txtName: {
    flex: 9,
    fontSize: Dimens.size_20,
    color: Colors.black,
    justifyContent: "center",
    fontFamily: Fonts.RobotoRegular,
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

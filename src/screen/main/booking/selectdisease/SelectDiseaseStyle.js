import { StyleSheet, Dimensions,Platform,PixelRatio } from "react-native";
import Colors from "../../../../commons/Colors";
import Dimens from "../../../../commons/Dimensions";


var screen = Dimensions.get("window");
const styles = StyleSheet.create({
  //style layout wrapper
  wrapContent: {
    width: screen.width - 40,
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
    paddingLeft: Dimens.size_10,
    paddingBottom: Dimens.size_10,
  },
  flatlist:{
    flexGrow: 1, 

  },
  viewLine: {
    marginTop: 0.2,
    height: 0.8,
    backgroundColor: Colors.gray
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

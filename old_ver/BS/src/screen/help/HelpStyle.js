import { StyleSheet,Platform,PixelRatio } from "react-native";
import Dimens from "../../commons/Dimensions";
import Colors from "../../commons/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "powderblue",
    justifyContent: "center"
  },
  layoutTop: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1.5,
    backgroundColor: "powderblue"
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
    marginTop: Dimens.size_5
  },
  layoutContent: {
    flexDirection: "column",
    flex: 5,
    width: normalize(300),
    alignSelf: "center"
  },
 
  layoutFooter: {
    flex: 1,
    flexDirection: "row"
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

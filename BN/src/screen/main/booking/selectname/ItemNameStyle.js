import { StyleSheet,PixelRatio } from "react-native";
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
    backgroundColor: Colors.baseBackground,
  },
  avataContainer: {
    flex: 2,
    flexDirection: "column",
    alignSelf: "center",
    margin: Dimens.size_10
  },
  avata: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignSelf: "center"
  },
  txtName: {
    flex: 8,
    fontSize: Dimens.size_20,
    color: Colors.black,
    justifyContent: "center",
    fontFamily: Fonts.RobotoRegular,
  },

  txtNameSelected:{
    flex: 8,
    fontSize: Dimens.size_20,
    color: Colors.defaultHeader,
    justifyContent: "center",
    fontFamily: Fonts.RobotoRegular,
  },

  layoutChecked:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: "center"
  },
  imgChecked: {
    width: Dimens.size_30,
    height: Dimens.size_25,
    
  },
  hideImgChecked: {
    width: 0,
    height: 0,
    
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
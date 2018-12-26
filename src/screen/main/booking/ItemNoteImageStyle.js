import { StyleSheet,Platform,PixelRatio } from "react-native";
import Colors from "../../../commons/Colors";
import Dimens from "../../../commons/Dimensions";

const styles = StyleSheet.create({
  //style layout wrapper
  wrapContent:{
        flex: 1,
        flexDirection: 'column',
        width: normalize(80),
        height:normalize(100),
        margin:Dimens.size_5,
  },
  layoutIconDel:{
    height:Dimens.size_20,
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  iconDel:{
    width: Dimens.size_20,
    height:Dimens.size_20,
    alignItems: 'flex-end',
  },
  layoutImage:{
    flex:1,
    margin:5
  },
  image:{
    width:normalize(60),
    height:normalize(85),
    flex:1,
    alignSelf: 'center',
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

import { StyleSheet,Platform,PixelRatio } from "react-native";
import Colors from "../../../commons/Colors";
import Dimens from "../../../commons/Dimensions";
import Fonts from "../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  wrapContent:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: normalize(110),
        borderRadius: Dimens.size_20,
        backgroundColor: Colors.gray,
        height:normalize(40),
        justifyContent: "center"
        
  },
  wrapContentClick:{
    height:normalize(40),
    flex: 1,
     flexDirection: 'column',
    alignItems: 'center',
    width: normalize(110),
    borderRadius: Dimens.size_20,
    backgroundColor: Colors.green,
    justifyContent: "center"
  },

  textTime:{
    fontSize: Dimens.size_15,
    fontFamily: Fonts.RobotoBold,
    color:Colors.black,
    alignSelf: 'center',
   
  },
  textTimeClick:{
    fontSize: Dimens.size_15,
    fontFamily: Fonts.RobotoBold,
    color:Colors.white,
    alignSelf: 'center',

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

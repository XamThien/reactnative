import { StyleSheet, Platform, PixelRatio } from "react-native";
import Dimens from "../../commons/Dimensions";
import Colors from "../../commons/Colors";
import Fonts from "../../commons/Fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.baseBackground,
    justifyContent: "center"
  },
  layoutTop: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    backgroundColor: "powderblue"
  },
  imageTop: {
    width: normalize(45),
    height: normalize(45),
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimens.size_5
  },
  textTop: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: Dimens.size_18,
    marginTop: Dimens.size_5,
    fontFamily: Fonts.RobotoBold,
  },
  layoutContent: {
    flexDirection: "column",
    flex: 7,
    backgroundColor: "#d6d8db",
    margin: Dimens.size_10
  },
  layoutFooter: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent:'center'
    
  },
  layoutBtnFooter: {
    width: normalize(180),
    height: normalize(40),
    justifyContent:'flex-end',
    backgroundColor: "#d6d8db",
    alignItems: "center",
    marginRight: Dimens.size_20,
    flexDirection: 'row',
  },
  imgShare: {
    width: normalize(30),
    height: normalize(30),
    marginRight: Dimens.size_10,
  },
  textBtnSave:{
     paddingRight: Dimens.size_10,
      textAlign:'center',
      fontSize:Dimens.size_15,
      fontFamily: Fonts.RobotoBold,
    
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

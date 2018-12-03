import { StyleSheet,Platform,PixelRatio } from "react-native";
import Colors from '../../../commons/Colors'
import Dimens from '../../../commons/Dimensions'
import Fonts from "../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    height: Dimens.height_header
  },
  wrapContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.defaultHeader
  },
  leftHeader: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  imgBack:{
    width:Dimens.size_25,
    height:Dimens.size_25,
    marginLeft: 5,
    alignItems: 'center',
  },

  imgBackHide:{
    width:0,
    height:0,
    marginLeft: Dimens.size_5,
    alignItems: 'center',
  },
 
  txtTitleHead: {
    justifyContent: "center",
    paddingLeft: Dimens.size_5,
    fontSize: Dimens.size_20,
    color:'white',
    fontFamily: Fonts.RobotoBold,
  },
  //style footer
  rightHeader: {
    flex: 2.5,
    flexDirection: "row"
  },
  rightHeaderHide: {
    width:0,
    height:0,
    flexDirection: "row"
  },
  viewInfo: {
    flex: 3,
    flexDirection: "column",
  },
  viewHelp: {
    flex: 2,
    flexDirection: "column",
    justifyContent:'center'
  },
  imageHelp: {
    width: normalize(40),
    height:normalize(40),
    alignSelf: 'flex-end',
  },
  imageAcount: {
    width: normalize(30),
    height:normalize(30),
    alignSelf: 'center',
  },
  textTitleAcount: {
    fontSize: Dimens.size_12,
    textAlign: "center",
    fontFamily: Fonts.RobotoRegular,
    color: Colors.white
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

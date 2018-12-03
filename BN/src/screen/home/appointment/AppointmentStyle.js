import { StyleSheet,Platform,PixelRatio } from "react-native";
import Colors from "../../../commons/Colors";
import Dimens from "../../../commons/Dimensions";
import Fonts from "../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.baseBackground,
    justifyContent: "center"
  },
  layoutWrapContent: {
    flex: 1,
    flexDirection: "column"
  },
  wrapContent: {
    flex:1,
    flexDirection: 'column',
    marginLeft: Dimens.size_10,
    marginRight: Dimens.size_10,
  },

  //style layout content scrollview
  layoutContent:{
    flex: 9,
    flexDirection: 'column',
  },
  
  itemSelect: {
    height: normalize(65),
    flexDirection: "row"
  },

  avataContainer: {
    flex: 2,
    flexDirection: "column",
    alignSelf: "center",
    margin: Dimens.size_10
  },
  avata: {
    height: normalize(55),
    width: normalize(55),
    borderRadius: normalize(55) / 2,
    alignSelf: "center"
  },

  imageContainer: {
    flex: 2,
    flexDirection: "column",
    alignSelf: "center",
    margin: Dimens.size_10
  },
  image: {
    height: normalize(35),
    width: normalize(35),
    alignSelf: "center"
  },

  itemArrow: {
    width: Dimens.size_20,
    height: Dimens.size_20,
    flex: 1,
    alignItems: "center",
    alignSelf: "center"
  },

  itemContent: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center"
  },
  textTitleAppoint: {
    fontSize: Dimens.size_16,
    color: "black",
    fontFamily: Fonts.RobotoBold,
  },
  textUserName: {
    fontSize: Dimens.size_15,
    color: "gray",
    fontFamily: Fonts.RobotoRegular,
  },
  viewLine: {
    marginTop: 0.2,
    height: 0.8,
    backgroundColor: Colors.gray
  },
  layoutSuggestTime: {
    flexDirection: "column",
    paddingTop: Dimens.size_10
  },
  textErrorSelectTime: {
    color: Colors.black,
    fontSize: Dimens.size_15,
    paddingLeft: Dimens.size_10,
    paddingRight: Dimens.size_10,
    fontFamily: Fonts.RobotoRegular,
  },
  layoutFlatlistTime: {
    height: normalize(50),
    marginTop: Dimens.size_10,
    marginBottom: Dimens.size_10
  },

  //   style select Video
  layoutSelectVideo: {
    flexDirection: "row",
    alignSelf: "center",
    height: normalize(70),
    alignItems: "center"
  },

  buttonVideo: {
    marginRight: Dimens.size_10
  },

  viewCallVideo: {
    flexDirection: "row",
    width: normalize(120),
    height: normalize(40),
    borderRadius: Dimens.size_20,
    backgroundColor: Colors.green,
    justifyContent: "flex-start"
  },
  buttonPhone: {
    marginLeft: Dimens.size_10
  },

  viewPhone: {
    flexDirection: "row",
    width: normalize(120),
    height: normalize(40),
    borderRadius: Dimens.size_20,
    backgroundColor: Colors.gray,
    justifyContent: "flex-start"
  },
  imageVideo: {
    width: Dimens.size_20,
    height: Dimens.size_20,
    marginLeft: Dimens.size_20,
    marginRight: Dimens.size_10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  textVideo: {
    fontSize: Dimens.size_15,
    alignSelf: "center",
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
  },

  textPhone: {
    fontSize: Dimens.size_15,
    alignSelf: "center",
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
  },
  //style layout add note
  layoutAddNote: {
    flex: 1,
    marginLeft: Dimens.size_10,
    marginRight: Dimens.size_10,
    marginTop: Dimens.size_20,
    marginBottom: Dimens.size_25,
    flexDirection: "row"
  },
  iconAdd: {
    flex: 1,
    width: Dimens.size_28,
    height: Dimens.size_28
  },
  layoutAddContent: {
    flex: 8,
    flexDirection: "column",
    paddingLeft: Dimens.size_5,
    paddingRight:Dimens.size_5
  },
  layoutListImageNote: {
    flexDirection: "column",
    height: normalize(120)
  },
  hideLayoutListImageNote: {
    flexDirection: "column",
    height: 0
  },

  txtComment:{
    minHeight: normalize(30), 
    height: 'auto',
    fontSize:Dimens.size_16,
    color:Colors.gray,
    fontFamily: Fonts.RobotoRegular,
  },

  //style layout button footer
  layoutButtonFooter:{
    flex:1,
    height:Dimens.height_header,
    flexDirection: 'column',
    backgroundColor:Colors.defaultHeader,
    justifyContent: 'center',
  },
  textBtnSave:{
    alignSelf: 'center',
    color:Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize:Dimens.size_20
  },
  
  //indicator loading
  indicatorLoading: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    position:"absolute",
    zIndex: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
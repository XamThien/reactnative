import { StyleSheet,Platform,PixelRatio  } from "react-native";
import Dimens from "../../commons/Dimensions";
import Colors from "../../commons/Colors";
import Fonts from "../../commons/Fonts";


const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.baseBackground,
    justifyContent: "center"
  },
  layoutWrapContent: {
    flex: 9,
    flexDirection: "column"
  },
  //style layout top
  layoutTop: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  
  imageTop: {
    width: normalize(80),
    height: normalize(80),
    justifyContent: "center",
    alignItems: "center",
    marginTop: normalize(5)
  },
  textTop: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: Dimens.size_25,
    fontFamily: Fonts.RobotoRegular,
    marginTop: Dimens.size_5
  },
  //style content
  layoutContent: {
    flexDirection: "column",
    flex: 7,
    width: normalize(300),
    alignSelf: "center"
  },
  textTitleInput: {
    fontSize: Dimens.size_15,
    marginTop: Dimens.size_10,
    fontFamily: Fonts.RobotoRegular,
  },
  layoutInput: {
    width: normalize(300),
    height: normalize(40),
    backgroundColor: "white",
    borderColor: Colors.blue,
    padding: Dimens.size_10,
    marginTop: 5,
    alignSelf: "center",
    color: Colors.blue,
    flexDirection: "row"
  },
  input: {
    width: normalize(260),
    alignSelf: "center",
    height: normalize(40),
    color: Colors.blue,
    fontSize: Dimens.size_14,
    fontFamily: Fonts.RobotoRegular,
  },
  imageInput: {
    width: Dimens.size_20,
    height: Dimens.size_20,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  viewError:{
    flex: 1, flexDirection: "row" 
  },
  hideViewError:{
    width:0,
    height:0
  },

  txtNotiPass: {
    fontSize: Dimens.size_15,
    color: Colors.red,
    fontFamily: Fonts.RobotoRegular,
  },
  txtNotiPassLevel: {
    fontSize: Dimens.size_15,
    color: Colors.red,
    fontFamily: Fonts.RobotoBold,
  },

  textError: {
    fontSize: Dimens.size_15,
    color: Colors.red,
    fontFamily: Fonts.RobotoRegular,
  },

  viewEmpty: {
    height: normalize(40)
  },

  //indicator loading
  indicatorLoading: {
    position:"absolute",
    zIndex: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',

  },

  //style footer
  layoutFooter: {
    flex: 1,
    flexDirection: "row"
  },
  layoutLeftFooter: {
    flexDirection: "column",
    width: normalize(80),
    flex: 2
  },
  imageHelp: {
    width: normalize(40),
    height: normalize(40),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  textTitleHelp: {
    fontSize: Dimens.size_15,
    textAlign: "center",
    fontFamily: Fonts.RobotoRegular,
  },
  viewFooterButton: {
    alignSelf: "center",
    flex: 5
  },
  btnRegister: {
    width: normalize(200),
    height: normalize(45),
    backgroundColor: "#04a4f4",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius:Dimens.size_5
  },
  textButton: {
    color: Colors.white,
    fontSize: Dimens.size_20,
    fontFamily: Fonts.RobotoRegular,
  },
  viewRightFooter: {
    flex: 2
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

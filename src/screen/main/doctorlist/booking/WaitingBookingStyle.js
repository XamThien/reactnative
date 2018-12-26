import { StyleSheet, Dimensions, Platform, PixelRatio } from "react-native";
import Colors from "../../../../commons/Colors";
import Dimens from "../../../../commons/Dimensions";
import Fonts from "../../../../commons/Fonts";
var { height, width } = Dimensions.get("window");
var widthDialog = width - 40;

const styles = StyleSheet.create({
  //style layout wrapper
  wrapContent: {
    width: widthDialog,
    flexDirection: "column",
    borderRadius: Dimens.size_10,
    backgroundColor: Colors.baseBackground,
    flexWrap: "wrap",
    height: height / 2
  },
  viewLine: {
    marginTop: 0.2,
    height: 0.8,
    backgroundColor: Colors.gray
  },
  hideView:{
    width: 0,
    height: 0
  },
  
  //style layout content
  layout_content:{
    flex: 1,
    flexDirection: 'column',
    paddingBottom: normalize(60),
   
  },
  indicator:{
    width: widthDialog,
    height: normalize(50),
   
  },

  layout_waiting_confirm:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
  },

  
  //style layout description
  layout_input_booking:{
    flex: 1,
    flexDirection: "column",
  },
  layout_wrap_description: {
    minHeight: normalize(40),
    maxHeight: normalize(200),
    marginLeft: normalize(10),
    marginRight: normalize(10),
    marginTop: normalize(20),
    backgroundColor: Colors.white,
    justifyContent: "center",
    borderRadius: Dimens.size_5
  },
  text_title_des:{
    fontSize: Dimens.size_14,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    paddingLeft: normalize(5),
  },
  text_description:{
    color: Colors.black,
    fontSize: Dimens.size_20,
    textAlign: "center",
    alignSelf: 'center',
    fontFamily: Fonts.RobotoBold,
    marginTop: normalize(20)
  },
  //style layout đợi xác nhận từ bác sĩ
  layout_wrap_waiting_confirm:{
    flex: 1,
    flexDirection: "column",

  },
  layoutTopIcon: {
    flexDirection: "column",
    marginBottom: Dimens.size_20,
  },
  //layout avata
  avataContainer: {
    flexDirection: "column",
    alignSelf: "center",
    marginTop: Dimens.size_8
  },
  avata: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: normalize(80) / 2,
    alignSelf: "center"
  },
  userNameContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: Dimens.size_5,
    
  },
  textUserName: {
    fontSize: Dimens.size_25,
    color: Colors.black,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular,
  },
  textEducation: {
    fontSize: Dimens.size_15,
    color: Colors.gray,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular,
  },

  textWaiting_confirm: {
    fontSize: Dimens.size_15,
    color: Colors.black,
    alignSelf: "center",
    fontFamily: Fonts.RobotoCondensedRegular,
  },

  //style layout buttom accept call, decline call
  layoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    height: normalize (60),
    position: 'absolute',
    bottom:0,
  },
  btnFindDoctorDefault: {
    width: widthDialog,
    height: normalize(45),
    backgroundColor: Colors.button_default,
    justifyContent: "center",
    margin: Dimens.size_10,
    borderRadius: Dimens.size_5
  },
  textButton: {
    color: Colors.white,
    fontSize: Dimens.size_20,
    textAlign: "center",
    fontFamily: Fonts.RobotoBold
  }
});

export default styles;

export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}

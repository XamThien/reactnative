import { StyleSheet, Platform, PixelRatio } from "react-native";
import Dimens from "../../../../commons/Dimensions";
import Colors from "../../../../commons/Colors";
import Fonts from "../../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.white
  },
  //style layout header
  layout_wrap_header: {
    height: Dimens.height_header,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.defaultHeader
  },
  button_nav: {
    marginLeft: normalize(10),
    marginTop: normalize(20),
    position: "absolute"
  },
  image_nav: {
    width: normalize(30),
    height: normalize(30)
  },
  layout_title: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  txt_title: {
    fontSize: Dimens.size_18,
    fontWeight: "bold",
    color: Colors.white
  },
  //style layout content
  layout_wrap_content: {
    flex: 1,
    flexDirection: "column"
  },
  //top content patient profile
  layout_top_profile: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#6f4fa8"
  },
  //layout avata patient
  layout_avata: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  avataContainer: {
    flexDirection: "column",
    alignSelf: "center",
    marginTop: Dimens.size_8
  },
  avata: {
    height: normalize(120),
    width: normalize(120),
    borderRadius: normalize(120) / 2,
    alignSelf: "center"
  },
  userNameContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: Dimens.size_5,
    color: Colors.whi
  },
  textUserName: {
    fontSize: Dimens.size_25,
    color: Colors.white,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular
  },
  textUser_time: {
    fontSize: Dimens.size_15,
    color: Colors.gray,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular,
    marginTop: normalize(5)
  },
  //style layout list selection
  layout_list_selection: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white,
    
  },
  //style first list selection
  layout_list_first: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Colors.white
  },
  layout_list_wrap_item:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  layout_item :{
    height: normalize(80),
    width: normalize(80),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    borderRadius: normalize(20),
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  img_list_selection:{
    width: normalize(50),
    height: normalize(50),

  },
  title_list_selection:{
    fontSize: Dimens.size_15,
    color: Colors.black,
    paddingVertical: normalize(10),

  },
  //style second list selection
  layout_list_second: {
    flex: 1,
    flexDirection: 'row'
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

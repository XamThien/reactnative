import { StyleSheet, Platform, Dimensions, PixelRatio } from "react-native";
import Colors from "../../../../commons/Colors";
import Dimens from "../../../../commons/Dimensions";
import Fonts from "../../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    // backgroundColor: Colors.baseBackground,
    justifyContent: "center"
  },
  layoutWrapContent: {
    flex: 10,
    flexDirection: "column"
  },
  // banner section
  banner: {
    // flexDirection: "column",
    height: Dimensions.get("screen").height * 0.25
  },
  btn_edit: {
    marginTop: Dimens.size_10,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: Dimens.size_5
  },
  icon_edit: {
    width: 15,
    height: 15,
    marginRight: Dimens.size_5
  },
  text_btn_edit: {
 
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    textDecorationLine: "underline",
    fontSize: Dimens.size_15,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.green
  },
  main_banner: {
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: Dimens.size_10
  },
  avatar_container: {
    paddingLeft: Dimens.size_15,
    flexDirection: "column",
    alignSelf: "flex-end",

    width: Dimensions.get("screen").width 
    // borderColor: "gray",
    // borderWidth: 1,
  },
  avatar: {
    height: normalize(100),
    width: normalize(100),
    borderRadius: normalize(90) / 2,
    alignSelf: "center"
  },
  userNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Dimens.size_5
  },
  textUserName: {
    fontSize: Dimens.size_20,
    color: Colors.black,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular,
    fontWeight:"bold"
  },
  textInput: {
    width: '100%',
    borderRadius: Dimens.size_10,
    fontSize: Dimens.size_15,
    fontFamily: Fonts.RobotoRegular,
    borderColor: "gray",
    borderWidth: 1,
    textAlign:"left",
    marginLeft: 5,
    marginRight: 5,
  },
  // list doctor info item
  info:{
    flexDirection:"column",
    paddingTop: Dimens.size_10,
    marginBottom: 40,
  },
  // row card view
  row_container: {
    flexDirection: "column",
    marginBottom: Dimens.size_10,
    alignItems: "center",
    width: Dimensions.get("screen").width
  },
  title: {
    flexDirection: "row",
    width: Dimensions.get("screen").width,
    backgroundColor: Colors.white,
    paddingBottom: 1,
    height: normalize(20),
    alignItems: "center",
    alignSelf: "center",

  },
 
  text_title: {
    flex: 2,
    marginLeft: Dimens.size_10,
    fontSize: Dimens.size_15,
    color: Colors.black,
    flexDirection: "column",
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular
  },
  row_content: {
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: Colors.white,
    // paddingTop: Dimens.size_10,
    paddingBottom: Dimens.size_5
  },
  text_content: {
    fontStyle: "italic"
  },

  textInput: {
    width: '100%',
    borderRadius: Dimens.size_10,
    fontSize: Dimens.size_15,
    fontFamily: Fonts.RobotoRegular,
    borderColor: "gray",
    borderWidth: 1,
    textAlign:"left",
  },

  // //layout all item
  // layoutItem: {
  //   flexDirection: "row",
  //   paddingLeft: Dimens.size_15,
  //   alignItems: 'center',
  //   marginTop: Dimens.size_10,
  //   marginBottom: Dimens.size_10,
  // },
  // itemImage: {
  //   width: Dimens.size_30,
  //   height: Dimens.size_30,

  // },
  // itemText: {
  //   marginLeft: Dimens.size_10,
  //   fontSize: Dimens.size_20,
  //   color: Colors.black
  // },

  //style layout footer
  layoutFooter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    position:"absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  layoutButton: {
    height: normalize(45),
    width: normalize(150),
    backgroundColor: Colors.button_default,
    borderRadius: normalize(5),
    justifyContent: "center",
    marginBottom:Dimens.size_5
  },
  textButton: {
    fontSize: Dimens.size_20,
    color: Colors.white,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular,
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

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

    width: Dimensions.get("screen").width * 0.5
    // borderColor: "gray",
    // borderWidth: 1,
  },
  avatar: {
    height: normalize(90),
    width: normalize(90),
    borderRadius: normalize(90) / 2,
    alignSelf: "flex-start"
  },
  userNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Dimens.size_5
  },
  textUserName: {
    fontSize: Dimens.size_20,
    color: Colors.black,
    alignSelf: "flex-start",
    fontFamily: Fonts.RobotoRegular,
    fontWeight:"bold"
  },
  rating_container: {
    flexDirection: "column",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    width: Dimensions.get("screen").width * 0.5
    // borderColor: "gray",
    // borderWidth: 1,
  },
  rating: {
    flexDirection: "row",
    alignSelf: "flex-end"
  },
  // interactive
  interactive: {
    marginTop:Dimens.size_10,
    backgroundColor: Colors.white,
    flexDirection: "row",
    height:50
  },
  right: {
    flexDirection:"column",
    width: Dimensions.get("screen").width * 0.5,
    justifyContent:"center",
    alignItems:"center"
  },
  left: {
    flexDirection:"column",
    width: Dimensions.get("screen").width * 0.5,
    justifyContent:"center",
    alignItems:"center"
  },
  number:{
    fontWeight: 'bold',
    fontSize: Dimens.size_20,
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular
  },
  interactive_item:{
    fontSize: Dimens.size_15,
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular
  },
  info:{
    flexDirection:"column",
    paddingTop: Dimens.size_10,
    marginBottom: Dimens.size_15,
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

  // //style layout footer
  // layoutFooter: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "center"
  // },
  // layoutButton: {
  //   height: normalize(45),
  //   width: normalize(150),
  //   backgroundColor: Colors.button_default,
  //   borderRadius: normalize(5),
  //   justifyContent: "center"
  // },
  // textButton: {
  //   fontSize: Dimens.size_20,
  //   color: Colors.white,
  //   alignSelf: "center",
  //   fontFamily: Fonts.RobotoRegular,
  // }
});

export default styles;
export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}

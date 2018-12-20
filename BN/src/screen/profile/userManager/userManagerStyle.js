import { StyleSheet, Dimensions,Platform,PixelRatio  } from "react-native";
import Colors from "../../../commons/Colors";
import Dimens from "../../../commons/Dimensions";
import Fonts from "../../../commons/Fonts";

var screen = Dimensions.get("window");
const styles = StyleSheet.create({
  //style layout wrapper
  container:{
    marginTop: Dimens.size_15,
    flexDirection: "column",
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    paddingLeft: Dimens.size_10,
    paddingRight: Dimens.size_10,
  },
  wrapContent: {
    width: screen.width - normalize(40),
    flexDirection: "column",
    borderRadius: Dimens.size_10,
    backgroundColor: Colors.baseBackground,
    flexWrap: 'wrap',
    height:normalize(280)
  },
  layoutFlatlist: {
    flexDirection: "column",
    minHeight: normalize(50),
    maxHeight: normalize(220),
  },
  flatlist:{
    flexGrow: 1, 
  },
  viewLine: {
    marginTop: 0.2,
    height: 0.8,
    backgroundColor: Colors.gray
  },

  //style layout button add
  layoutButtonAdd: {
    backgroundColor: Colors.button_default,
    marginTop: Dimens.size_15,
    width: Dimensions.get('screen').width * 0.5,
  },
  layoutTopIcon: {
    flexDirection: "column",
    marginBottom: Dimens.size_20,
    justifyContent: "center",
  },
  //layout avata
  avataContainer: {
    // flex:2,
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
    // flex:2,
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: Dimens.size_5,
    
  },
  textUserName: {
    fontSize: Dimens.size_25,
    color: Colors.black,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular,
  },
  icon_edit:{
    width: 15,
    height:15,
    marginRight: Dimens.size_5,
  },
  btn_edit:{
    top:0,
    flexDirection:"row",
    justifyContent: "flex-end",
    alignSelf:"flex-end",
    textDecorationLine: "underline",
    fontSize: Dimens.size_15,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.green,
  },
  txtName: {
    flex: 9,
    fontSize: Dimens.size_15,
    color: Colors.black,
    justifyContent: "center",
    alignItems:"center",
    alignSelf:"center",
    fontFamily: Fonts.RobotoRegular,

  },
  field_row:{
    flexDirection:"row",
    alignItems:"center",
    lineHeight: Dimens.size_50,
    height: 40,
    backgroundColor: Colors.white,
    marginBottom: Dimens.size_5,
    paddingLeft:Dimens.size_10,
  },
  label:{
    width: '40%',
  },
  label_text:{
    textTransform: 'uppercase',
    fontSize: Dimens.size_20,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
  value:{
    width: '60%',
    // flexDirection:'row', 
    // flex: 1, 
    // flexWrap: 'wrap'
  },
  text_value:{
    
    fontSize: Dimens.size_20,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    // flexWrap: 'wrap',
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

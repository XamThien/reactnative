import { StyleSheet, Dimensions,Platform,PixelRatio  } from "react-native";
import Dimens from "../../commons/Dimensions";
import Colors from "../../commons/Colors";
import Fonts from "../../commons/Fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: 'center',
    // backgroundColor: "powderblue",
    justifyContent: "center"
  },
  maincontain:{
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: Dimens.size_10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: "center",
    paddingRight: Dimens.size_10,
    paddingLeft: Dimens.size_10,
    height: Dimensions.get('screen').height * 0.5,
    width: Dimensions.get('screen').width * 0.8
  },
  title:{
    fontSize: Dimens.size_25,
    // paddingTop: Dimens.size_10,
    textAlign:"center",
    fontFamily:Fonts.RobotoBold
  },
  content:{
    paddingTop: Dimens.size_10,
    justifyContent: "center",
    alignItems: 'center'
  },
  textInput: {
    borderRadius: Dimens.size_15,
    fontSize: Dimens.size_15,
    marginTop:Dimens.size_10,
    paddingTop: Dimens.size_5,
    fontFamily: Fonts.RobotoRegular,
    borderColor: "gray",
    borderWidth: 1,
    // alignItems: 'center',
    textAlign:"left",
    width: Dimensions.get('screen').width * 0.7
  },
  textTitleInput: {
    fontSize: Dimens.size_15,
    marginTop: Dimens.size_10,
    fontFamily: Fonts.RobotoRegular,
  },
  button:{
    
    height: normalize(45),
    backgroundColor: Colors.red,
    marginTop:Dimens.size_20,
    marginLeft: 1,
    paddingTop: Dimens.size_10,
    paddingRight: Dimens.size_10,
    paddingLeft: Dimens.size_10,
    paddingTop: Dimens.size_10,
    paddingBottom: Dimens.size_10,
    borderRadius: Dimens.size_10,
    borderWidth: 1,
    borderColor:"powderblue"
  },
  //style layout top
  layoutTop: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  imageTop: {
    width: normalize(80),
    height: normalize(80),
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimens.size_5
  },
  textTop: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: Dimens.size_25,
    marginTop: Dimens.size_5,
    fontFamily: Fonts.RobotoRegular,
  },

  //style layout content
  layoutContent: {
    flexDirection: "column",
    flex: 8,
    width: normalize(300),
    alignSelf: "center"
  },

  layoutInput: {
    width: normalize(300),
    height: normalize(40),
    backgroundColor: Colors.white,
    borderColor: "blue",
    marginBottom: Dimens.size_10,
    padding: Dimens.size_10,
    marginTop: Dimens.size_5,
    alignSelf: "center",
    color: "blue",
    flexDirection: "row"
  },
  input: {
    width: normalize(260),
    alignSelf: "center",
    height: normalize(40),
    color: "blue"
  },
  imageInput: {
    width: normalize(20),
    height: normalize(20),
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  //style button login default
  btnLogin: {
    width: normalize(120),
    height: normalize(45),
    backgroundColor: "#04a4f4",
    justifyContent: "center",
    alignSelf: "center",
    margin: Dimens.size_10,
    borderRadius:Dimens.size_5
  },
  textButton: {
    color: Colors.white,
    fontSize: Dimens.size_20,
    fontFamily: Fonts.RobotoRegular,
    textAlign: "center"
  },
  textRegister: {
    alignSelf:"center",
    fontSize: Dimens.size_16,
    marginTop: Dimens.size_10,
    textDecorationLine: "underline",
    fontFamily: Fonts.RobotoRegular,
  },
  //style button facebook, google

  //style layout footer
  layoutFooter: {
    flex: 1.3,
    flexDirection: "row",
  },
  layoutFooterHelp: {
    flexDirection: "column",
    width: normalize(80)
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
    textAlign: "center"
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
 

});

export default styles;

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
  }
}

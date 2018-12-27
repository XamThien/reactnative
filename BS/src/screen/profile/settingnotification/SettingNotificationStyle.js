import { StyleSheet, Dimensions,Platform,PixelRatio  } from "react-native";
import Colors from "../../../commons/Colors";
import Dimens from "../../../commons/Dimensions";
import Fonts from "../../../commons/Fonts";

var screen = Dimensions.get("window");
const styles = StyleSheet.create({
  //style layout wrapper

  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: Colors.baseBackground
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
    height: Dimensions.get('screen').height * 0.4,
    width: Dimensions.get('screen').width * 0.8
  },
  title:{
    fontSize: Dimens.size_25,
    paddingBottom: Dimens.size_30,
    textAlign:"center",
    fontFamily:Fonts.RobotoBold
  },
  row:{
    flexDirection: "row",
    marginBottom: Dimens.size_10,
  },
  label:{
    width: '80%',
    fontSize: Dimens.size_25,
    fontFamily: Fonts.RobotoRegular,
  },

  value:{
    width: '20%',
    flexDirection:"row",
    justifyContent:"flex-end",
  },
  checkbox:{
    marginRight:10,
  },
  input:{
    paddingBottom: 15,
    flexDirection:"column",
    alignSelf: 'center',
    justifyContent:"center",
    borderColor: "gray",
    textAlign: 'center',
    borderWidth: 1,
    height:30,
    width: 30,
    paddingTop: 0, 
    paddingBottom: 0,

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

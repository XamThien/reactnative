import { StyleSheet,PixelRatio, Dimensions } from "react-native";
import Colors from "../commons/Colors";
import Dimens from "../commons/Dimensions";
import Fonts from "../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container:{
    flexDirection: "column",
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    alignSelf:"center"

  },
  wrapContent: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.baseBackground,
    width: Dimensions.get('screen').width * 0.9,
    marginTop: Dimens.size_5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: Dimens.size_5,
  },
  avataContainer: {
    flex: 3,
    flexDirection: "column",
    alignSelf: "center",
    margin: Dimens.size_10
  },
  avata: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignSelf: "center"
  },
  nameSection:{
    flex: 8,
    flexDirection:"column",
  },
  txtName: {
    fontSize: Dimens.size_20,
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
  },
  txtRelationship:{
    fontSize: Dimens.size_15,
    color: Colors.black,
    fontFamily: Fonts.RobotoRegular,
    fontStyle: 'italic'
  },
  btn_action:{
    top: 0,
    flexDirection:"column",
    justifyContent: "center",
    marginRight: Dimens.size_15,

  },
  btn_del:{
    width:25,
    height:25,
    marginBottom:  Dimens.size_10,
  },
  btn_edit:{
    width:25,
    height:25,
  },
  
  txtNameSelected:{
    flex: 8,
    fontSize: Dimens.size_20,
    color: Colors.defaultHeader,
    justifyContent: "center",
    fontFamily: Fonts.RobotoRegular,
  },

  layoutChecked:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: "center"
  },
  imgChecked: {
    width: Dimens.size_30,
    height: Dimens.size_25,
    
  },
  hideImgChecked: {
    width: 0,
    height: 0,
    
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
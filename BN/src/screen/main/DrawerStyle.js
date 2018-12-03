import { StyleSheet, Platform, PixelRatio } from "react-native";
import Dimens from "../../commons/Dimensions";
import Colors from "../../commons/Colors";
import Fonts from "../../commons/Fonts";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.baseBackground,
    paddingTop: normalize(10),
  },
  layout_wrap_menu: {
    flexDirection: "column",
    paddingLeft: normalize(20),
    paddingRight: normalize(20),
    paddingTop: normalize(10)
  },
  layout_wrap_avata: {
    flexDirection: 'column',
    height: normalize(120),
    alignItems: "center",
    justifyContent: "center"
  },
  img_avata:{
    height: normalize(80),
    width: normalize(80), 
    borderRadius: normalize(40)
  },
  layout_menuItem:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: normalize(1),
    borderBottomColor: Colors.gray,
  },
  icon_menu:{
    width: normalize(20),
    height: normalize(20),
    
  },
  menuItemClick:{
    padding: normalize(10), 
    color: Colors.blue,
    fontSize: Dimens.size_16,
    fontWeight: 'bold',
    paddingTop: normalize(10),
    paddingBottom: normalize(10),
  },
  menuItem: {
    padding: normalize(10),
    color: Colors.black,
    fontSize: Dimens.size_16,
    fontWeight: 'bold',
    paddingTop: normalize(10),
    paddingBottom: normalize(10),
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

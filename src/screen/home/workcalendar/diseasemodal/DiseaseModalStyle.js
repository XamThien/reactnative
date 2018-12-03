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
  layout_top: {
    flexDirection: "column",
    marginLeft: normalize(15),
    marginRight: normalize(15)
  },
  layout_header: {
    flexDirection: "row",
    height: normalize(45),
    alignItems: "center"
  },
  image_header_delete: {
    width: normalize(20),
    height: normalize(20)
  },
  layout_button_save: {
    width: normalize(60),
    height: normalize(40),
    flexDirection: "row",
    backgroundColor: Colors.blue,
    borderRadius: Dimens.size_5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0
  },
  txt_save: {
    fontSize: Dimens.size_14,
    fontWeight: "bold",
    color: Colors.white
  },
  layout_head_title: {
    minHeight: normalize(60),
    maxHeight: normalize(100),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    flex:1,
    
  },
  text_title: {
    fontSize: Dimens.size_15,
    fontWeight: "bold",
    color: Colors.black,
   
  },
  viewLine: {
    height: normalize(1),
    backgroundColor: Colors.gray,
    marginTop: normalize(10),
  },
  hide_view:{
    width: 0,
    height: 0
  },
  flatlist:{
    
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

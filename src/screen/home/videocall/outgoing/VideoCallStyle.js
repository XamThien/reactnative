import { StyleSheet, Platform, PixelRatio, Dimensions } from "react-native";
import Colors from "../../../../commons/Colors";
import Dimens from "../../../../commons/Dimensions";
import Fonts from "../../../../commons/Fonts";
var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  //style layout wrapper
  container_image: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  wrap_content: {
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
  wrap_video_call: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  //hiển thị video phía bệnh nhân, sau khi nhấn startcall thành công
  videoview_partner:{
    flex: 1,
    flexDirection: "column",
    width: width,
    height: height,
    
  },
  hideView: {
    width: 0,
    height: 0
  },
  layout_header_video_call: {
    height: normalize(50),
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#60000000",
    position: "absolute",
    top: 0
  },
  style_text: {
    color: Colors.white
  },
  icon_switch_camera: {
    marginRight: normalize(10)
  },

  //style layout footer button control
  layout_footer_video_call: {
    height: normalize(70),
    width: "70%",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: normalize(50),
    marginRight: normalize(50),
  
  },
  layout_controller_01:{
    flex: 1,
    flexDirection: 'column',
  },
  layout_controller_02:{
    flex: 1,
    flexDirection: 'column',
  },
  layout_controller_03:{
    flex: 1,
    flexDirection: 'column',
  },
  icon_control_video: {
    width: normalize(60),
    height: normalize(60),
    alignSelf: 'center',
  },
  //layout infomation patient
  layout_infomation: {
    height: height /2,
    position: "absolute",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: 'center',
   
  },
  avata_patient: {
    width: normalize(120),
    height: normalize(120),
   
  },
  //style layout videocall, video local
  layout_video_local:{
      width: normalize(120),
      height: normalize(150),
      position: 'absolute',
      top: 0,
      right: 0,
      marginTop: normalize(40),
     
  },
  layout_video_local_full:{
    backgroundColor:'red',
    width: normalize(120),
    height: normalize(150),
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: normalize(10)
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

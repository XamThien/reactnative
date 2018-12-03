import { StyleSheet, Platform, PixelRatio } from "react-native";
import Dimens from "../../../commons/Dimensions";
import Colors from "../../../commons/Colors";
import Fonts from "../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.baseBackground,
    justifyContent: "center"
  },
  layoutWrapContent: {
    flex: 1,
    flexDirection: "column"
  },
  wrap_head_calendar: {
    height: normalize(80),
    paddingBottom: normalize(10),
    flexDirection: "row"
  },
  head_calendar: {
    height: normalize(80),
    flex: 5
  },
  //style icon refresh data
  btn_refresh_data:{
    position: 'absolute',
    top: 0,
    left:0
  },
  img_refresh_data:{
    width: normalize(30),
    height: normalize(30)
  },
  //style layout time schedule
  wrap_time_schedule: {
    flex: 1,
    flexDirection: "row",
    padding: normalize(10),
  },
  //list time
  list_time_schedule: {
    flex: 1.5,
    marginTop: normalize(10),
  },
  timeContainerStyle:{
    
  },
  //content
  right_content_schedule: {
    flex: 6,
    flexDirection: 'column'
  },
  wrap_box: {
    height: '100%',
    borderRadius: 4,
    borderWidth: 0.5,
    marginLeft: normalize(5),
    borderColor: Colors.black,
    flexDirection: 'column',
  },
  top_box: { 
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  top_box_text: {
    fontSize: Dimens.size_15,
    fontWeight: 'bold',
    padding: normalize(8)
  },
  content_box: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
    paddingBottom: normalize(10),
  },
  hideLayout: {
      width: 0,
      height: 0
  },
  //style layout button create new schedule
  layout_create_schedule: {
    flex: 1,
    flexDirection: "column",
    margin: normalize(10),
    alignItems:'center',
    justifyContent: 'center'

  },
  layout_button_create: {
      width: normalize(120),
      height: normalize(40),
      backgroundColor: Colors.button_default,
      margin: Dimens.size_10,
      borderRadius:Dimens.size_5,
      alignItems: 'center',
      justifyContent: 'center'
  },
  txt_button_create:{
      fontSize: Dimens.size_14,
      color: Colors.white,
      
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

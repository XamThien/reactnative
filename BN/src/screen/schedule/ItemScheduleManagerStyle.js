import { StyleSheet, Platform,PixelRatio } from "react-native";
import Colors from "../../commons/Colors";
import Dimens from "../../commons/Dimensions";
import Fonts from "../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    
  },
  view_line:{
    width: '100%',
    height: normalize(1),
    backgroundColor: Colors.gray,
    marginTop: normalize(5),
  },
  layout_wrap_content:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: normalize(25),
  },

  //style layout left image
  layout_wrap_left:{
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_left:{
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(60) /2,
  }, 
  //style layout right content infomation
  layout_wrap_right:{
    flex: 6,
    flexDirection: 'column',
    paddingLeft: normalize(10),
    
  },
  text_info_name:{
    fontSize: Dimens.size_18,
    color: Colors.black,
    fontWeight: 'bold',
    fontFamily: Fonts.RobotoCondensedRegular,
    paddingTop: normalize(5),
  },
  text_info_education:{
    fontSize: Dimens.size_14,
    color: Colors.gray,
    fontFamily: Fonts.RobotoCondensedRegular,
    paddingVertical: normalize(2),
   
  },
 
  //style layout date and time
  layout_wrap_date:{
    flexDirection: 'row',
    paddingVertical: normalize(2),
    alignItems: 'center',
  },
  //style layout time
  layout_time:{
    flexDirection: 'row',
    marginRight: normalize(10),
  },
  img_appoint_time:{
    width: normalize(15),
    height: normalize(15),
    marginRight: normalize(5),
  },
  txt_appoint_time:{
    fontSize: Dimens.size_14,
    color: Colors.black,
    fontFamily: Fonts.RobotoCondensedRegular,
  },
  //style layout date
  layout_date:{
    flexDirection: 'row',
  },
  img_appoint_date:{
    width: normalize(18),
    height: normalize(18),
    marginRight: normalize(5),
  },
  txt_appoint_date:{
    fontSize: Dimens.size_14,
    color: Colors.black,
    fontFamily: Fonts.RobotoCondensedRegular,
  },
  //style layout description
  layout_wrap_description:{
    flexDirection: 'column',
   
  },
  text_type_call:{
    fontSize: Dimens.size_14,
    color: Colors.black,
    fontFamily: Fonts.RobotoCondensedRegular,
  },
  text_disease:{
    paddingVertical: normalize(2),
    fontSize: Dimens.size_14,
    color: Colors.black,
    fontFamily: Fonts.RobotoCondensedRegular,
  },
  //style layout confirm from doctor, pending, accepted, decline
  layout_confirm_accepted:{
    width: normalize(120),
    height: normalize(25),
    borderRadius: normalize(30),
    marginRight: normalize(10),
    backgroundColor: "#1ADF1A",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  text_confirm_accepted:{
    fontSize: Dimens.size_12,
    color: Colors.white,
    fontFamily: Fonts.RobotoCondensedRegular,
  },
  layout_confirm_pending:{
    width: normalize(120),
    height: normalize(25),
    borderRadius: normalize(30),
    marginRight: normalize(10),
    backgroundColor: Colors.gray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  text_confirm_pending:{
    fontSize: Dimens.size_12,
    color: Colors.white,
    fontFamily: Fonts.RobotoCondensedRegular,
  },
  layout_confirm_decline:{
    width: normalize(120),
    height: normalize(25),
    borderRadius: normalize(30),
    marginRight: normalize(10),
    backgroundColor: Colors.red,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  text_confirm_decline:{
    fontSize: Dimens.size_12,
    color: Colors.white,
    fontFamily: Fonts.RobotoCondensedRegular,
  },
  //style button delete 
  layout_delete_appoint:{
    marginTop: normalize(5),
    marginRight: normalize(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0
  },
  icon_delete_appoint: {
    width: normalize(20),
    height: normalize(20),
  },
  hide_view:{
      width: 0,
      height: 0
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

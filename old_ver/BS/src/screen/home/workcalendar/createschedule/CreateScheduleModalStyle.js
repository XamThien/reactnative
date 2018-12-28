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
    minHeight: normalize(40),
    maxHeight: normalize(80),
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: normalize(40),
    marginRight: normalize(20)
  },
  text_title: {
    fontSize: Dimens.size_22,
    fontWeight: "bold",
    color: Colors.black
  },
  viewLine: {
    height: normalize(1),
    backgroundColor: Colors.gray
  },
  hide_view:{
    width: 0,
    height: 0
  },
  //style layout content
  layout_wrap_content: {
    flexDirection: "column"
  },
  layout_wrap_input_time: {
    paddingLeft: normalize(15),
    paddingRight: normalize(15),
    flexDirection: "column",
    marginBottom: normalize(20)
  },
  layout_wrap_choose_date: {
    flexDirection: "column",
    marginTop: normalize(15)
  },
  layout_select_all_date: {
    flexDirection: "row",
    alignItems: "center"
  },
  layout_text_all_date: {
    flex: 4,
    flexDirection: "row"
  },
  image_select_all_date: {
    width: normalize(20),
    height: normalize(20)
  },
  text_select_all_date: {
    fontSize: Dimens.size_16,
    color: Colors.black,
    marginLeft: normalize(18)
  },
  layout_switch_all_date: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  check_all_date: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "white",
    
  },
  //style layout choose start-date, end-date
  layout_wrapper_choose_time:{
    flexDirection: 'column',
    paddingBottom: normalize(80),
  },
  text_title_schedule:{
    color: Colors.black,
    fontSize: Dimens.size_15,
    fontWeight: 'bold',
    marginTop: normalize(10)
  },
  layout_wrapper_time_morning:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrap_start_time: {
    flexDirection: "row",
    marginTop: normalize(10),
    alignItems: "center",
    marginLeft: 0,
    marginLeft:normalize(20),
  },
  txt_title_start_time: {
    fontSize: Dimens.size_16,
    color: Colors.black,
    marginRight: normalize(10),
  },
  layout_button_start_time: {
    width: normalize(60),
    height: normalize(40),
    borderWidth: normalize(2),
    borderRadius: Dimens.size_5,
    borderColor: Colors.gray,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray_white
  },
  layout_input_start_time: {
    width: normalize(60),
    height: normalize(40),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  txt_start_time: {
    fontSize: Dimens.size_16,
    color: Colors.black
  },
  wrap_end_time: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginRight: normalize(20),
    bottom: 0,
    right: 0
  },

  layout_wrap_minueExamination:{
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: normalize(15),
    marginRight: normalize(20)
    
  },

  //style text check result input time
  button_check_time: {
    minWidth: normalize(250),
    height: normalize(25),
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 0,
   
  },
  txt_check_time: {
    minWidth: normalize(250),
    fontSize: Dimens.size_15,
    color: Colors.blue,
    textDecorationLine: "underline",
    fontWeight: "bold",
    
  },

  //style layout optional
  layout_wrap_optional: {
    flexDirection: "column",
    margin: normalize(15)
  },
  text_title_optional: {
    fontSize: Dimens.size_18,
    color: Colors.black,
    fontWeight: "bold",
    marginTop: normalize(15),
  },
  layout_list_time_schedule:{
    marginTop: normalize(15),
  },
  layout_wrap_disease: {
    flexDirection: "column",
    paddingLeft: normalize(38)
  },
  layout_disease: {
    flexDirection: "row"
  },

  text_number_disease: {
    fontSize: Dimens.size_15,
    color: Colors.black,
    marginTop: normalize(10)
  },
  button_select_disease: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0
  },
  image_add_disease: {
    width: normalize(30),
    height: normalize(30)
  },

  //layout list time schedule for setting of doctor
  layout_list_chedule:{
    flexDirection: 'column',
    marginBottom: normalize(20),
    marginLeft: normalize(15),
    marginRight: normalize(15),
  },
  title_list_schedule: {
    fontSize: Dimens.size_18,
    color: Colors.black,
    fontWeight: "bold",
    marginTop: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },


  //layout set location name
  layout_add_location:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10)
  },
  image_add_location:{
    width: normalize(25),
    height: normalize(25)
  },
  button_add_location:{
    minHeight: normalize(30),
    flexDirection: 'column',
    justifyContent: 'center'
  },
  layout_wrap_text_location:{
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
  },
  text_add_location_holder:{
    fontSize: Dimens.size_15,
    color: Colors.gray,
  },
  text_add_location_name:{
    color: Colors.black,
    fontSize: Dimens.size_16,

  },
  text_add_location_sub_name:{
    color: Colors.gray,
    fontSize: Dimens.size_14,
  },
  //layout add note doctor
  txt_title_add_note: {
    fontSize: Dimens.size_15,
    color: Colors.black,
    marginTop: normalize(15),
    marginLeft: normalize(5)
  },
  layout_wrap_add_note: {
    flex: 1,
    width: "100%",
    marginTop: normalize(5),
    flexDirection: "row",
    borderColor: Colors.gray,
    borderRadius: normalize(8),
    borderWidth: normalize(1),
    backgroundColor: Colors.gray_white
  },
  txt_input_add_note: {
    minHeight: normalize(60),
    maxHeight: normalize(200),
    minWidth: normalize(250),
    height: "auto",
    fontSize: Dimens.size_16,
    color: Colors.black,
    padding: normalize(10)
  },
  txt_input_add_location: {
    height: normalize(40),
    minWidth: normalize(250),
    fontSize: Dimens.size_16,
    color: Colors.black,
    paddingLeft: normalize(10)
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

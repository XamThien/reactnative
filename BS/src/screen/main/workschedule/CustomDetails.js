import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { StyleSheet, Platform, PixelRatio } from "react-native";
import Colors from "../../../commons/Colors";
import Dimens from "../../../commons/Dimensions";
import Fonts from "../../../commons/Fonts";
import { convertMilliToTime } from "../../../utils/Utils";

import { Translate } from "../../../utils/Language";
import DefineKey from "../../../config/language/DefineKey";

export default class CustomDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailsTime: false,
      titleShowTime: Translate(DefineKey.Custom_detail_view_time_detail)
    };
  }

  //load danh sách bệnh mà bác sĩ đăng ký khám trong ngày 
  loadDisease(diseases) {
    let result = "";
    if (diseases != null && diseases.length != 0) {
      for (let i = 0; i < diseases.length; i++) {
        let objectDisease = diseases[i];
        if (result === "") {
          result = objectDisease.disease_name;
        } else {
          result = result + "," + "\n" + objectDisease.disease_name;
        }
      }
    }
    return result;
  }
  //lấy ra danh sách thời gian khám
  loadDetailsTime(timeAvailable) {
    let result = "";
    if (timeAvailable != null && timeAvailable !== "") {
      var arrTime = timeAvailable.split(";");
      if (arrTime != null && arrTime.length != 0) {
        for (let i = 0; i < arrTime.length; i++) {
          let time = arrTime[i];
          if (result === "") {
            result = convertMilliToTime(time);
          } else {
            result = result + " , " + convertMilliToTime(time);
          }
        }
      }
    }
    return result;
  }

  //hiển thị ẩn hiện layout thời gian
  onShowTime() {
    let textShowtime = !this.state.isShowDetailsTime
      ? Translate(DefineKey.Custom_detail_hidden_time)
      : Translate(DefineKey.Custom_detail_view_time_detail);
    this.setState({
      isShowDetailsTime: !this.state.isShowDetailsTime,
      titleShowTime: textShowtime
    });
  }

  render() {
    return (
      <ScrollView>
        <View
          style={this.props.isShowDetails ? styles.container : this.hideView}>
            {/* hiển thị title*/}
          <View style={styles.layout_title}>
            <Text style={styles.txt_title}>
              {Translate(DefineKey.Custom_detail_title)}:{" "}
            </Text>
            <Text style={styles.txt_content_title}>
              {this.props.detailsSchedule.schedule_name}
            </Text>
          </View>

          {/* hiển thị chi tiết thời gian bắt đầu, thời gian kết thúc */}
          <View style={styles.layout_time}>
            <View style={styles.layout_title}>
              <Text style={styles.txt_title_time}>
                {Translate(DefineKey.Item_time_schedule_morning)}:{" "}
              </Text>
              <Text style={styles.txt_content_title}>
                {Translate(DefineKey.Create_schedule_start_time)} {convertMilliToTime(this.props.detailsSchedule.start_time_am)} -> {convertMilliToTime(this.props.detailsSchedule.end_time_am)}
              </Text>
            </View>
            <View style={styles.layout_title}>
              <Text style={styles.txt_title_time}>
                {Translate(DefineKey.Item_time_schedule_afternoon)}:{" "}
              </Text>
              <Text style={styles.txt_content_title}>
                {Translate(DefineKey.Create_schedule_start_time)} {convertMilliToTime(this.props.detailsSchedule.start_time_pm)} ->  {convertMilliToTime(this.props.detailsSchedule.end_time_pm)}
              </Text>
            </View>
          </View>

          {/* hiển thị số phút khám*/}
          <View style={styles.layout_title}>
            <Text style={styles.txt_title}>
              {Translate(DefineKey.Custom_detail_time_length)}:{" "}
            </Text>
            <Text style={styles.txt_content_title}>
              {this.props.detailsSchedule.minute}{" "}
              {Translate(DefineKey.Custom_detail_minute)}
            </Text>
          </View>
          {/* hiển thị địa chỉ khám bệnh*/}
          <View style={styles.layout_title}>
            <Text style={styles.txt_title}>
              {Translate(DefineKey.Custom_detail_address)}:{" "}
            </Text>
            <Text style={styles.txt_content_title}>
              {this.props.detailsSchedule.location}
            </Text>
          </View>

          {/* hiển thị danh sách bệnh khám*/}
          <View style={styles.layout_disease}>
            <Text style={styles.txt_title}>
              {Translate(DefineKey.Custom_detail_list_disease)}:{" "}
            </Text>
            <Text style={styles.txt_content_disease}>
              {this.loadDisease(this.props.detailsSchedule.disease)}
            </Text>
          </View>
          {/* hiển thị ghi chú*/}
          <View style={styles.layout_title}>
            <Text style={styles.txt_title}>
              {Translate(DefineKey.Custom_detail_note)}:{" "}
            </Text>
            <Text style={styles.txt_content_title}>
              {this.props.detailsSchedule.description}
            </Text>
          </View>

          {/* hiển thị list các mốc thời gian khám*/}
          <View style={styles.layout_detail_time}>
            <TouchableOpacity
              onPress={() => {
                this.onShowTime();
              }}
            >
              <Text style={styles.txt_title_details_time}>
                {this.state.titleShowTime}
              </Text>
            </TouchableOpacity>
            <Text
              style={
                this.state.isShowDetailsTime
                  ? styles.txt_content_details_time
                  : styles.hideView
              }
            >
              {this.loadDetailsTime(this.props.detailsSchedule.time_available)}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flex: 1,
    flexDirection: "column"
  },
  button_nav: {
    marginLeft: normalize(10),
    marginTop: normalize(20),
    position: "absolute"
  },
  image_nav: {
    width: normalize(30),
    height: normalize(30)
  },
  layout_title: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: normalize(5)
  },
  txt_title: {
    fontSize: Dimens.size_18,
    fontWeight: "bold",
    color: Colors.black
  },
  txt_content_title: {
    fontSize: Dimens.size_18,
    color: Colors.black
  },
  layout_time: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  txt_title_time: {
    fontSize: Dimens.size_18,
    fontWeight: "bold",
    color: Colors.black,
    alignSelf: "center"
  },
  layout_disease: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: normalize(5)
  },
  txt_content_disease: {
    fontSize: Dimens.size_18,
    color: Colors.black,
    alignSelf: "center",
    alignItems: "center"
  },
  layout_detail_time: {
    flexDirection: "column",
    marginTop: normalize(15)
  },
  txt_title_details_time: {
    fontSize: Dimens.size_18,
    color: Colors.gray,
    alignSelf: "flex-end"
  },
  txt_content_details_time: {
    fontSize: Dimens.size_18,
    color: Colors.blue,
    alignSelf: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginTop: normalize(5)
  },
  hideView: {
    width: 0,
    height: 0
  }
});

export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}

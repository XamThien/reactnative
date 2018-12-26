import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from "react-native";
import styles from "./ItemDoctorStyle";
import {
  convertDateToMillisecond,
  getCurrentDate,
  getTime
} from "../../../utils/Utils";
import { Translate } from "../../../utils/Language";
import DefineKey from "../../../config/language/DefineKey";

export default class ItemDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //xử lí click item chọn bác sĩ
  onPressItemDoctor(doctorID) {
    this.props.onclick(doctorID);
  }
  //hiển thị thông tin các nhân bác sĩ
  onPressDoctorInfo() {

  }
  //hiển thị icon online, offline của bác sĩ
  _getIconOnline(isOnline) {
    if (isOnline) {
      return require("../../../../assets/icon_dot_online.png");
    } else {
      return require("../../../../assets/icon_dot_offline.png");
    }
  }

  render() {
    console.log(`render() data item... = ${JSON.stringify(this.props.item)}`);
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressItemDoctor(this.props.item.doctor_id);
        }}
      >
        <View
          style={
            !this.props.item.selected ? styles.container : styles.containerClick
          }
        >
          <View style={styles.layoutTitle}>
            <Text style={styles.titleItem}>
              {" "}{this.props.item.speciality.name.toUpperCase()}{" "}
            </Text>
          </View>
          <View style={styles.lineEmpty} />
          <View style={styles.itemContent}>
            <TouchableHighlight style={styles.avataContainer}>
              <Image
                style={styles.avata}
                source={require("../../../../assets/icon_app.png")}
              />
            </TouchableHighlight>
            {/* hiển thị thông tin chung của bác sĩ */}
            <View style={styles.contentInfo}>
              <Text style={styles.name}>{this.props.item.name}</Text>
              <Text style={styles.education}>{this.props.item.education}</Text>
              <View style={styles.viewOnline}>
                <Image
                  style={styles.iconOnline}
                  source={this._getIconOnline(this.props.item.isonline)}
                />
                {/* hiển thị trạng thái bác sĩ có sẵn sàng khám ngay lập tức hay không */}
                <Text style={styles.timeOnline}>
                  Available
                </Text>
              </View>
            </View>
            {/* hiển thị icon arrow khi click vào hiển thị chi tiết bác sĩ */}
            <View style={styles.arrowDetail}>
              <TouchableOpacity
                style={styles.arrowBtn}
                onPress={() => this.onPressDoctorInfo()}
              >
                <Image
                  style={styles.imageArrow}
                  source={require("../../../../assets/icon_arrow_right_white.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
